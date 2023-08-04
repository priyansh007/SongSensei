from django.shortcuts import render, redirect

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Text

from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

#import forms
from .forms import MP3FileForm


import requests
from uploadsongfile.requestupload import *
from uploadsongfile.uploadfile import *
from uploadsongfile.createlibrarytrack import *
from retrievesimilarsongs.librarysimilarsongs import *

#import cyanite

# says that this function can do handle POST requests
@api_view(["POST"])
def summarize_view(request):
	
	# handle data inputs
	if request.method == "POST":
		
		# get the data and provide No value if not given
		text = request.data.get("text", None)
		
		# add it to the database and save
		new_addition = Text(text=text)
		new_addition.save()

		# pull the text and summarize it
		
		
		# return answer & status 200 (meaning everything worked!) 
		return Response(text, status=200)

@csrf_exempt
def webhook_handler(request):
	# Process the webhook data here
	# Your webhook processing logic...
	#if request.method == 'POST':
        # Process the incoming webhook data
		#data = json.loads(request.body)

        # Do whatever processing you need with the data (e.g., update your database)
		#return data
		
	return HttpResponse(status=200)
	return HttpResponse(status=400)

#def GraphQLView(request):
#	Query.resolve_get_music_recommendations()

@csrf_exempt
def upload_mp3(request):
	if request.method == 'POST':
		form = MP3FileForm(request.POST, request.FILES)
		if form.is_valid():

			#saving the mp3file object (model)
			mp3file_obj = form.save()
			print(mp3file_obj.name)

			#send graph_ql request
			upload_request_data = request_upload()

			#upload file to library
			upload_url = upload_request_data['uploadUrl']
			upload_id = upload_request_data['id']
			upload_file(upload_url, mp3file_obj.mp3_file)
		
			#create library track
			library_track_id = create_library_track(upload_id, mp3file_obj.name)

			#request similar songs (NEED TO WAIT UNTIL SONG IS ANALYZED)
			similar_songs_data = request_similar_from_library(library_track_id)

			return HttpResponse(similar_songs_data, status=200)
			return HttpResponse('form recieved successfully!', status=200)
	else:
		form = MP3FileForm()
	return render(request, 'upload_mp3.html', {'form': form})