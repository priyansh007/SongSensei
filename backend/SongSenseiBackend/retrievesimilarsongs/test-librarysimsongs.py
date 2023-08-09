from librarysimilarsongs import *

lib_track_id = '15018090'

similar_songs_data = request_similar_from_library(lib_track_id)

#turn raw data into spotify links
spotify_links = raw_data_to_spotifyids(similar_songs_data)

print(spotify_links)