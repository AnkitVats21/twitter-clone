from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, OTP, Connections, Notification
from .serializers import UserSerializer, OTPSerializer,  NotificationSerializer, FollowerSerializer, UserUpdateSerializer
from rest_framework import viewsets, status, generics, mixins, permissions
from random import randint
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
import time
import json
import re 
from django.core.mail import send_mail

regex = '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'

def check(email):  
    if(re.search(regex,email)):  
        return True   
    else:  
        return False

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

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
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            pass
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
                head         = 'OTP Verification'
                body = ("Your One Time Password is {} for talkpiper account verification.").format(otp)
                # send_mail(head, body, 'scrummy4u@gmail.com', [user_email])
                serializer = UserUpdateSerializer(data = req_data, context={'request': request})
                if serializer.is_valid():
                    serializer.save()
                    return Response({'details':'otp sent successfully for email verification.'}, status = status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                data    = {"details":"OTP sent successfully"}
                return Response(data, status = status.HTTP_200_OK)
        else:
            return Response({"error":"Please enter valid email"}, status = status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        query       = User.objects.filter(id=request.user.id)[0]
        serializer  = UserSerializer(query, context={'request': request})
        return Response(serializer.data)
    def patch(self, request):
        serializer  = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResendOTP(APIView):
    serializer_class = OTPSerializer
    def post(self,request,pk):
        email    = request.data.get('email')
        try:
            user      = User.objects.filter(email=email)
        except:
            user      = User.objects.filter(username=email)
        if user.exists():
            pass
        else:
            return Response({"details":"user does not exist"})
        otp = OTP.objects.filter(email__iexact=email)
        if otp.exists():
            otp.delete()
        otp  = randint(100000, 999999)
        t    = int(time.time())
        if pk == 'send':
            OTP.objects.create(otp=otp, email=email, time=t, reset=True)
        if pk == 'resend':
            OTP.objects.create(otp=otp, email=email, time=t)
        # context      = {'otp':otp}
        # html_message = render_to_string('otp_template.html', context)
        head         = 'OTP Verification'
        body = ("Your One Time Password is {} for talkpiper registration.").format(otp)
        send_mail(head, str(body), 'scrummy4u@gmail.com', [email])
        return Response({"details":"OTP sent successfully"})

class VerifyOTP(APIView):
    serializer_class = OTPSerializer
    def post(self, request):
        email   = request.data.get('email')
        otp     = request.data.get('otp')
        reset   = request.data.get('reset')
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
                user.save()
                data = get_tokens_for_user(user)
                data["details"] = "OTP verified successfully"
                if reset:
                    obj.reset = True
                    obj.save()
                    return Response(data, status=status.HTTP_200_OK)
                obj.delete()
                return Response(data ,status=status.HTTP_200_OK)
            return Response({"details":"wrong otp"}, status=status.HTTP_400_BAD_REQUEST)
        obj.delete()
        return Response({"details":"otp expired"})



class UserLoginView(TokenObtainPairView):
    def get(self, request):
        data     = {
            "email":"enter username or email",
            "password":"enter password"
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        username = request.data.get("email")
        try:
            username = request.data['username']
        except:
            pass
        password = request.data.get("password")
        user = User.objects.filter(username__iexact=username)
        if user.exists():
            pass
        else:
            user = User.objects.filter(email__iexact=username)
        if user.exists():
            if user[0].active :
                pass
            else:
                if user[0].check_password(password)==False:
                    return Response({"details":"wrong password"}, status=status.HTTP_400_BAD_REQUEST)
                return ResendOTP.post(self,request,'resend')
        else:
            return Response({"details":"no user found"}, status=status.HTTP_400_BAD_REQUEST)
        user = user[0]
        if user.check_password(password):
            token = get_tokens_for_user(user)
            token['username']=user.username
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
        data = get_tokens_for_user(user)
        return Response(data, status=status.HTTP_200_OK)

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
    permission_classes = (permissions.IsAuthenticated,)
    def patch(self,request):
        user = User.objects.filter(email=request.user)[0]
        # data ={}
        # for i in request.data:
        #     if i != "null":
        #         data[i]=request.data[i]
        data = {"username":user.username,"profile":request.data}
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

from collections import OrderedDict
import html

class FollowerView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, connection):
        try:
            user= self.request.query_params.get('user', None)
            user = html.unescape(user)
        except:
            return Response({"details":"please enter valid keyword either self or id of user"})
        if user=='self':
            return Response(self.get_data(connection, request, request.user.id))
        else:
            user = User.objects.filter(id=int(user))
            if user.exists():
                return Response(self.get_data(connection, request, user[0].id))
            else:
                return Response({"details":"invalid user id"}, status=status.HTTP_400_BAD_REQUEST)
        
    def get_data(self, connection, request, user):
        queryset    = Connections.objects.filter(user=user)[0]
        if connection=='follower':
            query   = queryset.follower.all()
        else:
            query   = queryset.following.all()
        serializer  = FollowerSerializer(query, many=True, context={'request': request, 'user_id':user})
        return serializer.data


class ConnectionsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):

        user    = request.user
        try:
            user2       = User.objects.filter(id=pk)[0]
        except:
            return Response({'details':'please enter valid pk'})
        # action      = request.data.get('action')
        queryset    = Connections.objects.filter(user=user)[0]
        queryset2   = Connections.objects.filter(user=user2)[0]
        if pk==str(user.username):
            return Response({"details":"you cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
        if user2 in queryset.following.all():
            queryset.following.remove(user2)
            queryset2.follower.remove(user)
            queryset.save()
            queryset2.save()
            return Response({'details':'You unfollowed {}'.format(user2.profile.name)})
        else:
            queryset.following.add(user2)
            queryset2.follower.add(user)
            queryset.save()
            queryset2.save()
            try:
                profile_pic=request.user.profile.picture.url
                # profile_pic="http://{}{}".format(request.headers['host'],profile_pic)
            except:
                profile_pic=None
            text_data = {
                "username":user.username,
                "profile_pic":profile_pic,
                "notification_data":"<b>{}</b> started following you.".format(user.profile.name)
                }
            text_data = json.dumps(text_data)
            obj = Notification.objects.filter(user=user2).filter(text=text_data)
            if len(obj)==0:
                Notification.objects.create(user=user2, text=text_data, category="Text")
            return Response({'details':'You followed {}'.format(user2.profile.name)})

class NotificationView(APIView):
    serializer_class = NotificationSerializer
    permission_classes= (permissions.IsAuthenticated,)
    def get(self, request):
        queryset   = Notification.objects.filter(user=request.user).filter(seen=False)
        serializer = NotificationSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
    
    

class NotificationSeenView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        try:
            obj      = Notification.objects.filter(id=pk)[0]
        except:
            return Response({'details':'notification not found'})
        obj.seen = True
        obj.save()
        return Response({"notification marked as read."})
    def delete(self, request, pk):
        queryset   = Notification.objects.filter(user=request.user)
        queryset.delete()
        return Response({'details':'all clear'})


class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, pk):
        user = User.objects.filter(id=pk)
        if len(user)==0:
            return Response({"details":"please enter valid id"})
        else:
            following = False
            connection = Connections.objects.filter(user=request.user.id)[0]
            if user[0] in connection.following.all():
                following = True
            else:
                following = False
            serializer = UserSerializer(user[0], context={"request":request})
            data = serializer.data.copy()
            data['following']=following
            return Response(data)
