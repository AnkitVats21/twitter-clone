from rest_framework import serializers
from .models import User, UserProfile, OTP, Connections
from rest_framework.response import Response

class UserProfileSerializer(serializers.ModelSerializer):    
    class Meta:
        model   = UserProfile
        fields  = ('name','dob','picture','bio','location','website')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = UserProfileSerializer(required=True)

    class Meta:
        model       = User
        fields      = ('id', 'email', 'username', 'password','date_joined', 'last_login', 'profile')
        extra_kwargs= {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password    = validated_data.pop('password')
        user        = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        Connections.objects.create(user=user)
        return user
    
    def update(self, instance, validated_data):
        if validated_data['username'] != "":
            username    = validated_data.pop('username')
            instance.username = username
            instance.save()
        if len(validated_data['profile']) != 0:
            profile_data = validated_data.pop('profile')
            UserProfileSerializer(instance.profile).update(instance.profile ,validated_data=profile_data)
        return instance

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model   = OTP
        fields  = ('email','otp','reset')
        
# class FollowerUsernameSerializer(serializers.ModelSerializer):
#     class Meta:
#         model   = User
#         fields  = ('username',)

class ConnectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Connections
        fields  = ('username','follower','following')

    def to_representation(self, instance):
        """Convert `follower` to username."""
        ret     = super().to_representation(instance)
        id      = ret['follower']
        id2     = ret['following']
        data    =[]
        data2   =[]
        for i in id:
            data += User.objects.filter(id=int(i))
        for j in id2:
            data2 += User.objects.filter(id=int(j))
        serializer  = UserSerializer(data, many=True)
        serializer2 = UserSerializer(data2, many=True)
        lst ={}
        lst['follower']=serializer.data
        lst['following']=serializer2.data
        lst['total followers']=len(id)
        lst['total following']=len(id2)
        return lst
