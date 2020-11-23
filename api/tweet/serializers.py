from rest_framework import serializers
from .models import Tweet, Hashtag, Likes, Bookmark, Comment, CommentReply
from accounts.models import User, UserProfile
from accounts.serializers import UserProfileSerializer, UserSerializer, DynamicFieldsModelSerializer
from tweet.serializers import DynamicFieldsModelSerializer
from datetime import datetime, timezone

class TweetPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields= '__all__'

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields= '__all__'

class CommentSerializer(serializers.ModelSerializer):
    reply       = serializers.SerializerMethodField('replies')
    username    = serializers.SerializerMethodField('USERNAME')
    name        = serializers.SerializerMethodField('NAME')
    profile_pic = serializers.SerializerMethodField('PIC')
    class Meta:
        model = Comment
        fields= ("id", "username", "name", "profile_pic", "text", "photos", "videos",
                "timestamp", "tweet", "reply")
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = instance.user.username
        ret['replying_to']=[t.username for t in instance.replying_to.all()]
        return ret
    
    def replies(self, instance):
        obj = CommentReply.objects.filter(comment=instance.id)
        serializer = CommentReplySerializer(obj, many=True, context={'request': self.context.get('request')})
        return serializer.data

    def user(self, instance):
        user = User.objects.filter(username=str(instance.user.username))[0]
        serializer = UserSerializer(user, context={'request': self.context.get('request')},fields=('username','profile'))
        return serializer.data
    
    def USERNAME(self, instance):
        return self.user(instance).get('username')

    def NAME(self, instance):
        return self.user(instance).get("profile")["name"]

    def PIC(self, instance):
        return self.user(instance).get("profile")["picture"]

    
class CommentReplySerializer(serializers.ModelSerializer):
    user_detail = serializers.SerializerMethodField('user')
    class Meta:
        model = CommentReply
        fields= '__all__'
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = instance.user.username
        ret['replying_to']=[t.username for t in instance.replying_to.all()]
        return ret

    def user(self, instance):
        user = User.objects.filter(username=str(instance.user.username))[0]
        serializer = UserSerializer(user, context={'request': self.context.get('request')},fields=('username','profile'))
        return serializer.data



class TweetSerializer(DynamicFieldsModelSerializer):
    liked         = serializers.SerializerMethodField('get_status')
    likes         = serializers.SerializerMethodField('total_likes')
    profile_pic   = serializers.SerializerMethodField('profile')
    bookmarked    = serializers.SerializerMethodField('Bookmark')
    TotalComments = serializers.SerializerMethodField('totalComments')
    comments      = serializers.SerializerMethodField('Comments')
    retweets      = serializers.SerializerMethodField('totalRetweets')
    owner         = serializers.SerializerMethodField('is_owned')
    user_id       = serializers.IntegerField()
    class Meta:
        model   = Tweet
        fields  = ('id','name','username','profile_pic',
        'text','photos', 'videos','topic','user_id',
        'timestamp','privacy','location','liked', 'likes', 
        'bookmarked', 'comments','TotalComments', 'retweets', 'owner')

    def get_status(self, instance):
        user = self.context.get("user")
        like = Likes.objects.filter(user=user).filter(tweet=instance)
        if len(like)!=0:
            return  True
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
        user    = self.context.get('user')
        try:
            bookmarks = Bookmark.objects.filter(user=user)[0]
            return instance in bookmarks.tweet.all()
        except:
            return False
    
    def totalComments(self, instance):
        return len(Comment.objects.filter(tweet=instance.id))
    
    def Comments(self, instance):
        obj = Comment.objects.filter(tweet=instance.id)
        serializer = CommentSerializer(obj, many=True, context={'request': self.context.get('request')})
        return serializer.data
    
    def totalRetweets(self, instance):
        return len(Tweet.objects.filter(tweet=instance.id))

    def is_owned(self, instance):
        return instance.user == self.context.get('user')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['timestamp'] = instance.timestamp
        ret['user_id']= instance.user.id
        d=instance.timestamp.strptime(str(instance.timestamp)[:10], '%Y-%m-%d')
        x=datetime.now(timezone.utc)-instance.timestamp
        x=int(x.seconds/60)
        # print(x)
        if int(x/60)==0:
            ret['timestamp'] = "{} min ago.".format(int(x))
        elif int(x/60/24)==0:
            ret['timestamp'] = "{} hours ago".format(int(x/60))
        else:
            ret['timestamp'] = d.strftime('%b %d, %Y')
        # print(d.strftime('%b %d, %Y'))
        return ret

class RetweetSerializer(serializers.ModelSerializer):
    retweet_msg = serializers.SerializerMethodField('message')
    retweeted   = serializers.SerializerMethodField('is_retweeted')
    user_id       = serializers.IntegerField()
    owner         = serializers.SerializerMethodField('is_owned')
    class Meta:
        model   = Tweet
        fields  = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        tweet_data   = TweetSerializer(instance.tweet, context={"request":self.context.get("request"),"user":self.context.get("user")}, 
            fields  = ('id','name','username','profile_pic','text',
                'photos', 'videos','topic','timestamp','privacy',
                'location','liked', 'likes','bookmarked','user_id',
                'TotalComments', 'retweets','owner'))
        ret['tweet']    = tweet_data.data
        ret['user_id']  = instance.user.id
        ret['user']     = UserSerializer(instance.user, context={'request': self.context.get('request')}, fields=('username','profile')).data
        ret['timestamp'] = instance.timestamp
        d=instance.timestamp.strptime(str(instance.timestamp)[:10], '%Y-%m-%d')
        x=datetime.now(timezone.utc)-instance.timestamp
        x=int(x.seconds/60)
        # print(x)
        if int(x/60)==0:
            ret['timestamp'] = "{} min ago.".format(int(x))
        elif int(x/60/24)==0:
            ret['timestamp'] = "{} hours ago".format(int(x/60))
        else:
            ret['timestamp'] = d.strftime('%b %d, %Y')
        # print(d.strftime('%b %d, %Y'))
        return ret
        # return ret

    def message(self, instance):
        return "{} Retweeted".format(instance.user.profile.name)

    def is_retweeted(self, instance):
        return True
    def is_owned(self, instance):
        return instance.user == self.context.get('user')


class HashtagSerializer(serializers.ModelSerializer):
    # time = serializers.SerializerMethodField('timestamp')
    class Meta:
        model = Hashtag
        fields= '__all__'


class GlobalSearchSerializer(serializers.Serializer):
    search_data = serializers.SerializerMethodField('to_native')

    def to_native(self, obj):
        if isinstance(obj, Tweet): 
            serializer = TweetSerializer(obj,context={'request':self.context.get('request'),'user': self.context.get('user')}, 
            fields  = ('id','name','username','profile_pic',
            'text','photos', 'videos','topic','liked', 'likes', 
            'timestamp','privacy','location','bookmarked', 
            'TotalComments', 'retweets'))
        elif isinstance(obj, User):
            serializer = UserSerializer(obj, context={'request':self.context.get('request'),'user': self.context.get('user')}, 
            fields=('id', 'username', 'profile'))
        else:
            raise Exception("Neither a Tweet nor User instance!")
        return serializer.data