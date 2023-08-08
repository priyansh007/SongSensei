import React, { useState, useEffect } from 'react';
import './selectedsongpage.css';
import CustomAudioPlayer from '../components/customaudioplayer';
import { Link } from "wouter"; // Import the Link component

const SelectedSongPage = () => {
  const [songDetails, setSongDetails] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const songDetailsParam = searchParams.get('song_details');

    if (songDetailsParam) {
      const decodedSongDetails = JSON.parse(decodeURIComponent(songDetailsParam));
      setSongDetails(decodedSongDetails);
    }
  }, []);

  if (!songDetails) {
    // Render a loading message or null when songDetails is undefined or null
    return <p className="loading-message">Loading...</p>;
  }

  const { name, artists, album, preview_url, release_date, popularity } = songDetails;

  return (
    <div className="background-container">
      <div className="vertical-container-wrapper">
      <div className="navigate">
        <div className="home">
         <Link href="/">
            <i className="fas fa-home home-icon" style={{ marginRight: '30px' }}></i>Home
          </Link>
        </div>
        <div className="search">
          <Link href="/search">
            <i className="fas fa-search" style={{ marginRight: '30px' }}></i>
            Search
          </Link>
        </div>
      </div>
      <div className="songcontainer">
        <div className="song-details">
          <div className="details-container">
            <h2 className="song-title">{name}</h2>
            <div className="detail-item">
              <p className="artist">Artists: {artists.join(', ')}</p>
            </div>
            <div className="detail-item">
              <p className="album">Album: {album}</p>
            </div>
            <div className="detail-item">
              <p className="release-date">Release Date: {release_date}</p>
            </div>
            <div className="detail-item">
              <p className="popularity">Popularity: {popularity}/100 Score</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="display">
      </div>
      <div className="audio-player">
        {preview_url ? (
          <CustomAudioPlayer src={preview_url} />
        ) : (
          <p className="no-preview">No preview available.</p>
        )}
      </div>
    </div>
  );
};

export default SelectedSongPage;
