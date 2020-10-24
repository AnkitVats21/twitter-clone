from rest_framework import serializers
from .models import User, UserProfile, OTP

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
        return user

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model   = OTP
        fields  = ('email','otp','reset')