from django.urls import path, include
from accounts import views
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
from tweet import views as tweet
app_name='accounts'
urlpatterns = [
    path('api/signup/', views.CreateUserAccount.as_view()),
    path('api/profile/', views.ProfileView.as_view()),
    path('api/userprofile/<pk>/', views.UserProfileView.as_view()),
    path('api/otp/<pk>/', views.ResendOTP.as_view()),
    # path('api/otp/send', views.ResendOTP.as_view(), name='forgot-password-send-otp'),
    path('api/verifyotp/', views.VerifyOTP.as_view()),
    path('api/login/', views.UserLoginView.as_view()),
    path('api/token-refresh/', jwt_views.TokenRefreshView.as_view()),
    path('api/resetpass/', views.ForgotPasswordView.as_view()),
    path('api/changepass/', views.ChangePassword.as_view()),
    path('api/updateprofile/', views.EditUserProfileView.as_view()),
    path('api/connections/<pk>/', views.ConnectionsView.as_view(), name='post-to-follow/unfollow'),
    path('api/user/<connection>/', views.FollowerView.as_view()),
    path('api/checkusername/', views.CheckUserName.as_view()),
    path('api/notifications/', views.NotificationView.as_view()),
    path('api/notifications/mark_as_read/<pk>/', views.NotificationSeenView.as_view()),
    #path('api/hashtags/', tweet.HashtagView.as_view()),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
