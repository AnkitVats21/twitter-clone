from django.urls import path, include
from tweet import views
from django.http import HttpResponse
from django.shortcuts import render

app_name = 'tweet'



urlpatterns = [
    path('api/feeds/', views.FeedsView.as_view()),
    path('api/tweet/post/', views.FeedsView.as_view()),
    path('api/hashtags/', views.HashtagView.as_view()),
    path('api/likes/<pk>/', views.LikeView.as_view()),
    path('api/bookmarks/<pk>/', views.BookmarkView.as_view()),
    path('api/retweet/', views.RetweetView.as_view()),
    path('api/comment/', views.CommentView.as_view()),
    path('api/commentreply/', views.CommentReplyView.as_view()),
    path('api/search/', views.GlobalSearchList.as_view()),
]