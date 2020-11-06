from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.shortcuts import render

def index(request):
    # return HttpResponse("hi")
    return render(request, 'index.html')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('tweet.urls')),
    url(r'^', include('accounts.urls')),
    # url(r'^', index),
]