from django.shortcuts import render, redirect

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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
def track_view(request):
    if request.method == 'POST':
        try:
            track_id = request.data.get('trackId')  # 'trackId' is the key used to send the track ID from the frontend
            print(f"Received track ID from frontend: {track_id}")
            # You can now do whatever you want with the track ID, such as saving it to your database or performing other operations.

            # Return a success response to the frontend
            return Response({'message': 'Track ID received successfully.'})
        except Exception as e:
            print(f"Error processing track ID: {str(e)}")
            return Response({'error': 'Failed to process track ID.'}, status=500)

    return Response({'error': 'Invalid request method.'}, status=405)

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
			#library_track_id = '15029843'
			similar_songs_data = request_similar_from_library(library_track_id)

			#turn raw data into spotify links
			spotify_links = raw_data_to_spotifylink(similar_songs_data)

			#return HttpResponse(spotify_links, status=200)
			return JsonResponse({'Similar songs to ' + mp3file_obj.name: spotify_links}, status=200)
			return HttpResponse('form recieved successfully!', status=200)
		
		return JsonResponse({'error': 'Form is not valid'}, status=400)
	else:
		form = MP3FileForm()
	return render(request, 'upload_mp3.html', {'form': form})

@api_view(["GET"])
def fetch_song_details(request):
    if request.method == 'GET':
        track_id = request.GET.get('trackId')
        access_token = request.GET.get('accessToken')
        print(access_token)
        print(track_id)
        # Do something with track_id and access_token, like fetching the song details from Spotify API
        
        # Assuming song_details is a dictionary containing information about the song
        song_details = {
            'track_id': track_id,
            'access_token': access_token,
            # Add other song details here
        }
        
        return JsonResponse(song_details)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=400)
