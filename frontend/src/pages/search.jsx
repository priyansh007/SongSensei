import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import axios from 'axios';
import config from './config';
import './search.css'; // Import CSS file for styling

const handleLogin = () => {
  window.open(
    `https://accounts.spotify.com/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.redirectUri)}`,
    '_blank' // Open in a new tab
  );
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
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [hasSearched, setHasSearched] = useState(false); // New state for tracking if user has searched

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
      setLoading(true); // Set loading state to true while fetching data
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
      setSearchResults([]); // Set an empty array to indicate no results found
    } finally {
      setLoading(false); // Set loading state back to false after fetching data
      setHasSearched(true); // Update the state to indicate that the user has searched
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchQuery();
    }
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-slate-600 font-montserrat">
        Spotify Song Search
      </h1>
      <div className="mt-6">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none w-96"
          placeholder="Enter your search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : hasSearched ? (
          searchResults.length > 0 ? (
            <SearchResults results={searchResults} />
          ) : (
            <p>No results found.</p>
          )
        ) : null}
      </div>
      <div className="mt-4">
        {/* Center the "Login with Spotify" button */}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 mt-4 bg-green-500 text-white rounded-lg flex items-center"
            onClick={handleLogin}
          >
            <img src={"src/images/spotify.png"} alt="Spotify Logo" className="w-6 h-6 mr-2" />
            Login with Spotify
          </button>
        </div>
      </div>
      <div className="mt-4">
        {/* Wrap the "Go Back" link inside a button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          <Link href="/">Go Back</Link>
        </button>
      </div>
    </div>
  );
};


export default SpotifySearch;
