from rest_framework import serializers
from .models import User, UserProfile, OTP, Connections, Notification
from rest_framework.response import Response

class UserProfileSerializer(serializers.ModelSerializer):    
    class Meta:
        model   = UserProfile
        fields  = ('name','dob','picture', 'cover_pic','bio','location','website')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile     = UserProfileSerializer(required=True)
    connections = serializers.SerializerMethodField('connection')
    class Meta:
        model       = User
        fields      = ('id', 'email', 'username', 'password','date_joined', 'last_login', 'profile', 'connections')
        extra_kwargs= {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password    = validated_data.pop('password')
        user        = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        Connections.objects.create(user=user)
        return user
    
    def update(self, instance, validated_data):
        if validated_data['username'] != "":
            username    = validated_data.pop('username')
            instance.username = username
            instance.save()
        if len(validated_data['profile']) != 0:
            profile_data = validated_data.pop('profile')
            UserProfileSerializer(instance.profile).update(instance.profile ,validated_data=profile_data)
        return instance

    def connection(self, instance):
        obj = Connections.objects.filter(user=instance)[0]
        data = {
            'follower' : len(obj.follower.all()),
            'following': len(obj.following.all())
        }
        return data


class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model   = OTP
        fields  = ('email','otp','reset')


class ConnectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model   = Connections
        fields  = ('username','follower','following')

    def to_representation(self, instance):
        """
        Convert `follower` to username.
        """
        ret     = super().to_representation(instance)
        id      = ret['follower']
        id2     = ret['following']
        data    =[]
        data2   =[]
        for i in id:
            data += User.objects.filter(id=int(i))
        for j in id2:
            data2 += User.objects.filter(id=int(j))
        serializer  = UserSerializer(data, many=True)
        serializer2 = UserSerializer(data2, many=True)
        lst ={}
        lst['follower']=serializer.data
        lst['following']=serializer2.data
        lst['total followers']=len(id)
        lst['total following']=len(id2)
        return lst

class FollowerSerializer(serializers.ModelSerializer):
    following   = serializers.SerializerMethodField('follow')
    profile     = serializers.SerializerMethodField('user_data')
    class Meta:
        model = User
        fields= ('profile','following')

    def follow(self, instance):
        obj = Connections.objects.filter(user=self.context.get('user_id'))[0].following.all()
        return instance in obj  
    
    def user_data(self, instance):
        serializer = UserSerializer(instance, context={'request':self.context.get('request')})
        return serializer.data['profile']

class NotificationSerializer(serializers.ModelSerializer):
    url     = serializers.SerializerMethodField('notification_url')
    extra   = serializers.SerializerMethodField('extra_data')
    class Meta:
        model = Notification
        fields= ('id', 'text', 'timestamp', 'category', 'seen', 'url', 'extra')

    def notification_url(self, instance):
        host = 'http://'+self.context.get('request').headers['host']
        return host+'/api/notifications/mark_as_read/'+str(instance.id)+"/"
    def extra_data(self, instance):
        host = 'http://'+self.context.get('request').headers['host']
        image= ''
        data = ''
        if instance.category == 'Likes':
            text_data = instance.text
            users   = [t for t in text_data.split() if t.startswith('@')]
            uname   = users[0][1:]
            userimg = User.objects.filter(username=uname)[0]
            image   = host +'/'+ str(userimg.profile.picture)
            total   = len(users)
            if total==0:
                return None
            if total >3:
                for i in range(3):
                    username  = users[int(i)][1:]
                    user = User.objects.filter(username=username)[0]
                    end  = ', ' if i<2 else ' '
                    data += user.profile.name + end
                others = total - 3
                data   += 'and {} {} liked your tweet'.format(others, 'others' if others>1 else 'other')
            else:
                for i in users:
                    user = User.objects.filter(username=i[1:])[0]
                    end = ' ' if i==users[len(users)-1] else ', '
                    data+= user.profile.name+ end
                data    += 'liked your tweet.'
            return {'text_data':data, 'image':image}
        return None