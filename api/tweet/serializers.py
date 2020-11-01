from rest_framework import serializers
from .models import Tweet, Hashtag

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields= '__all__'

class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields= '__all__'