from django.contrib import admin
from tweet import models
# Register your models here.

# @admin.register(Tweet)
# class TweetAdmin(admin.ModelAdmin):
#     list_display = ('')
admin.site.register(models.Hashtag)
admin.site.register(models.Tweet)
admin.site.register(models.Mention)

class CommentReplyInline(admin.StackedInline):
    model = models.CommentReply
    extra = 1

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    inlines = [CommentReplyInline]

# admin.site.register(models.CommentReply)
admin.site.register(models.Bookmark)
admin.site.register(models.Likes)