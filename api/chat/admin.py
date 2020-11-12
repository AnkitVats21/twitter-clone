from django.contrib import admin
from .models import Message, Chat


# class MessageInline(admin.StackedInline):
class MessageInline(admin.TabularInline):
    model = Message
    extra = 1

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('sender_username','reciever_username')
    inlines = [MessageInline]

