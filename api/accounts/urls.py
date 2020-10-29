from django.urls import path, include
from accounts import views
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/signup/', views.CreateUserAccount.as_view()),
    path('api/users/', views.UserAccountsList.as_view()),
    path('api/resendotp/', views.ResendOTP.as_view()),
    path('api/sendotp/', views.ResendOTP.as_view(), name='forgot-password-send-otp'),
    path('api/verifyotp/', views.VerifyOTP.as_view()),
    path('api/login/', views.UserLoginView.as_view()),
    path('api/token-refresh/', jwt_views.TokenRefreshView.as_view()),
    path('api/resetpass/', views.ForgotPasswordView.as_view()),
    path('api/changepass/', views.ChangePassword.as_view()),
    path('api/updateprofile/', views.EditUserProfileView.as_view()),
    path('api/connections/', views.ConnectionsView.as_view(), name='connections-detail'),
    path('api/checkusername/', views.CheckUserName.as_view()),
    path('api/notifications/', views.NotificationView.as_view()),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
