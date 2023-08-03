import requests

import json

CYANITE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjo2NDcsInVzZXJJZCI6NTMxODAsImFjY2Vzc1Rva2VuU2VjcmV0IjoiMWFlNWJmYjY0M2M5MmMzMzE3MGQ3OGQ2ZGU5ODZjZGY0YjdhNDM3OTBhMGFkMTExOTUyODc1YTQ1OGQ0YzFjMSIsImlhdCI6MTY5MTA4ODU4MH0.vsThJX3YReRKQ_xttft309YQy_xQGLoyanq4uzt0okE'


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