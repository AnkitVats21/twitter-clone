from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    AbstractUser,
    PermissionsMixin,
)
import uuid, os


class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_verified", False)
        return self._create_user(email, password, **extra_fields)

    def create_staffuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_verified", True)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_verified", True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="email")
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class UserProfile(models.Model):
    def picture_upload(instance, filename):
        username = instance.username
        ext = filename.split(".")[-1]
        filename = "%s%s.%s" % (username, uuid.uuid4(), ext)
        return os.path.join("media/userdata/avatar", filename)

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    username = models.CharField(max_length=55)
    name = models.CharField(max_length=55)
    dob = models.DateField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    picture = models.ImageField(
        upload_to=picture_upload, blank=True, null=True, max_length=1000
    )
    location = models.CharField(max_length=255, blank=True, null=True)
    website = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


# class Connections(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
#     follower = models.ManyToManyField(User, related_name="follower", blank=True)
#     following = models.ManyToManyField(User, related_name="following", blank=True)

#     def __str__(self):
#         return self.user.username

#     def username(self):
#         return self.user.username

#     class Meta:
#         verbose_name = "Connection"
#         verbose_name_plural = "Connections"


# Notification_Category = (("Text", "Text"), ("Tweet", "Tweet"), ("Chat", "Chat"))


# class Notification(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     text = models.TextField(max_length=500, blank=True, null=True)
#     tweet_id = models.IntegerField(blank=True, null=True)
#     extra_txt = models.TextField(blank=True, null=True)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     category = models.CharField(choices=Notification_Category, max_length=30)
#     seen = models.BooleanField(default=False)

#     def __str__(self):
#         return str(self.user.username) + " --> " + self.category

#     def username(self):
#         return str(self.user.username)


# class ChatConnection(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="status")
#     status = models.IntegerField(default=0)
#     last_seen = models.DateTimeField(auto_now=True)
