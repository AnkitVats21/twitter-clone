from django.db import models
from accounts.models import User
# from django.urls import reverse
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

    # def get_absolute_url(self):
    #     return reverse("Hashtag_detail", kwargs={"pk": self.pk})



comment_privacy=(('Everyone','Everyone'),('Followers','Followers'),('mentioned','mentioned'),)

class Tweet(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    text        = models.TextField(max_length=280, blank=True, null=True)
    photos      = models.ImageField(upload_to = 'tweets/images/', blank = True, null = True, max_length = 1000)
    gif         = models.ImageField( upload_to='tweets/gifs/', max_length=5000, blank=True, null=True)
    videos      = models.FileField(upload_to='tweets/videos/', max_length=100000, blank=True, null=True)
    topic       = models.CharField(max_length=140, blank=True, null=True)
    timestamp   = models.DateTimeField(auto_now=True)
    privacy     = models.CharField(choices=comment_privacy, max_length=50, default='Everyone')
    location    = models.CharField(max_length=140, blank=True, null=True)


    def __str__(self):
        return str(self.user.username)+"-->"+str(self.text[:6])+"..."

    # def get_absolute_url(self):
    #     return reverse("Tweet_detail", kwargs={"pk": self.pk})

    def save(self, *args, **kwargs):
        h=[t for t in self.text.split() if t.startswith('#')]
        m=[t for t in self.text.split() if t.startswith('@')]
        h=list(dict.fromkeys(h))
        m=list(dict.fromkeys(m))
        for h in h:
            try:
                hashtag = Hashtag.objects.filter(hashtags=h)[0]
                hashtag.usecount +=1
                hashtag.save()
            except:
                Hashtag.objects.create(hashtags=h)
        super(Tweet, self).save(*args, **kwargs) 

class Likes(models.Model):
    tweet   = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    user    = models.ManyToManyField(User)
    count   = models.IntegerField()      

class Mention(models.Model):
    user    = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet   = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    timestamp=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

class Retweet(models.Model):
    tweet       = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    text        = models.TextField(max_length =280, blank=True, null=True)
    photos      = models.ImageField(upload_to ='retweets/images/', max_length=1000,  blank=True, null=True)
    gif         = models.ImageField(upload_to ='retweets/gifs/',   max_length=5000,  blank=True, null=True)
    videos      = models.FileField(upload_to  ='retweets/videos/', max_length=100000,blank=True, null=True)
    topic       = models.CharField(max_length =140, blank=True, null=True)
    timestamp   = models.DateTimeField(auto_now=True)
    privacy     = models.CharField(choices=comment_privacy, max_length=50, default='Everyone')
    location    = models.CharField(max_length=140, blank=True, null=True)
    
    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        d=[t for t in self.text.split() if t.startswith('#')]
        m=[t for t in self.text.split() if t.startswith('@')]
        d=list(dict.fromkeys(d))
        m=list(dict.fromkeys(m))
        for h in d:
            try:
                hashtag = Hashtag.objects.filter(hashtags=h)[0]
                hashtag.usecount +=1
                hashtag.save()
            except:
                Hashtag.objects.create(hashtags=h)
        super(Tweet, self).save(*args, **kwargs)

class Comment(models.Model):
    tweet       = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    replying_to = models.ManyToManyField(User, related_name='replying_to')
    text        = models.TextField(max_length =280, blank=True, null=True)
    photos      = models.ImageField(upload_to ='retweets/images/', max_length=1000,  blank=True, null=True)
    gif         = models.ImageField(upload_to ='retweets/gifs/',   max_length=5000,  blank=True, null=True)
    videos      = models.FileField(upload_to  ='retweets/videos/', max_length=100000,blank=True, null=True)
    timestamp   = models.DateTimeField(auto_now=True)
    replies     = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user.username)+"-->"+str((self.replying_to.all()[0].username))

class CommentReply(models.Model):
    tweet       = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name='replyingto_tweet')
    comment     = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    replying_to = models.ManyToManyField(User, related_name='comment_replying_to')
    text        = models.TextField(max_length =280, blank=True, null=True)
    photos      = models.ImageField(upload_to ='retweets/images/', max_length=1000,  blank=True, null=True)
    gif         = models.ImageField(upload_to ='retweets/gifs/',   max_length=5000,  blank=True, null=True)
    videos      = models.FileField(upload_to  ='retweets/videos/', max_length=100000,blank=True, null=True)
    topic       = models.CharField(max_length =140, blank=True, null=True)
    timestamp   = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = ("Comment Reply")
        verbose_name_plural = ("Comment Replies")

    def __str__(self):
        l   = len(self.replying_to.all())
        if(l == 1):
            return str(self.user.username)+"-->"+str((self.replying_to.all()[0].username))
        return str(self.user.username)+"-->"+str((self.replying_to.all()[0].username))+","+str((self.replying_to.all()[1].username))+"...."