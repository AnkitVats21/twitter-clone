from rest_framework import serializers
from .models import Tweet, Hashtag, Likes, Bookmark, Retweet
from accounts.models import User, UserProfile
from accounts.serializers import UserProfileSerializer

class TweetPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields= '__all__'
    
class TweetSerializer(serializers.ModelSerializer):
    liked       = serializers.SerializerMethodField('get_status')
    likes       = serializers.SerializerMethodField('total_likes')
    profile_pic = serializers.SerializerMethodField('profile')
    bookmarked  = serializers.SerializerMethodField('Bookmark')
    comments    = serializers.SerializerMethodField('totalComments')
    retweets    = serializers.SerializerMethodField('totalRetweets')
    class Meta:
        model   = Tweet
        fields  = ('id','name','username','profile_pic',
        'text','photos','gif','videos','topic',
        'timestamp','privacy','location',
        'liked', 'likes', 'bookmarked', 'comments', 'retweets')
    def get_status(self, instance):
        user_id = self.context.get("user")
        try:
            like = Likes.objects.filter(user=user_id).filter(tweet=instance)
            if len(like)!=0:
                return  True
        except:
            return False
    
    def total_likes(self, instance):
        like = Likes.objects.filter(tweet=instance)
        return len(like)

    def profile(self, instance):
        user = User.objects.filter(username=str(instance.username()))[0]
        p    = UserProfile.objects.filter(user=user)[0]
        serializer = UserProfileSerializer(p, context={'request': self.context.get('request')})
        return serializer.data.get('picture')
    
    def Bookmark(self, instance):
        user    = self.context.get('request').user
        try:
            bookmarks = Bookmark.objects.filter(user=user)[0]
            return instance in bookmarks.tweet.all()
        except:
            return False
    
    def totalComments(self, instance):
        return 0
    
    def totalRetweets(self, instance):
        return len(Retweet.objects.filter(tweet=instance.id))


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields= '__all__'

class RetweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retweet
        fields= '__all__'
