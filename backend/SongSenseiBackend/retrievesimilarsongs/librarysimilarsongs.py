import requests
import os

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
CYANITE_API_KEY = os.environ.get('CYANITE_ACCESS_TOKEN')

# THIS FUNCTION RETURNS THE **RAW** DATA CONTAINING SIMILAR SONGS
def request_similar_from_library(track_id):
    url = "https://api.cyanite.ai/graphql"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + CYANITE_API_KEY
    }

    query = '''
    query SimilarTracksQuery($trackId: ID!) {
        libraryTrack(id: $trackId) {
            __typename
            ... on Error {
                message
            }
            ... on Track {
                id
                similarTracks(target: { spotify: {} }) {
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
    }'''

    variables = {
        'trackId': track_id,
    }

    response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)

    if response.status_code == 200:
        data = response.json()
        # Process the data returned by Cyanite
        print(data)
        return data
    else:
        print("Request failed with status code:", response.status_code)
