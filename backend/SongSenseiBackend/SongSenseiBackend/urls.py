"""
URL configuration for SongSenseiBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from SongSenseiApp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('incoming-webhook/', webhook_handler, name='webhook_handler'),
    path('', webhook_handler, name='webhook_handler'),
    path('upload/', upload_mp3, name='upload_mp3'),
    path('track/', track_view, name='track_view'),
    path('get_track_info/', get_track_info, name='get_track_info'),
    path('callback/', callback, name='callback'),
    path('get_similar_tracks/', get_similar_tracks, name='get_similar_tracks')
]
