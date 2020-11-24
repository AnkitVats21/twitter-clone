from rest_framework.views import APIView
from .serializers import HashtagSerializer, TweetSerializer, TweetPostSerializer, RetweetSerializer
from tweet import serializers
from .models import Hashtag, Tweet, Likes, Bookmark, Mention
from rest_framework.response import Response
from rest_framework import viewsets, status, generics, mixins, permissions
from accounts.models import Connections, User, Notification
from django.shortcuts import get_object_or_404
from rest_framework import filters
from tweet.models import Tweet
from accounts.serializers import UserSerializer, FollowerSerializer
from .serializers import GlobalSearchSerializer
from django.db.models import Q
import html
from itertools import chain
import json

class HashtagView(APIView):
    def get(self, request):
        queryset    = Hashtag.objects.order_by('-use_count').all()
        serializer  = HashtagSerializer(queryset, many=True)
        return Response(serializer.data)

class TweetView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        try:
            query       = Tweet.objects.get(id=pk)
        except:
            return Response({"details":"invalid tweet id"})
        serializer  = TweetSerializer(query, context={'request':request,'user': request.user.id},
                fields  = ('id','owner','name','username','profile_pic',
                    'text','photos', 'videos', 'timestamp','privacy',
                    'liked', 'likes','bookmarked','TotalComments','retweets','comments'))
        return Response(serializer.data)
    
    def patch(self, request, pk):
        data={}
        for i in request.data:
            if request.data[i] != "null":
                data[i]=request.data[i]
        tweet   = Tweet.objects.filter(id=pk)
        if len(tweet) !=0:
            serializer = TweetPostSerializer(tweet[0], data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"details":"tweet doesn't exists with given pk."}, status=status.HTTP_400_BAD_REQUEST)
            

class UserTweetView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        if pk=='self':
            return Response(self.get_data(request.user.id))
        else:
            user = User.objects.filter(id=pk)
            if user.exists():
                return Response(self.get_data(pk))
            else:
                return Response({"details":"invalid pk"}, status=status.HTTP_400_BAD_REQUEST)
    def get_data(self,id):
        queryset    = Tweet.objects.filter(user=id)
        rquery=[]
        tquery=[]
        if queryset.exists():
            for i in queryset:
                if i.retweet != None:
                    rquery.append(i)
                else:
                    tquery.append(i)
        serializer  = TweetSerializer(tquery, many=True, context={'request':self.request,'user': self.request.user},
            fields  = ('id','name','username','profile_pic','text','photos', 
            'videos','timestamp','liked','likes','bookmarked','TotalComments','retweets','owner'))
        retweet     = RetweetSerializer(rquery, many=True, context={'request':self.request,'user': self.request.user})
        return serializer.data + retweet.data

class FeedsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        tweet = Tweet.objects.order_by('-timestamp').filter(Q(tweet_type='tweet') | Q(tweet_type='retweet'))
        users = Connections.objects.filter(user=request.user)[0].following.all()
        user  = User.objects.filter(id=request.user.id)
        users = users.union(user)
        result=[]
        for i in tweet:
            if i.user in users:
                if i.tweet_type == 'tweet':
                    data = TweetSerializer(i, context={'request':request,'user': request.user},
                        fields  = ('id','owner','name','username','profile_pic',
                        'text','photos', 'videos', 'timestamp','privacy',
                        'liked', 'likes', 'bookmarked', 'TotalComments', 'retweets'))
                    result.append(data.data)
                else:
                    serializer = RetweetSerializer(i, context={'request':request,'user': request.user})
                    result.append(serializer.data)
                    # print(serializer.data)
        return Response(result)

    def post(self, request):
        followers = Connections.objects.filter(user=request.user.id)[0].follower.all()
        try:
            profile_pic=request.user.profile.picture.url
        except:
            profile_pic=None
        list1=['text','photo','videos']
        key  = list(request.data.keys())
        if request.data.get('tweet',None) == None:
            if not any(elem in list1  for elem in key):
                return Response({"details":"please enter text, photo or video"})
        data={}
        for i in request.data:
            if request.data[i] != "null":
                data[i]=request.data[i]
        data['user']=str(request.user.id)
        keys = list(data.keys())
        serializer = TweetPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            try:
                tweet = Tweet.objects.get(id=serializer.data['id'])
                m=[t for t in request.data['text'].split() if t.startswith('@')]
                m=list(dict.fromkeys(m))
                for i in m:
                    user = User.objects.filter(username=str(i[1:]))
                    if len(user)!=0:
                        obj = Mention.objects.create(user=user[0], tweet=tweet)
                        text_data   = {
                            "name": request.user.profile.name,
                            "username": request.user.username,
                            "profile_pic": str(profile_pic),
                            "tweet_id": serializer.data.get('id'),
                            "notification_data":"<b>{}</b> mentioned you in tweet.".format(request.user.profile.name),
                            "tweet_data": serializer.data.get('text')
                        }
                        text_data = json.dumps(text_data)
                        Notification.objects.create(user=user[0], text=text_data, category='Tweet')

            except:
                pass
            if 'text' in keys:
                text_data   = {
                    "name": request.user.profile.name,
                    "username": request.user.username,
                    "profile_pic": str(profile_pic),
                    "tweet_id": serializer.data.get('id'),
                    "notification_data":"Recent tweet from <b>{}</b>.".format(request.user.profile.name),
                    "tweet_data": serializer.data.get('text')
                }
                text_data = json.dumps(text_data)
                for i in followers:
                    Notification.objects.create(user=i, text=text_data, category='Tweet')
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TweetDelete(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def delete(self, request, pk):
        obj = Tweet.objects.filter(id=pk)
        if len(obj) != 0:
            obj[0].delete()
            return Response({"details":"tweet deleted."})
        return Response({"data":"tweet with given id not found."})
            

class LikeView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, pk):
        tweet_id= request.data.get('tweet_id')
        try:
            tweet   = Tweet.objects.filter(id=pk)[0]
        except:
            return Response({"details":"tweet with this id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
        tweet_user= User.objects.filter(username=str(tweet.username()))[0]
        userid = request.user.id
        name     = request.user.profile.name
        tweetID  = tweet.id
        tweetUser= tweet_user
        obj     = Likes.objects.get_or_create(user=request.user, tweet=tweet)
        like    = obj[0]
        if obj[1]:
            if userid != tweet.user.id:
                self.send_notification(name, userid, tweet, tweetUser, 'like')
                return Response({'details':'you liked this post.'})
        else:
            like.delete()
            if userid != tweet.user.id:
                self.send_notification(name, userid, tweet, tweetUser, 'unlike')
                return Response({'details':'you unliked this post.'}, status=status.HTTP_200_OK)

    def send_notification(self, name, userid, tweet, tweetUser, *args):
        # fetch_data = """{}"tweet_id":{},""".format('{',tweet.id)
        obj = Notification.objects.filter(user=tweetUser).filter(category='Tweet').filter(tweet_id=tweet.id)
        if len(obj) != 0:
            obj=obj[0]
            text_data = json.loads(obj.text)
            extra_txt = json.loads(obj.extra_txt)
            if args[0]=='unlike':
                like = Likes.objects.order_by('-timestamp').filter(tweet=tweet.id)
                if len(like)>1:
                    text_data['notification_data']='<b>{}</b> and <b>{}</b> other liked your tweet.'.format(like[0].user.profile.name,len(like)-1)
                elif len(like)==0:
                    obj.delete()
                    return
                else:
                    text_data['notification_data']='<b>{}</b> liked your tweet.'.format(like[0].user.profile.name)
                text_data = json.dumps(text_data)
                obj.text = text_data
                obj.save()
                return
            else:
                like = Likes.objects.order_by('-timestamp').filter(tweet=tweet.id)
                if len(like)>1:
                    text_data['notification_data']='<b>{}</b> and <b>{}</b> other liked your tweet.'.format(like[0].user.profile.name,len(like)-1)
                else:
                    text_data['notification_data']='<b>{}</b> liked your tweet.'.format(like[0].user.profile.name)
                if userid not in extra_txt['user_ids']:
                    extra_txt['user_ids'].append(userid)
                    obj.seen=False
                text_data = json.dumps(text_data)
                obj.extra_txt=json.dumps(extra_txt)
                obj.text = text_data
                obj.save()
        else:
            extra_txt = {
                "user_ids":[userid]
            }
            text_data = {
                "notification_data": "<b>{}</b> liked your tweet".format(name),
                "tweet_id":tweet.id,
                "tweet_data": tweet.text,
                "profile_pic":str(tweet_user.profile.picture)
            }
            extra_txt = json.dumps(extra_txt)
            text_data = json.dumps(text_data)
            obj = Notification.objects.create(user=tweetUser, category='Tweet', text=text_data, extra_txt=extra_txt, tweet_id=tweet.id)

class BookmarkView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        queryset = Bookmark.objects.filter(user=request.user)[0].tweet.all()
        serializer=TweetSerializer(queryset, many=True, context={'request':request,'user': request.user.id})
        return Response(serializer.data)

    def post(self, request, pk):
        tweet_id= pk
        tweet   = Tweet.objects.filter(id=tweet_id)[0]
        obj     = Bookmark.objects.get_or_create(user=request.user)
        bookmark= obj[0]
        if obj[1]:
            bookmark.tweet.add(tweet)
        else:
            if tweet in bookmark.tweet.all():
                bookmark.tweet.remove(tweet)
                return Response({'details':'you remove this tweet from bookmarks.'}, status=status.HTTP_200_OK)
            else:
                bookmark.tweet.add(tweet)
                return Response({'details':'you added this tweet to bookmarks.'}, status=status.HTTP_200_OK)

class RetweetView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request):
        data={}
        print(request.data)
        for i in request.data:
            if request.data[i] != "null":
                data[i]=request.data[i]
        data['user']=str(request.user.id)
        # data['tweet_type']='retweet'
        serializer = TweetPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()   
            try:
                tweet = Tweet.objects.get(id=request.data['retweet'])
                m=[t for t in request.data.text.split() if t.startswith('@')]
                m=list(dict.fromkeys(m))
                for i in m:
                    user = User.objects.filter(username=str(i))[0]
                    if len(User)!=0:
                        obj = Mention.objects.create(user=user, tweet=tweet)
            except:
                pass
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        queryset = Tweet.objects.filter(tweet_type=pk)
        serializer = TweetSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request, pk):
        if pk in ['comment','reply']:
            response = self.validate_data(request.data)
            if response[0]:
                data = request.data.copy()
                data['tweet_type'] = pk
                data['user']=request.user.id
                tweet   = Tweet.objects.get(id=data['replying_to_tweet'])
                data['replying_to'] = tweet.user.id
                if pk == 'reply':
                    try:
                        if data['replying_to_comment']:
                            tweet   = Tweet.objects.get(id=data['replying_to_comment'])
                            data['replying_to'] = tweet.user.id
                    except:
                        return Response("replying_to_comment id either not given or not valid.")
                serializer = serializers.TweetPostSerializer(data=data)
                if serializer.is_valid():
                    error=''
                    try:
                        if len(data['text'])==0:
                            error = "Blank text."
                    except:
                        return Response({"error":"please enter text data"})
                    if len(error) !=0:
                        return Response({"error":error})
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                serializer = serializers.TweetPostSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    if pk=='reply':
                        tweet   = Tweet.objects.get(id=data['replying_to_comment'])
                        if tweet.user!=request.user:
                            self.send_notification(tweet.user,request.data['replying_to_tweet'],'reply')
                    else:
                        tweet   = Tweet.objects.get(id=data['replying_to_tweet'])
                        if tweet.user!=request.user:
                            self.send_notification(tweet.user,request.data['replying_to_tweet'],'comment')
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(response[1], status=status.HTTP_400_BAD_REQUEST)
        return Response('invalid pk')

    def validate_data(self,data):
        ret = [True]
        try:
            tweet=Tweet.objects.get(id=data['replying_to_tweet'])
            return ret
        except:
            response = {'error':'replying_to_tweet id either not given or not valid.'}
            ret[0]=False
            ret.append(response)
            return ret

    def send_notification(self,user,tweet_id,tweet_type):
        tweet = Tweet.objects.get(id=tweet_id)
        try:
            profile_pic=user.profile.picture.url
        except:
            profile_pic=None
        if tweet_type =='reply':
            text_data = {
                "notification_data":"<b>{}</b> replied to your comment.".format(user.profile.name),
                "username": user.username,
                "profile_pic":str(profile_pic)}
        else:
            text_data = {
                "notification_data":"<b>{}</b> replied to your tweet.".format(user.profile.name),
                "username": user.username,
                "profile_pic":str(profile_pic)}
        text_data = json.dumps(text_data)
        obj = Notification.objects.create(user=user, text=text_data, category="Tweet")
        return
        
    def patch(self, request,pk):
        comment    = Tweet.objects.get(id=request.data['id'])
        data = request.data.copy()
        users= []
        for i in data['replying_to']:
            obj = User.objects.filter(username=str(i))[0]
            users.append(obj.id)
        data['replying_to']=users
        serializer = serializers.TweetPostSerializer(comment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        try:
            comment    = Tweet.objects.get(id=request.data['id'])
            comment.delete()
            return Response({"details":"comment deleted successfully."})
        except:
            return Response({"details":"Please entera valid comment id."})


class GlobalSearchList(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        query       = self.request.query_params.get('query', None)
        if len(query) == 0:
            return Response({"details":"please enter query keyword"})
        users       = User.objects.filter(Q(username__icontains=query) | Q(profile__name__icontains=query))
        tweets      = Tweet.objects.filter(text__icontains=query)
        serializer  = FollowerSerializer(users, many=True, context={'request': request, 'user_id': request.user.id})
        serializer1 = TweetSerializer(tweets, many=True, context={'request':request,'user': request.user}, 
                fields  = ('id','name','username','profile_pic','text','photos', 'videos','topic',
                'timestamp','privacy','location','liked', 'likes', 'bookmarked', 'TotalComments', 'retweets'))
        result={"user":serializer.data,"tweet":serializer1.data}
        return Response(result)

    def get_searchdata(self, obj, request):
        if isinstance(obj, Tweet): 
            serializer = TweetSerializer(obj,context={'request':request,'user': request.user}, 
                fields  = ('id','name','username','profile_pic','text','photos','videos','topic','timestamp',
                'privacy','location','liked','likes','bookmarked','TotalComments','retweets'))
        elif isinstance(obj, User):
            serializer = FollowerSerializer(obj, many=True, context={'request': request, 'user_id': request.user.id})
        else:
            raise Exception("Neither a Tweet nor User instance!")
        return serializer.data

# from datetime import datetime
from datetime import date

class TrendingView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        if pk=='tweets':
            trending    = self.get_trending()
            if len(trending) != 0:
                tweet       = Tweet.objects.filter(text__icontains=trending[0][0])
                serializer  = TweetSerializer(tweet, many=True, context={'request':request,'user': request.user}, 
                    fields  = ('id','name','username','profile_pic','text','photos', 'videos','topic','timestamp',
                                'location','liked', 'likes', 'bookmarked','TotalComments', 'retweets'))
                return Response(serializer.data)
            return Response({"details":"not found"})
        else:
            trending = self.get_trending()
            data=[]
            j=1
            for i in trending:
                x = {
                    "serial_no":j,
                    "hashtag":i[0],
                    "count":i[1]
                }
                j += 1
                data.append(x)
            return Response(data)

    def get_trending(self):
        queryset = Hashtag.objects.order_by('-timestamp','-usecount').all()[:20]
        d={}
        for i in queryset:
            obj = Tweet.objects.filter(text__icontains=i.hashtags).filter(timestamp__month=date.today().month)
            if len(obj) != 0:
                d[i.hashtags]=i.usecount
        k=sorted(d.items(), key=lambda item: item[1], reverse=True)
        return k

# class UserListView(generics.ListAPIView):
#     queryset         = User.objects.all()
#     serializer_class = UserSerializer
#     filter_backends  = [filters.SearchFilter]
#     search_fields    = ['username', 'profile__name']

# class TweetListView(generics.ListAPIView):
#     queryset         = Tweet.objects.all()
#     serializer_class = TweetSerializer
#     filter_backends  = [filters.SearchFilter]
#     search_fields    = ['text']