from django.db import models
from accounts.models import User
from django.urls import reverse
# Create your models here.

class Hashtag(models.Model):
    hashtags    = models.TextField(max_length=140)
    usecount    = models.IntegerField(default=1)
    timestamp   = models.DateTimeField(auto_now=True)     

    class Meta:
        verbose_name = ("Hashtag")
        verbose_name_plural = ("Hashtags")

    def __str__(self):
        return self.hashtags

comment_privacy=(('Everyone','Everyone'),('Followers','Followers'),('mentioned','mentioned'),)
category = (('tweet','tweet'), ('comment','comment'), ('reply','reply'),('retweet','retweet'))
class Tweet(models.Model):
    retweet     = models.ForeignKey('self', on_delete=models.CASCADE, related_name='retweet_tweet', blank = True, null = True)
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    text        = models.TextField(max_length=480, blank=True, null=True)
    photos      = models.ImageField(upload_to = 'tweets/images/', blank = True, null = True, max_length = 1000)
    videos      = models.FileField(upload_to='tweets/videos/', max_length=100000, blank=True, null=True)
    topic       = models.CharField(max_length=140, blank=True, null=True)
    timestamp   = models.DateTimeField(auto_now=True)
    privacy     = models.CharField(choices=comment_privacy, max_length=50, default='Everyone')
    location    = models.CharField(max_length=140, blank=True, null=True)
    tweet_type  = models.CharField(choices=category, default='tweet', max_length=50)
    replying_to = models.ManyToManyField(User, related_name='replying_to_user', blank=True)
    replying_to_tweet   = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replying_to_user_tweet', blank = True, null = True)
    replying_to_comment = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replying_to_tweet_comment', blank = True, null = True)

    class Meta:
        ordering = ('-timestamp',)
    
    def name(self):
        return self.user.profile.name

    def username(self):
        return self.user.username
        
    def TweetType(self):
        return str(self.tweet_type)

    def get_absolute_url(self):
        return reverse("Tweet", kwargs={"pk": self.pk})

    def save(self, *args, **kwargs):
        h=[t for t in self.text.split() if t.startswith('#')]
        h=list(dict.fromkeys(h))
        for h in h:
            try:
                hashtag = Hashtag.objects.filter(hashtags=h)[0]
                hashtag.usecount +=1
                hashtag.save()
            except:
                Hashtag.objects.create(hashtags=h)
        super(Tweet, self).save(*args, **kwargs) 


class Likes(models.Model):
    tweet   = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name='tweetlike', blank=True, null=True)
    user    = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userlike')
    timestamp= models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = ("Like")
        verbose_name_plural = ("Likes")
    def __str__(self):
        return str(self.user.username)

class Mention(models.Model):
    user    = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet   = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    timestamp=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

class Bookmark(models.Model):
    user        = models.ForeignKey(User,  on_delete=models.CASCADE, related_name='user_bookmarks')
    tweet       = models.ManyToManyField(Tweet, blank=True)

    def __str__(self):
        return str(self.user)+"-->"+str(self.tweet)
