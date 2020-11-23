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
        serializer  = TweetSerializer(query, context={'request':request,'user': request.user.id})
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
                if i.tweet != None:
                    rquery.append(i)
                else:
                    tquery.append(i)
            
        serializer  = TweetSerializer(tquery, many=True, context={'request':self.request,'user': self.request.user},
            fields  = ('id','name','username','profile_pic',
            'text','photos', 'videos','topic',
            'timestamp','privacy','location',
            'liked', 'likes', 'bookmarked', 'TotalComments', 'retweets'))
        retweet     = RetweetSerializer(rquery, many=True, context={'request':self.request,'user': self.request.user})
        return serializer.data + retweet.data

class FeedsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        tweet = Tweet.objects.order_by('-timestamp').all()
        users   = Connections.objects.filter(user=request.user)[0].following.all()
        user  = User.objects.filter(id=request.user.id)
        users = users.union(user)
        # print(users)
        result=[]
        for i in tweet:
            if i.user in users:
                if i.tweet is None:
                    data = TweetSerializer(i, context={'request':request,'user': request.user},
                        fields  = ('id','owner','name','username','profile_pic',
                        'text','photos', 'videos','topic',
                        'timestamp','privacy','location',
                        'liked', 'likes', 'bookmarked', 'TotalComments', 'retweets'))
                    result.append(data.data)
                else:
                    serializer = RetweetSerializer(i, context={'request':request,'user': request.user})
                    # print(serializer.data)
                    result.append(serializer.data)
        return Response(result)

    def post(self, request):
        followers = Connections.objects.filter(user=request.user.id)[0].follower.all()
        try:
            profile_pic=request.user.profile.picture.url
            # profile_pic="http://{}{}".format(request.headers['host'],profile_pic)
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
        # print(data)
        data['user']=str(request.user.id)
        keys = list(data.keys())
        # endpoint    = "https://api.monkeylearn.com/v3/classifiers/cl_W4Yo2CNK/classify/"
        # response_data = get(endpoint,headers={ 'Authorization': 'Bearer {}'.format(self.auth_token) }).json()
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
                            "profile_pic": profile_pic,
                            "tweet_id": serializer.data.get('id'),
                            "ntification_data":"{} mentioned you in tweet.".format(request.user.profile.name),
                            "tweet_data": serializer.data.get('text')
                        }
                        text_data = json.dumps(text_data)
                        Notification.objects.create(user=user[0], text=text_data, category='Mention')

            except:
                pass
            if 'text' in keys:
                text_data   = {
                    "name": request.user.profile.name,
                    "username": request.user.username,
                    "profile_pic": profile_pic,
                    "tweet_id": serializer.data.get('id'),
                    "ntification_data":"Recent tweet from <b>{}</b>.".format(request.user.profile.name),
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
        obj = Notification.objects.filter(user=tweetUser).filter(category='Likes').filter(tweet_id=tweet.id)
        if len(obj) != 0:
            obj=obj[0]
            text_data = json.loads(obj.text)
            extra_txt = json.loads(obj.extra_txt)
            if args[0]=='unlike':
                like = Likes.objects.order_by('-timestamp').filter(tweet=tweet.id)
                if len(like)>1:
                    text_data['data']='{} and {} other liked your tweet.'.format(like[0].user.profile.name,len(like)-1)
                elif len(like)==0:
                    obj.delete()
                    return
                else:
                    text_data['data']='{} liked your tweet.'.format(like[0].user.profile.name)
                text_data = json.dumps(text_data)
                obj.text = text_data
                obj.save()
                return
            else:
                like = Likes.objects.order_by('-timestamp').filter(tweet=tweet.id)
                if len(like)>1:
                    text_data['data']='{} and {} other liked your tweet.'.format(like[0].user.profile.name,len(like)-2)
                else:
                    text_data['data']='{} liked your tweet.'.format(like[0].user.profile.name)
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
                "data": "{} liked your tweet".format(name),
                "tweet_data": tweet.text
            }
            extra_txt = json.dumps(extra_txt)
            text_data = json.dumps(text_data)
            obj = Notification.objects.create(user=tweetUser, category='Likes', text=text_data, extra_txt=extra_txt, tweet_id=tweet.id)

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
        for i in request.data:
            if request.data[i] != "null":
                data[i]=request.data[i]
        data['user']=str(request.user.id)
        serializer = TweetPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()   
            try:
                tweet = Tweet.objects.get(id=request.data['tweet'])
                m=[t for t in request.data.text.split() if t.startswith('@')]
                m=list(dict.fromkeys(m))
                for i in m:
                    user = User.objects.filter(username=str(i))[0]
                    if len(User)!=0:
                        obj = Mention.objects.create(user=user, tweet=tweet)
            except:
                pass
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .models import Comment, CommentReply
from .serializers import CommentSerializer, CommentReplySerializer

class CommentView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        queryset = Comment.objects.all()
        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = serializers.CommentSerializer(data=request.data)
        if serializer.is_valid():
            pass
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['user']=request.user.id
        users= []
        # for i in data['replying_to']:
        #     obj = User.objects.filter(username=str(i))[0]
        #     users.append(obj.id)
        # data['replying_to']=users
        serializer = serializers.CommentCreateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            tweet = Tweet.objects.get(id=request.data['tweet'])
            text_data = {"data":"{} replied to your tweet".format(request.user.profile.name),
            "username": request.user.username}
            text_data = json.dumps(text_data)
            obj = Notification.objects.create(user=tweet.user, text=text_data, category="Replies")
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request):
        comment    = Comment.objects.get(id=request.data['id'])
        data = request.data.copy()
        users= []
        for i in data['replying_to']:
            obj = User.objects.filter(username=str(i))[0]
            users.append(obj.id)
        data['replying_to']=users
        serializer = serializers.CommentCreateSerializer(comment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        try:
            comment    = Comment.objects.get(id=request.data['id'])
            comment.delete()
            return Response({"details":"comment deleted successfully."})
        except:
            return Response({"details":"Please entera valid comment id."})

class CommentReplyView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        queryset = CommentReply.objects.all()
        serializer = CommentReplySerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data.copy()
        data['user']=request.user.id
        users= []
        for i in data['replying_to']:
            obj = User.objects.filter(username=str(i))[0]
            users.append(obj.id)
        data['replying_to']=users
        serializer = CommentReplySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        commentreply    = CommentReply.objects.get(id=request.data['id'])
        data = request.data.copy()
        users= []
        for i in data['replying_to']:
            obj = User.objects.filter(username=str(i))[0]
            users.append(obj.id)
        data['replying_to']=users
        serializer = CommentSerializer(commentreply, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            comment    = CommentReply.objects.get(id=request.data['id'])
            comment.delete()
            return Response({"details":"comment reply deleted successfully."})
        except:
            return Response({"details":"Please entera valid comment reply id."})


class UserListView(generics.ListAPIView):
    queryset         = User.objects.all()
    serializer_class = UserSerializer
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['username', 'profile__name']

class TweetListView(generics.ListAPIView):
    queryset         = Tweet.objects.all()
    serializer_class = TweetSerializer
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['text']

class GlobalSearchList(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        query       = self.request.query_params.get('query', None)
        # query = html.unescape(query)
        if len(query) == 0:
            return Response({"details":"please enter query keyword"})
        users       = User.objects.filter(Q(username__icontains=query) | Q(profile__name__icontains=query))
        tweets      = Tweet.objects.filter(text__icontains=query)
        serializer  = FollowerSerializer(users, many=True, context={'request': request, 'user_id': request.user.id})
        serializer1 = TweetSerializer(tweets, many=True, context={'request':request,'user': request.user}, 
                fields  = ('id','name','username','profile_pic',
                'text','photos', 'videos','topic',
                'timestamp','privacy','location',
                'liked', 'likes', 'bookmarked', 'TotalComments', 'retweets'))

        # all_results = list(chain(users, tweets)) 
        # all_results.sort(key=lambda x: x.timestamp)
        # serializer  = GlobalSearchSerializer(all_results, many=True, context={'request':request,'user': request.user})
        result={"user":serializer.data,"tweet":serializer1.data}
        return Response(result)

    def get_searchdata(self, obj, request):
        if isinstance(obj, Tweet): 
            serializer = TweetSerializer(obj,context={'request':request,'user': request.user}, 
                fields  = ('id','name','username','profile_pic',
                'text','photos', 'videos','topic',
                'timestamp','privacy','location',
                'liked', 'likes', 'bookmarked', 'TotalComments', 'retweets'))
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
                    fields  = ('id','name','username','profile_pic',
                                'text','photos', 'videos','topic','timestamp',
                                'location','liked', 'likes', 'bookmarked',
                                'TotalComments', 'retweets'))
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
