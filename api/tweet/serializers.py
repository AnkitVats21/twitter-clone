from rest_framework import serializers
from .models import Tweet, Hashtag, Likes, Bookmark, Retweet, Comment, CommentReply
from accounts.models import User, UserProfile
from accounts.serializers import UserProfileSerializer, UserSerializer

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class TweetPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields= '__all__'

class CommentSerializer(serializers.ModelSerializer):
    reply       = serializers.SerializerMethodField('replies')
    class Meta:
        model = Comment
        fields= ("id", "text", "photos", "gif", "videos",
                "timestamp", "replies", "tweet", "reply")
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = instance.user.username
        ret['replying_to']=[t.username for t in instance.replying_to.all()]
        return ret
    
    def replies(self, instance):
        obj = CommentReply.objects.filter(comment=instance.id)
        serializer = CommentReplySerializer(obj, many=True)
        return serializer.data
    
class CommentReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentReply
        fields= '__all__'
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = instance.user.username
        ret['replying_to']=[t.username for t in instance.replying_to.all()]
        return ret

class TweetSerializer(DynamicFieldsModelSerializer):
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
        obj = Comment.objects.filter(tweet=instance.id)
        serializer = CommentSerializer(obj, many=True)
        # print(dict(serializer.data))
        # serializer.data['total']=len(serializer.data)
        return serializer.data
    
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

class GlobalSearchSerializer(serializers.Serializer):
    search_data = serializers.SerializerMethodField('to_native')

    def to_native(self, obj):
        if isinstance(obj, Tweet): 
            serializer = TweetSerializer(obj,context={'request':self.context.get('request'),'user': self.context.get('user')})
        elif isinstance(obj, User):
            serializer = UserSerializer(obj)
        else:
            raise Exception("Neither a Tweet nor User instance!")
        return serializer.data