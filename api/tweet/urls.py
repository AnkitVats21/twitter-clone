from django.urls import path, include
from tweet import views
from django.http import HttpResponse
from django.shortcuts import render

app_name = 'tweet'



urlpatterns = [
    path('api/feeds/', views.FeedsView.as_view()),
    path('api/hashtags/', views.HashtagView.as_view()),
    path('api/likes/<pk>/', views.LikeView.as_view()),
    path('api/bookmarks/<pk>/', views.BookmarkView.as_view()),
]