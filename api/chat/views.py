from rest_framework.views import APIView
from .serializers import ChatSerializer, MessageSerializer
from .models import Chat, Message
from rest_framework.response import Response
from rest_framework import permissions, status
from accounts.models import User
from django.shortcuts import Http404

class MessageView(APIView):
    def get(self, request):
        queryset    = Chat.objects.all()
        serializer  = ChatSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        return Response('chat created successfully')


class ChatView(APIView):
    permission_classes  = (permissions.IsAuthenticated,)
    def get(self, request):
        user    = User.objects.filter(email=str(request.user))[0]
        # try:
        #     chat        = Chat.objects.filter(id=int(request.data.get('chatId'))[0]
        #     queryset    = Message.objects.filter(contact=chat)
        #     serializer  = ChatSerializer(queryset, many=True, context={'request': request})
        #     return Response(serializer.data)
        # except:
        #     pass

        obj1    = Chat.objects.filter(sender=user.id)
        obj2    = Chat.objects.filter(reciever=user.id)
        queryset= obj1.union(obj2)
        if len(queryset)==0:
            return Response({"details":"user does not have any chat"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ChatSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    
    def post(self, request):
        # print(request.data)
        # serializer = ChatSerializer(data=request.data)
        # if serializer.is_valid():
        #     pass
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        sender  = User.objects.filter(email=str(request.user))[0]
        try:
            reciever= User.objects.filter(username=request.data['reciever'])[0]
        except:
            return Response({"Please enter valid reciever"})
             
        obj=Chat.objects.filter(sender=reciever.id)
        if len(obj)==0:
            obj = Chat.objects.filter(reciever=reciever.id)
        if len(obj)!=0:
            return Response({"details":"Chat with this user already exists."}, status=status.HTTP_400_BAD_REQUEST)
        obj         = Chat.objects.create(sender=sender, reciever=reciever)
        # print(obj.id)
        # return Response({"details":"chat created successfully"})
        query   = Chat.objects.filter(id=obj.id)[0]
        serializer  = ChatSerializer(obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        try:
            user= User.objects.filter(username=request.data["reciever"])[0]
            obj = Chat.objects.filter(sender=user.id)
            if len(obj)==0:
                obj = Chat.objects.filter(reciever=user.id)
            if len(obj)==0:
                return Response("please enter valid chat id or reciever's username")
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
    return serializer.data[:10]

def get_user_contact(sender, to):
    user = get_object_or_404(User, username=sender)
    return get_object_or_404(Chat, reciever=user)

