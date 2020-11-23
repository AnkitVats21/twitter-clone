from rest_framework import serializers
from .models import Chat, Message
from accounts.models import User, UserProfile
from accounts.serializers import UserProfileSerializer
from django.shortcuts import get_object_or_404

class ChatSerializer(serializers.ModelSerializer):
    profile_pic = serializers.SerializerMethodField('profile')
    r_name      = serializers.SerializerMethodField('name')
    r_username  = serializers.SerializerMethodField('username')
    last_chat   = serializers.SerializerMethodField('chat')
    class Meta:
        model = Chat
        fields= ('id', 'r_username', 'r_name', 'profile_pic', 'last_chat')

    def profile(self, obj):
        sender=self.context.get('request').user
        if str(obj)==str(sender):
            email = obj.reciever
        else:
            email   = obj
        user    = User.objects.filter(email=str(email))[0]
        profile = UserProfile.objects.filter(user=user)[0]
        serializer = UserProfileSerializer(profile, context={'request': self.context.get('request')})
        return serializer.data.get('picture')
    
    def user(self, obj):
        sender=self.context.get('request').user
        if obj.sender.username==sender.username:
            return obj.reciever
        else:
            return obj.sender

    def username(self, obj):
        return self.user(obj).username
    
    def name(self,obj):
        return self.user(obj).profile.name

    def chat(self, obj):  
        chat        = get_object_or_404(Chat, id=obj.id)
        queryset    = chat.messages.order_by('-timestamp').all()
        sender      = self.context.get('request').user
        if len(queryset)==0:
            return None
        data    = {"message":str(queryset[0].content),
            "timestamp":str(queryset[0].timestamp), 
            "sender":  queryset[0].sender.username if str(queryset[0].sender.username) != str(sender.username) else str(sender.username)}
        return data



class MessageSerializer(serializers.ModelSerializer):
    sender    = serializers.SerializerMethodField('username')
    owner    = serializers.SerializerMethodField('message_owner')
    class Meta:
        model = Message
        fields= ('id', 'content', 'timestamp', 'sender', 'owner')

    def username(self, obj):
        user_id     = self.context.get('user_id')
        query_user  = User.objects.get(id=user_id)
        return str(obj.sender.username) if str(query_user.username)!=str(obj.sender.username) else str(query_user.username)
    
    def message_owner(self,obj):
        user_id     = self.context.get('user_id')
        query_user  = User.objects.get(id=user_id)
        x = str(obj.sender.username) if str(query_user.username)!=str(obj.sender.username) else str(query_user.username)
        return query_user.username == x

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['timestamp'] = instance.timestamp.strftime("%a %d, %I:%M %p")
        return ret