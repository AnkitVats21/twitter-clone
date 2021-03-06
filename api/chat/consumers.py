from accounts.models import User, ChatConnection
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from accounts.models import Notification
from .models import Chat, Message 
from .views import get_last_10_messages, get_user_contact
from asgiref.sync import async_to_sync
from .serializers import MessageSerializer
from channels.consumer import SyncConsumer
from json.decoder import JSONDecodeError as e
from requests import get,post
from channels.db import database_sync_to_async

class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self):
        messages = get_last_10_messages(self.chatId, self.user_id)
        try:
            if messages["details"]:
                self.send_message(messages)
                self.close(3000)
        except:
            pass
        self.send_message(messages)

    def new_message(self, data):
        chat    = Chat.objects.filter(id=self.chatId)[0]
        user    = User.objects.get(id=self.user_id)
        receiver= None
        if chat.sender == user:
            receiver  = chat.reciever
        else:
            receiver  = chat.sender
        try:
            message = data['message']
            obj     = Message.objects.create(chat=chat, content=message, sender=user)
            queryset= Message.objects.filter(id=obj.id)[0]
            serializer = MessageSerializer(queryset, context={'user_id': self.user_id})
            self.send_notification(serializer.data['content'],receiver)
            return self.send_chat_message([serializer.data])
        except:
            self.send_message({"details":"please enter valid data."})

    def send_notification(self,message,receiver):
        noification = Notification.objects.filter(user=receiver.id).filter(extra_txt=self.chatId)
        user = User.objects.get(id=self.user_id)
        try:
            profile_pic=user.profile.picture.url
        except:
            profile_pic=None
        if not noification.exists():
            text_data = {
                    "notification_data":"<b>{}</b> sent you a message.".format(user.profile.name),
                    "tweet_data": message,
                    "username": user.username,
                    "profile_pic":str(profile_pic)}
            text_data = json.dumps(text_data)
            obj = Notification.objects.create(user=receiver,extra_txt = self.chatId, text=text_data, category="Chat")
            return
        else:
            text_data = {
                    "notification_data":"<b>{}</b> sent you a message.".format(user.profile.name),
                    "tweet_data": message,
                    "username": user.username,
                    "profile_pic":str(profile_pic)}
            text_data = json.dumps(text_data)
            obj = noification[0]
            obj.seen = False
            obj.text=text_data
            obj.save()
            return

    def message_to_json(self, data):
        # serial
        print(data)
        return 'MessageSerializer(data)'

    def connect(self):
        self.auth_token = self.scope['url_route']['kwargs']['auth']
        self.room_name  = self.scope['url_route']['kwargs']['room_name']
        self.chatId     = self.scope['url_route']['kwargs']['room_name']
        server          = "http://"+str(self.scope['server'][0])+":"+str(self.scope['server'][1])
        endpoint        = server+'/api/startchat/'
        response_data    = get(endpoint,headers={ 'Authorization': 'Bearer {}'.format(self.auth_token) }).json()
        
        if response_data.get('code')=="token_not_valid":
            self.accept()
            msg = {
                "detail": "Given token not valid for any token type",
                "code": "token_not_valid",
                "messages": [
                    {
                        "token_class": "AccessToken",
                        "token_type": "access",
                        "message": "Token is invalid or expired"
                    }
                ]
            }
            self.send_message(msg)
            self.close(code=401)
        self.user_id    = response_data.get('user_id')
        self.scope['user']=User.objects.get(id=self.user_id)
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        # self.set_status(True)
        # chat = ChatConnection.objects.get_or_create(user=self.scope['user'])[0]
        # chat.status +=1
        # chat.save()
        self.fetch_messages()
        # message={
        #     "message"   : "Your message"
        # }
        # self.send_message(message)

    # @database_sync_to_async
    def set_status(self, value):
        chat = ChatConnection.objects.get_or_create(user=self.scope['user'])[0]
        if value:
            chat.status +=1
        else:
            chat.status -=1
        chat.save()

    def receive(self, text_data=None, bytes_data=None):
        try:
            data = json.loads(text_data)
            self.new_message(data)
        except ValueError:
            self.send(text_data="Json Parse Error")


    def disconnect(self, close_code):
        # self.set_status(False)
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))


    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))

