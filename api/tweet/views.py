from rest_framework.views import APIView
from .serializers import HashtagSerializer, TweetSerializer, BookmarkSerializer
from .models import Hashtag, Tweet, Likes, Bookmark
from rest_framework.response import Response
from rest_framework import permissions, status
from accounts.models import Connections, User, Notification
from django.shortcuts import get_object_or_404

class HashtagView(APIView):
    def get(self, request):
        queryset    = Hashtag.objects.all()
        serializer  = HashtagSerializer(queryset, many=True)
        return Response(serializer.data)

class FeedsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        Following   = Connections.objects.filter(user=request.user)[0]
        queryset    = []
        for i in Following.following.all():
            tweet     = Tweet.objects.filter(user=i)
            queryset += tweet

        serializer  = TweetSerializer(queryset, many=True, context={'request':request,'user': request.user.id})
        return Response(serializer.data)
        

class LikeView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, pk):
        tweet_id= request.data.get('tweet_id')
        try:
            tweet   = Tweet.objects.filter(id=pk)[0]
        except:
            return Response({"details":"tweet with this id doesn't exist"})
        tweet_user= User.objects.filter(username=str(tweet.username()))[0]
        username = request.user.username
        name     = request.user.profile.name
        tweetID  = tweet.id
        tweetUser= tweet_user
        obj     = Likes.objects.get_or_create(user=request.user)
        like    = obj[0]
        if obj[1]:
            like.tweet.add(tweet)
            like.save()
            self.send_notification(name, username, tweetID, tweetUser)
            return Response({'details':'you liked this post.'})
        else:
            if tweet in like.tweet.all():
                like.tweet.remove(tweet)
                self.send_notification(name, username, tweetID, tweetUser, 'unlike')
                return Response({'details':'you unliked this post.'}, status=status.HTTP_200_OK)
            else:
                like.tweet.add(tweet)
                self.send_notification(name, username, tweetID, tweetUser)
                return Response({'details':'you liked this post.'}, status=status.HTTP_200_OK)

    def send_notification(self, name, username, tweetID, tweetUser, *args):
        obj = Notification.objects.filter(user=tweetUser).filter(category='Likes').filter(extra_txt__istartswith='id:{}'.format(tweetID))
        if len(obj) != 0:
            obj=obj[0]
            text_data = obj.text
            users = [t for t in text_data.split() if t.startswith('@')]
            try:
                if args[0]=='unlike':
                    user = '@'+username
                    final = text_data.replace(user,'')
                    final = final.replace('  ',' ')
                    obj.text = final
                    obj.save()
                    return
            except:
                pass
            if '@'+username not in users:
                obj.text ='@{} {} '.format(username, text_data)
                obj.seen = False
                obj.save()
        else:
            text_data = '@{} '.format(username)
            obj = Notification.objects.create(user=tweetUser, category='Likes', text=text_data, extra_txt='id:{}'.format(tweetID))

class BookmarkView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        queryset = Bookmark.objects.filter(user=request.user)
        serializer=BookmarkSerializer(queryset, many=True, context={'request':request})
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

