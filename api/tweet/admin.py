from django.contrib import admin
from tweet import models
# Register your models here.

# @admin.register(Tweet)
# class TweetAdmin(admin.ModelAdmin):
#     list_display = ('')
admin.site.register(models.Hashtag)
admin.site.register(models.Tweet)
admin.site.register(models.Retweet)
admin.site.register(models.Mention)
admin.site.register(models.Comment)
admin.site.register(models.CommentReply)