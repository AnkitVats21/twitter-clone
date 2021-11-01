from django.db import models

from accounts.models import User

class Chat(models.Model):
    sender  = models.ForeignKey(User, related_name='sender', on_delete=models.CASCADE)
    reciever= models.ForeignKey(User, related_name='reciever', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.sender)

    def sender_username(self):
        return str(self.sender.username)

    def reciever_username(self):
        return str(self.reciever.username)
    
class Message(models.Model):
    chat    = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender  = models.ForeignKey(User, related_name='message_sender', on_delete=models.CASCADE)
    content = models.TextField()
    # media   = models.FileField(upload_to=)
    timestamp = models.DateTimeField(auto_now_add=True)

