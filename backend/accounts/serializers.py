from rest_framework import serializers
from .models import User, UserProfile
from rest_framework.response import Response
import json
from .utils import get_tokens_for_user, send_verification_email

# from tweet.models import Tweet
import re


class UserCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a new user."""

    class Meta:
        model = User
        fields = ["email", "password", "is_verified"]
        read_only_fields = ["is_verified"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        """Create a new user with encrypted password and return it."""
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        send_verification_email(user)
        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data = {**data, **get_tokens_for_user(instance)}
        return data


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


def validate_name(name):
    if not re.match("^[a-zA-Z ]*$", name):
        raise serializers.ValidationError("Nmae must be alphabet")


class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, validators=[validate_name])

    class Meta:
        model = UserProfile
        fields = ("name", "dob", "picture", "cover_pic", "bio", "location", "website")


def validate_username(username):
    """Checks if the received username matches the required conditions."""
    # if type(username) != str:
    #     raise serializers.ValidationError("username must be a string")
    if len(username) < 3:
        raise serializers.ValidationError("minlen must be at least 3")
    if not re.match("^[a-z0-9._]*$", username):
        raise serializers.ValidationError(
            "usernames can only use letters, numbers, dots and underscores"
        )
    # Usernames can't begin with a number
    if username[0].isnumeric():
        raise serializers.ValidationError("usernames can't begin with a number")
    return username


class UserUpdateSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)
    username = serializers.CharField(max_length=50, validators=[validate_username])

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "username",
            "password",
            "date_joined",
            "last_login",
            "profile",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        if validated_data["username"] != "":
            username = validated_data.pop("username")
            instance.username = username
            instance.save()
        if len(validated_data["profile"]) != 0:
            profile_data = validated_data.pop("profile")
            UserProfileSerializer(instance.profile).update(
                instance.profile, validated_data=profile_data
            )
        return instance


class UserSerializer(DynamicFieldsModelSerializer):
    profile = UserProfileSerializer(required=True)
    connections = serializers.SerializerMethodField("connection")
    posts = serializers.SerializerMethodField("totalpost")

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "username",
            "password",
            "date_joined",
            "last_login",
            "posts",
            "profile",
            "connections",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        if validated_data["username"] != "":
            username = validated_data.pop("username")
            instance.username = username
            instance.save()
        if len(validated_data["profile"]) != 0:
            profile_data = validated_data.pop("profile")
            UserProfileSerializer(instance.profile).update(
                instance.profile, validated_data=profile_data
            )
        return instance

    def connection(self, instance):
        obj = Connections.objects.filter(user=instance)[0]
        data = {
            "follower": len(obj.follower.all()),
            "following": len(obj.following.all()),
        }
        return data

    def totalpost(self, instance):
        obj = Tweet.objects.filter(user=instance.id)
        return len(obj)


# class OTPSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OTP
#         fields = ("email", "otp", "reset")


# class FollowerSerializer(serializers.ModelSerializer):
#     following = serializers.SerializerMethodField("follow")
#     profile = serializers.SerializerMethodField("user_data")

#     class Meta:
#         model = User
#         fields = ("profile", "following")

#     def follow(self, instance):
#         obj = Connections.objects.filter(user=self.context.get("user_id"))[
#             0
#         ].following.all()
#         return instance in obj

#     def user_data(self, instance):
#         serializer = UserSerializer(
#             instance,
#             context={"request": self.context.get("request")},
#             fields=(
#                 "id",
#                 "username",
#                 "profile",
#             ),
#         )
#         temp = serializer.data
#         data = {
#             "username": temp["username"],
#             "name": temp["profile"]["name"],
#             "bio": temp["profile"]["bio"],
#             "picture": temp["profile"]["picture"],
#             "id": temp["id"],
#         }
#         return data


# class NotificationSerializer(serializers.ModelSerializer):
#     url = serializers.SerializerMethodField("notification_url")
#     extra = serializers.SerializerMethodField("extra_data")

#     class Meta:
#         model = Notification
#         fields = ("id", "timestamp", "category", "seen", "url", "extra")

#     def notification_url(self, instance):
#         host = "http://" + self.context.get("request").headers["host"] + "/"
#         return host + "api/notifications/mark_as_read/" + str(instance.id) + "/"

#     def extra_data(self, instance):
#         data = json.loads(instance.text)
#         try:
#             if data["profile_pic"] is not None:
#                 host = "http://" + self.context.get("request").headers["host"]
#                 data["profile_pic"] = host + data["profile_pic"]
#         except:
#             pass
#         data["tweet_id"] = instance.tweet_id
#         return data


# # class ConnectionsSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model   = Connections
# #         fields  = ('username','follower','following')

# #     def to_representation(self, instance):
# #         """
# #         Convert `follower` to username.
# #         """
# #         ret     = super().to_representation(instance)
# #         id      = ret['follower']
# #         id2     = ret['following']
# #         data    =[]
# #         data2   =[]
# #         for i in id:
# #             data += User.objects.filter(id=int(i))
# #         for j in id2:
# #             data2 += User.objects.filter(id=int(j))
# #         serializer  = UserSerializer(data, many=True)
# #         serializer2 = UserSerializer(data2, many=True)
# #         lst ={}
# #         lst['follower']=serializer.data
# #         lst['following']=serializer2.data
# #         lst['total followers']=len(id)
# #         lst['total following']=len(id2)
# #         return lst
# #         return data

# # from datetime import date
# # from rest_framework import serializers
# # class EligibilitySerializer(serializers.Serializer):
# #     email = serializers.EmailField()
# #     name = serializers.CharField(max_length=200)
# #     date_of_birth = serializers.DateField()
# #     import re

# # def validate_user(username, minlen):
# #     """Checks if the received username matches the required conditions."""
# #     if type(username) != str:
# #         raise TypeError("username must be a string")
# #     if minlen < 1:
# #         raise ValueError("minlen must be at least 1")

# #     # Usernames can't be shorter than minlen
# #     if len(username) < minlen:
# #         return False
# #     # Usernames can only use letters, numbers, dots and underscores
# #     if not re.match('^[a-z0-9._]*$', username):
# #         return False
# #     # Usernames can't begin with a number
# #     if username[0].isnumeric():
# #         return False
# #     return True
