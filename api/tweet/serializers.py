from rest_framework import serializers
from .models import Tweet, Hashtag, Likes, Bookmark
from accounts.models import User, UserProfile
from accounts.serializers import UserProfileSerializer

class TweetSerializer(serializers.ModelSerializer):
    liked = serializers.SerializerMethodField('get_status')
    likes = serializers.SerializerMethodField('total_likes')
    profile_pic = serializers.SerializerMethodField('profile')

    class Meta:
        model   = Tweet
        fields  = ('id','name','username','profile_pic',
        'text','photos','gif','videos','topic',
        'timestamp','privacy','location',
        'liked', 'likes',
        )
    
    def get_status(self, obj):
        user_id = self.context.get("user")
        try:
            like = Likes.objects.filter(user=user_id).filter(tweet=obj)
            if len(like)!=0:
                return  True
        except:
            pass    
        return False
    
    def total_likes(self, obj):
        like = Likes.objects.filter(tweet=obj)
        return len(like)

    def profile(self, obj):
        user = User.objects.filter(username=str(obj.username()))[0]
        p    = UserProfile.objects.filter(user=user)[0]
        serializer = UserProfileSerializer(p, context={'request': self.context.get('request')})
        return serializer.data.get('picture')



class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields= '__all__'

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields= ('user', 'tweet')
    def to_representation(self, instance):
        ret     = super().to_representation(instance)
        id      = ret['tweet']
        data    =[]
        for i in id:
            data += Tweet.objects.filter(id=int(i))
        serializer  = TweetSerializer(data, context={'request': self.context.get('request')}, many=True)
        return serializer.data