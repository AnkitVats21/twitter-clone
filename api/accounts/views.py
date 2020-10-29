from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, OTP, Connections
from .serializers import UserSerializer, OTPSerializer, ConnectionsSerializer
from rest_framework import viewsets, status, generics, mixins, permissions
from random import randint
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
import time
import json
import re 
  
regex = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'

def check(email):  
    if(re.search(regex,email)):  
        return True   
    else:  
        return False

class CheckUserName(APIView):
    def post(self, request):
        username = request.data.get("username")
        user     = User.objects.filter(username__iexact=username)
        if user.exists():
            return Response({"detail":"username already exists"}, status = status.HTTP_226_IM_USED)
        return Response({"details":"username available"})

class CheckEmail(APIView):
    def post(self, request):
        email   = request.data.get("email")
        user    = User.objects.filter(username__iexact=email)
        if user.exists():
            return Response({"detail":"eamil already exists"}, status = status.HTTP_226_IM_USED)
        return Response({"details":"email available"})

class CreateUserAccount(APIView):
    serializer_class = UserSerializer
    
    def post(self, request):
        user_email  = request.data.get("email")
        username    = request.data.get("username")
        req_data    = request.data
        if check(user_email):
            user = User.objects.filter(email__iexact = user_email)
            try:
                username = User.objects.filter(username__iexact=username)
                if username.exists():
                    return Response({"detail":"username already exists"}, status = status.HTTP_226_IM_USED)
            except:
                pass
            if user.exists():
                data = {"error":"User with the given email address already exists"}
                return Response(data, status = status.HTTP_226_IM_USED)
            else:
                otp  = randint(100000, 999999) 
                t    = int(time.time())
                OTP.objects.create(otp = otp, email = user_email, time= t)
                # context      = {'otp':otp}
                # html_message = render_to_string('otp_template.html', context)
                # head         = 'OTP Verification'
                # body = ("Your One Time Password is {} for registration on Scrummy.").format(otp)
                print(otp)
                #send_mail(head, str(body), 'scrummy4u@gmail.com', [user_email], html_message = html_message)
                serializer = UserSerializer(data = req_data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status = status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                data    = {"details":"OTP sent successfully"}
                return Response(data, status = status.HTTP_200_OK)
        else:
            return Response({"error":"Please enter valid email"}, status = status.HTTP_400_BAD_REQUEST)

class UserAccountsList(APIView):

    def get(self, request):
        users       = User.objects.all()
        serializer  = UserSerializer(users, many = True, context={'request': request})
        return Response(serializer.data)

class ResendOTP(APIView):
    #serializer_class = OTPSerializer
    def post(self,request):
        email    = request.data.get('email')
        user      = User.objects.filter(email=email)
        if user.exists():
            pass
        else:
            return Response({"details":"user does not exist"})
        otp = OTP.objects.filter(email__iexact=email)
        # if otp.exists():s
        otp.delete()
        otp  = randint(100000, 999999) 
        t    = int(time.time())
        OTP.objects.create(otp = otp, email = email, time= t)
        # context      = {'otp':otp}
        # html_message = render_to_string('otp_template.html', context)
        # head         = 'OTP Verification'
        # body = ("Your One Time Password is {} for registration on Scrummy.").format(otp)
        print(otp)
        #send_mail(head, str(body), 'scrummy4u@gmail.com', [user_email], html_message = html_message)
        return Response({"details":"OTP sent successfully"})

class VerifyOTP(APIView):
    serializer_class = OTPSerializer
    def post(self, request):
        email   = request.data.get('email')
        otp     = request.data.get('otp')
        reset  = request.data.get('reset')
        try:
            obj     = OTP.objects.filter(email__iexact=email)[0]
            user    = User.objects.filter(email__iexact=email)[0]
        except:
            return Response({"details":"no records found"}, status=status.HTTP_400_BAD_REQUEST)
        t1      = int(time.time())
        t2      = obj.time
        if(t1-t2)<300:
            if otp == obj.otp:
                user.active = True
                if reset:
                    obj.reset = True
                    obj.save()
                    return Response({"details":"OTP verified successfully"},status=status.HTTP_200_OK)
                obj.delete()
                return Response({"details":"OTP verified successfully"},status=status.HTTP_200_OK)
            return Response({"details":"wrong otp"}, status=status.HTTP_400_BAD_REQUEST)
        obj.delete()
        return Response({"details":"otp expired"})


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserLoginView(TokenObtainPairView):
    def get(self, request):
        data     = {
            "username":"enter username or email",
            "password":"enter password"
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = User.objects.filter(username__iexact=username)
        if user.exists():
            pass
        else:
            user = User.objects.filter(email__iexact=username)
        if user.exists():
            pass
        else:
            return Response({"details":"no user found"}, status=status.HTTP_400_BAD_REQUEST)
        user = user[0]
        if user.check_password(password):
            token = get_tokens_for_user(user)
            return Response(token, status=status.HTTP_200_OK)
        return Response({"details":"wrong password"}, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordView(APIView):
    def get(self, request):
        data     = {
            "email":"enter email",
            "password":"enter password"
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        email    = request.data.get('email')
        password = request.data.get('password')
        user     = get_object_or_404(User, email=email)
        obj      = OTP.objects.filter(email=email)
        if obj.exists():
            obj=obj[0]
            if obj.reset==True:
                obj.delete()
                pass
            else:
                return Response({"details":"you have not verified your otp for password reset"},
                 status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"details":"we have not got any password reset request"},
             status=status.HTTP_400_BAD_REQUEST)
        user.set_password(password)
        user.save()
        return Response({"details":"password reset successfully"},
         status=status.HTTP_200_OK)

class ChangePassword(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        return Response({"password":"please enter password"})
    def post(self, request):
        newpass = request.data.get("password")
        user = User.objects.filter(email=request.user)[0]
        user.set_password(newpass)
        user.save()
        return Response({"details":"password changed successfully"})

class EditUserProfileView(APIView):
    serializer_class = UserSerializer
    #permission_classes = (permissions.IsAuthenticated,)
    def patch(self,request):
        user = User.objects.filter(email=request.user)[0]
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

from collections import OrderedDict

class ConnectionsView(APIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        queryset    = Connections.objects.filter(user=request.user)
        serializer  = ConnectionsSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        userid      = request.data.get('username')
        try:
            user2   = User.objects.filter(id=userid)[0]
        except:
            user2   = User.objects.filter(username=userid)[0]
        action      = request.data.get('action')
        queryset    = Connections.objects.filter(user=request.user)[0]
        queryset2   = Connections.objects.filter(user=user2)[0]
        if str(queryset)==str(user2.username):
            return Response({"details":"you cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
        if action=='follow':
            queryset.following.add(user2)
            queryset2.follower.add(request.user)
            queryset.save()
            serializer  = ConnectionsSerializer(queryset)
            return Response(serializer.data)
        if action=='unfollow':
            queryset.following.remove(user2)
            queryset2.follower.remove(request.user)
            queryset.save()
            serializer  = ConnectionsSerializer(queryset)
            return Response(serializer.data)


    