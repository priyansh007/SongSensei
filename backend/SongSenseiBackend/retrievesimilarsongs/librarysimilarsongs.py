import requests
import os
import time

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
CYANITE_API_KEY = os.environ.get('CYANITE_ACCESS_TOKEN')

# THIS FUNCTION RETURNS THE RAW DATA CONTAINING LIST OF SONGS
# (dictionary with: index -> node -> id -> spotify track id)
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
    
    # TO-DO: CONTINUE REQUESTING UNTIL THE SONG HAS BEEN ANALYZED
    # --------------V V V V------------

    if response.status_code == 200:
        data = response.json()
        # Process the data returned by Cyanite
        #print(data)

        #turn RAW DATA into list of songs (dictionary with: index -> node -> id -> spotify track id)
        print(data)

        list_of_songs = []

        max_requests = 10

        for i in range(0, max_requests):
            response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)
            try:
                data = response.json()
                list_of_songs = data['data']['libraryTrack']['similarTracks']['edges']
                break
            except:
                #continue trying to request similar songs
                print("Similar songs request failed due to: ", data['data']['libraryTrack']['similarTracks'])
            
            time.sleep(5)
        
        return list_of_songs
    else:
        print("Request failed with status code:", response.status_code)
        response = requests.post(url, json={'query': query, 'variables': variables}, headers=headers)




#list_of_songs = request_similar_from_library('15018498')
#print(list_of_songs)
#print(len(list_of_songs))
#for i in range(0, len(list_of_songs)):
#    print('http://open.spotify.com/track/' + list_of_songs[i]['node']['id'])

# THIS FUNCTION TAKES IN THE OUTPUT OF request_similar_from_library()
# RETURNS AN ARRAY WITH THE SPOTIFY LINKS
def raw_data_to_spotifyids(raw_data):
    spotifylinks = []
    for i in range(0, len(raw_data)):
        
        # appends the actual track id to the list (along with making it a spotify url)
        try:
            spotifylinks.append(raw_data[i]['node']['id'])
        except:
            spotifylinks.append('Error retrieving this song.')

    return spotifylinks