from django.urls import path, include
from chat import views

app_name = 'chat'



urlpatterns = [
    path('api/chats/', views.ChatView.as_view()),
    path('api/messages/', views.MessageView.as_view()),
    path('api/startchat/', views.UserChatAuth.as_view()),
]