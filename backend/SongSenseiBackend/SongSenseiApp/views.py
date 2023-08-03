from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Text

from songanalyzer.songanalyze import * 
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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

