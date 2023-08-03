import requests

import json

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
CYANITE_API_KEY = os.environ.get('CYANITE_ACCESS_TOKEN')

def create_library_track(upload_id, name):
    url = 'https://api.cyanite.ai/graphql'  # Replace this with the actual GraphQL API endpoint
    headers = {'Content-Type': 'application/json',
               "Authorization": "Bearer " + CYANITE_API_KEY
    }

    # Define the GraphQL mutation and its variables
    mutation = """
    mutation LibraryTrackCreateMutation($input: LibraryTrackCreateInput!) {
      libraryTrackCreate(input: $input) {
        __typename
        ... on LibraryTrackCreateSuccess {
          createdLibraryTrack {
            id
          }
        }
        ... on LibraryTrackCreateError {
          code
          message
        }
      }
    }
    """

    variables = {
        "input": {
            "uploadId": upload_id,
            "title": name,
        }
    }

    # Execute the GraphQL mutation
    response = requests.post(url, headers=headers, json={"query": mutation, "variables": variables})

    # Check for errors and handle the response
    if response.status_code == 200:
        data = response.json()
        if 'errors' in data:
            # Handle any errors
            print("GraphQL Error:", data['errors'])
        else:
            # Handle the success response
            created_track_id = data['data']['libraryTrackCreate']['createdLibraryTrack']['id']
            print(f"Successfully created LibraryTrack with ID: {created_track_id}")
    else:
        print("Error:", response.status_code, response.text)

# Usage example
#create_library_track("My Song", "My Artist", "My Album", 240, "https://example.com/song.mp3")