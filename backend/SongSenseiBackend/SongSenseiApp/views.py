from django.shortcuts import render, redirect
from django.urls import reverse

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

import json
import base64

#import cyanite
from dotenv import load_dotenv
import os

load_dotenv()
access_tokken_cyanite = os.environ.get('CYANITE_ACCESS_TOKEN')
# says that this function can do handle POST requests

@api_view(["POST"])
def get_similar_tracks(request):
    if request.method == 'POST':
        try:
            track_id = request.data.get('track_id', None)
            num_of_tracks_requested = request.data.get('numoftracksrequested', None)
            if track_id and num_of_tracks_requested:
                # Construct and send a GraphQL query to Cyanite API
                query = '''
query SimilarTracksQuery($trackId: ID!, $first: Int!) {
  spotifyTrack(id: $trackId) {
    __typename
    ... on Error {
      message
    }
    ... on Track {
      id
      similarTracks(target: { spotify: {} }, first: $first) {
        __typename
        ... on SimilarTracksError {
          code
          message
        }
        ... on SimilarTracksConnection {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
                '''
                headers = {
                    'Authorization': f'Bearer {access_tokken_cyanite}',  # Add the access token to the Authorization header
                    'Content-Type': 'application/json'
                }
                response = requests.post('https://api.cyanite.ai/graphql', json={                    
                    'query': query,
                    'variables': {
                        'trackId': track_id,
                        'first': num_of_tracks_requested
                    }
                }, headers=headers)
                
                response_data = response.json().get('data', {}).get('spotifyTrack', {}).get('similarTracks', {}).get('edges', {})
                similar_track_ids = [item['node']['id'] for item in response_data]
                print(similar_track_ids)
                return JsonResponse({'similar_track_ids': similar_track_ids}, status=200)
            else:
                return JsonResponse({'error': 'Missing track_id or numoftracksrequested'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
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
            # Saving the mp3file object (model)
            mp3file_obj = form.save()
            filename = mp3file_obj.name
            print(filename)

            # Send GraphQL request
            upload_request_data = request_upload()

            # Upload file to library
            upload_url = upload_request_data['uploadUrl']
            upload_id = upload_request_data['id']
            upload_file(upload_url, mp3file_obj.mp3_file)

            # Create library track
            library_track_id = create_library_track(upload_id, filename)

            # Request similar songs (NEED TO WAIT UNTIL SONG IS ANALYZED)
            # library_track_id = '15029843'
            similar_songs_data = request_similar_from_library(library_track_id)

            # Turn raw data into Spotify links
            spotify_ids = raw_data_to_spotifyids(similar_songs_data)
            print(spotify_ids)

            # EXAMPLE FOR TESTING
            #spotify_ids = ['7g6zQwLazU2mBXhlXjPerU', '5GGkQIhAvpM4FfnMiygs6E']

            return JsonResponse({'spotify_ids': spotify_ids}, status=200)
            # return HttpResponse('form received successfully!', status=200)
        
        return JsonResponse({'error': 'Form is not valid'}, status=400)
    else:
        form = MP3FileForm()
    return render(request, 'upload_mp3.html', {'form': form})

@csrf_exempt
def analysis_results_view(request, song_data):
	if song_data:
		decoded_data = base64.urlsafe_b64decode(song_data.encode()).decode()
		spotify_links = json.loads(decoded_data)
		context = {
            'song_data': spotify_links
        }
		return render(request, 'results.html', context)
	else:
        # Handle the case when there is no data available
		return JsonResponse('No song data', status=200)
        
@api_view(["POST"])
def get_track_info(request):
    if request.method == 'POST':
        try:
            access_token = request.data.get('accessToken')  # 'accessToken' is the key used to send the access token from the frontend
            track_id = request.data.get('trackId')  # 'trackId' is the key used to send the track ID from the frontend

            headers = {'Authorization': f'Bearer {access_token}'}

            # Make a request to the Spotify API to get information about the track
            spotify_api_url = f'https://api.spotify.com/v1/tracks/{track_id}'
            try:
                response = requests.get(spotify_api_url, headers=headers)
                response_data = response.json()

                # Get the track image URL
                images = response_data.get('album', {}).get('images', [])
                track_image_url = images[0]['url'] if images else None

                # Assuming the response_data contains the track information, you can extract relevant details
                track_info = {
                    'track_id': track_id,
                    'name': response_data.get('name'),
                    'artists': [artist['name'] for artist in response_data.get('artists', [])],
                    'album': response_data.get('album', {}).get('name'),
                    'preview_url': response_data.get('preview_url'),
                    'release_date': response_data.get('album', {}).get('release_date'),
                    'popularity': response_data.get('popularity'),
                    'track_image_url': track_image_url,  # Add the track image URL
                    # Add more track details as needed
                }
                return Response(track_info)
            except requests.exceptions.RequestException as e:
                # Handle any errors that may occur during the request
                print('Error fetching track information:', e)
                return Response({'error': 'Failed to fetch track information.'}, status=500)

        except Exception as e:
            print(f"Error processing track ID: {str(e)}")
            return Response({'error': 'Failed to process track ID.'}, status=500)

@api_view(["POST"])
def callback(request):
    if request.method == 'POST':
        code = request.data.get('code')

        # Log the received code
        print('Received code:', code)

        try:
            token_response = requests.post(
                'https://accounts.spotify.com/api/token',
                data={
                    'grant_type': 'authorization_code',
                    'code': code,
                    'redirect_uri': os.environ.get('REDIRECT_URI'),
                },
                headers={
                    'Authorization': 'Basic ' + base64.b64encode(
                        (os.environ.get('CLIENT_ID') + ':' + os.environ.get('CLIENT_SECRET')).encode()
                    ).decode()
                }
            )

            access_token = token_response.json().get('access_token')
            return Response({'access_token': access_token})  # Return the access token here

        except Exception as e:
            print('Error exchanging authorization code for access token:', e)
            return Response({'error': 'Server Error'}, status=500)

    return Response({'error': 'Invalid Request'}, status=400)