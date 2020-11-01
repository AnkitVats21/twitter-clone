from django.urls import path, include
from tweet import views

app_name = 'tweet'
urlpatterns = [
    path('api/tweets/', views.TweetView.as_view()),
    path('api/hashtags/', views.HashtagView.as_view()),
]