import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, useLocation } from 'wouter';
import axios from 'axios';
import config from './config';
import SelectedSongPage from './selectedsongpage';
import './search.css'; // Import CSS file for styling
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const SearchResults = ({ results, handleTrackSelect, sendTrackToBackend }) => {
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

  const handleSelectTrack = async (trackId) => {
    // Update the selectedSong state when a track is selected
    const selectedTrack = results.find((track) => track.id === trackId);
    handleTrackSelect(selectedTrack); // Call the function from the props
    sendTrackToBackend(trackId); // Call the sendTrackToBackend function with the track ID and accessToken
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
                <button className="play-button" onClick={() => playMusic(track)}>
                  {currentTrack && currentTrack.id === track.id ? 'Pause' : 'Play'}
                </button>
                <button className="select-button" onClick={() => handleSelectTrack(track.id)}>
                  Select
                </button>
              </div>
            ) : (
              <div className="audio-controls">
                <button className="select-button" onClick={() => handleSelectTrack(track.id)}>
                  Select
                </button>
              </div>
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
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [match, params] = useLocation();
  const [location, setLocation] = useLocation(); // Add this line to get the location

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
      const response = await axios.post('http://localhost:5000/callback', {
        code: code, // Send the code in the request body
      });
  
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        console.log("Received access token:", accessToken);
        setAccessToken(accessToken); // Save the access token in state
        setHasSearched(false); // Reset hasSearched state to false to clear previous search results
      } else {
        console.error('Error: Unexpected status code', response.status);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };
  
  const handleSearchQuery = async () => {
    try {
      setLoading(true);
      const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchQuery
      )}&type=track`;

      // Ensure that accessToken is not empty or undefined before making the request
      if (!accessToken) {
        setSearchResults([]); // Clear previous search results
        throw new Error('Please log in first');
      }

      const response = await axios.get(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching data from Spotify:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchQuery();
    }
  };

  const handleLogin = () => {
    setHasSearched(false); // Reset hasSearched state to false when the user clicks "Login with Spotify"
    window.open(
      `https://accounts.spotify.com/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(
        config.redirectUri
      )}&scope=user-library-read`,
      '_blank'
    );
    
  };
  

  const sendTrackToBackend = async (trackId) => {
    try {
      // Make an HTTP POST request to your backend with the selected track ID in the request body
      await axios.post('http://localhost:8000/track/', { trackId});
      console.log('Track ID sent to backend for track:', trackId);
    } catch (error) {
      console.error('Error sending track ID and access token to backend for track:', error);
    }
  };
  

  const handleSelectTrack = async (trackId) => {
    // Update the selectedSong state when a track is selected
    const selectedTrack = searchResults.find((track) => track.id === trackId);
    setSelectedSong(selectedTrack);
  
    // Call fetch_song_details_in_the_backend with the track ID and accessToken
    await fetch_song_details_in_backend(trackId, accessToken);
  
    // Use setLocation to change the URL and redirect to the SelectedSongPage
    setLocation(`/get_track_info/`);
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
        <div className="flex justify-center">
          <button
            className="px-4 py-2 mt-4 bg-green-500 text-white rounded-lg flex items-center"
            onClick={handleLogin}
          >
            <img src="src/images/spotify.png" alt="Spotify Logo" className="w-6 h-6 mr-2" />
            Login with Spotify
          </button>
        </div>
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          <Link href="/">Go Back</Link>
        </button>
      </div>

      {/* Render the SelectedSongPage component when a song is selected */}

      <Route path="/selected-song/:trackId">
        {({ params }) => (
          <SelectedSongPage trackId={params.trackId.toString()} accessToken={accessToken} />
        )}
      </Route>



      {/* Render the SearchResults component with the necessary props */}
      {hasSearched ? (
        searchResults.length > 0 ? (
          <SearchResults
            results={searchResults}
            handleTrackSelect={handleSelectTrack}
            sendTrackToBackend={sendTrackToBackend}
            setSelectedSong={setSelectedSong} // Pass setSelectedSong as a prop
          />
        ) : (
          <p>{accessToken ? 'No results found.' : 'Please log in first.'}</p>
        )
      ) : null}
    </div>
  );
};

export default SpotifySearch;