from django.db import models

# Create your models here.

class Text(models.Model):
	text = models.CharField(max_length = 500, blank = False)
	time_sent = models.DateTimeField(auto_now_add = True) 
	
class Song(models.Model):
	# put the type of data that would be sent from the frontend for a song