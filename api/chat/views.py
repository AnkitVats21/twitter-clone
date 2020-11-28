from rest_framework.views import APIView
from .serializers import ChatSerializer, MessageSerializer
from .models import Chat, Message
from rest_framework.response import Response
from rest_framework import permissions, status
from accounts.models import User
from django.shortcuts import Http404
from django.db.models import Q

class MessageView(APIView):
    def get(self, request):
        queryset    = Message.objects.all()
        serializer  = MessageSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        return Response('chat created successfully')


class ChatView(APIView):
    permission_classes  = (permissions.IsAuthenticated,)
    def get(self, request):
        obj     = Chat.objects.filter(Q(sender=request.user.id) | Q(reciever=request.user.id))
        if obj.exists():
            serializer = ChatSerializer(obj, many=True, context={'request': request})
            return Response(serializer.data)
        return Response([])

    
    def post(self, request):
        sender  = request.user
        try:
            reciever= User.objects.filter(username=request.data.get('receiver'))[0]
        except:
            return Response({"Please enter valid reciever"})
             
        obj = Chat.objects.filter(Q(sender=sender.id) | Q(reciever=sender.id))
        if not obj.exists():
            obj = Chat.objects.create(sender=sender, reciever=reciever)
            serializer  = ChatSerializer(obj, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            obj = obj.filter(Q(sender=reciever.id) | Q(reciever=reciever.id))
            if obj.exists():
                return Response({"details":"Chat with this user already exists."}, status=status.HTTP_200_OK)
            obj = Chat.objects.create(sender=sender, reciever=reciever)
            serializer  = ChatSerializer(obj, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            

    def delete(self, request):
        try:
            user= User.objects.filter(username=request.data["reciever"])[0]
            obj = Chat.objects.filter(sender=user.id)
            if len(obj)==0:
                obj = Chat.objects.filter(reciever=user.id)
            if len(obj)==0:
                return Response("please enter valid chat id or receiver's username")
            obj = obj[0]
            obj.delete()
            return Response({"details":"Chat deleted successfully."})
        except:
            # return Response({"details":"please enter valid data"}, status=status.HTTP_400_BAD_REQUEST)
            pass
        try:
            obj = Chat.objects.filter(id=request.data["chatId"])[0]
            obj.delete()
            return Response({"details":"Chat deleted successfully."}, status=status.HTTP_200_OK)
        except:
            return Response({"details":"invalid detail given."})


class UserChatAuth(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        user = User.objects.filter(email=request.user)[0]
        return Response({"user_id": user.id})


def get_last_10_messages(chatId, user_id):
    try:
        chat    = Chat.objects.get(id=chatId)
    except:
        return {"details":"invalid chatId"}
    user    = User.objects.get(id=user_id)
    if str(chat.sender.username)==str(user.username) or str(chat.reciever.username) == str(user.username):
        pass
    else:
        return {"details":"chat with this chatId doesn't belong to given user_id."}
    message = Message.objects.filter(chat=chatId)

    serializer=MessageSerializer(message, many=True, context={'user_id': user_id})
    return serializer.data

def get_user_contact(sender, to):
    user = get_object_or_404(User, username=sender)
    return get_object_or_404(Chat, reciever=user)

