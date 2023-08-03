from django.db import models

# Create your models here.

class Text(models.Model):
	text = models.CharField(max_length = 500, blank = False)
	time_sent = models.DateTimeField(auto_now_add = True) 
	
class Song(models.Model):
	song = models.CharField(max_length = 500, blank = False)
	# put the type of data that would be sent from the frontend for a song

class MP3File(models.Model):
	name = models.CharField(max_length=255)

	mp3_file = models.FileField(upload_to='mp3_files/')

	upload_date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name