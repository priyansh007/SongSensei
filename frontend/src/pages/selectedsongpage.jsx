import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectedSongPage = ({ trackId, accessToken }) => {
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/fetch_song_details/',
          {
            trackId: trackId,
            accessToken: accessToken,
          }
        );

        // Assuming the backend returns the song details in the response data
        setTrackInfo(response.data);
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    fetchSongDetails();
  }, [trackId, accessToken]);

  if (!trackInfo) {
    return <p>Loading...</p>;
  }

  const { name, artist, album, preview_url } = trackInfo;

  return (
    <div className="selected-song-page">
      <div className="song-info">
        <h2>{name}</h2>
        <p>Artist: {artist}</p>
        <p>Album: {album}</p>
      </div>
      <div className="song-preview">
        {preview_url ? (
          <audio controls>
            <source src={preview_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>No preview available</p>
        )}
      </div>
    </div>
  );
};

export default SelectedSongPage;
