from rest_framework.views import APIView
from .serializers import HashtagSerializer, TweetSerializer
from .models import Hashtag, Tweet
from rest_framework.response import Response

class HashtagView(APIView):
    def get(self, request):
        queryset    = Hashtag.objects.all()
        serializer  = HashtagSerializer(queryset, many=True)
        return Response(serializer.data)

class TweetView(APIView):
    def get(self, request):
        queryset    = Tweet.objects.all()
        serializer  = TweetSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)