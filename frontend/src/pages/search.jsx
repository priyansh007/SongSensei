import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import axios from 'axios';
import config from './config';
import './search.css'; // Import CSS file for styling

const handleLogin = () => {
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.redirectUri)}`;
};

const SearchResults = ({ results }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.pause();
      audioRef.current.src = currentTrack.preview_url;
      audioRef.current.load();
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Update the volume of the audio element
    }
  }, [volume]);

  const playMusic = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setCurrentTrack(null);
    } else {
      setCurrentTrack(track);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(parseFloat(newVolume)); // Update the volume state
  };

  return (
    <div className="search-results">
      <div className="volume-controls">
        <label>Volume:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
      </div>
      <h2>Search Results:</h2>
      <ul>
        {results.map((track) => (
          <li key={track.id} className="track-box">
            <div className="track-info">
              <h3>{track.name}</h3>
              <p>{track.artists[0].name}</p>
            </div>
            {track.preview_url ? (
              <div className="audio-controls">
                <button
                  className="play-button"
                  onClick={() => playMusic(track)}
                >
                  {currentTrack && currentTrack.id === track.id ? 'Pause' : 'Play'}
                </button>
              </div>
            ) : (
              <p>No preview available for this track.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SpotifySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Check if the URL has the authorization code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // If the code exists in the URL, it means the user has logged in and redirected back with the authorization code
      getAccessToken(code);
    }
  }, []);

  const getAccessToken = async (code) => {
    try {
      // Use the obtained code to fetch the access token from the backend
      const response = await axios.get('http://localhost:5000/callback', {
        params: {
          code: code,
        },
      });

      const accessToken = response.data.access_token;
      setAccessToken(accessToken); // Save the access token in state
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const handleSearchQuery = async () => {
    try {
      const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchQuery
      )}&type=track`;

      const response = await axios.get(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching data from Spotify:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-xl font-bold text-slate-600">Spotify Song Search</h1>
      <div className="mt-4">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          placeholder="Enter your search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSearchQuery}
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        {searchResults.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <div className="mt-4">
        {/* Call handleLogin when the user clicks on the login button */}
        <button
          className="px-4 py-2 mt-4 bg-green-500 text-white rounded-lg"
          onClick={handleLogin}
        >
          Login with Spotify
        </button>
      </div>
      <div className="mt-4">
        <Link href="/">Go Back</Link>
      </div>
    </div>
  );
};

export default SpotifySearch;
