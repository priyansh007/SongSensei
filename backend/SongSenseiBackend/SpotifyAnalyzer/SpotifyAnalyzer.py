import requests
import dotenv
import os
from dotenv import load_dotenv
load_dotenv()

url = 'https://api.cyanite.ai/graphql'

headers = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + 'CYANITE_API_KEY',  # Replace this with your actual access token if required
}

# Define the GraphQL mutation
mutation = '''
mutation SpotifyTrackEnqueueMutation($input: SpotifyTrackEnqueueInput!) {
  spotifyTrackEnqueue(input: $input) {
    __typename
    ... on SpotifyTrackEnqueueSuccess {
      enqueuedSpotifyTrack {
        id
      }
    }
    ... on Error {
      message
    }
  }
}
'''

Imported_Track_ID = os.getenv('SONG_ID')

# Replace YOUR_ACCESS_TOKEN with your actual access token (if required) and provide the input data
input_data = {
    "input": {
        "spotifyTrackId": Imported_Track_ID,  # Replace with the actual track ID
    }
}
# Make the GraphQL request
response = requests.post(url, json={'query': mutation, 'variables': input_data}, headers=headers)

# Check for errors in the response
if response.ok:
    data = response.json()
    print(data)
else:
    print(f"Request failed with status code {response.status_code}")
    print(response.text)

query = '''
query GetSpotifyTrackStatus($trackId: ID!) {
  getSpotifyTrack(trackId: $trackId) {
    status
  }
}
'''
# This will not return results. Instead, it will 
# attatch the analysis to the song ID. When you search 
# for songs similar to this, it will already have the song
# analyzed, making the search quicker. Also, this song
# will now show up in the results of other similar song searches.