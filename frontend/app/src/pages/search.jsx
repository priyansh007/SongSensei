import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, useLocation, useRoute,} from 'wouter';
import axios from 'axios';
import config from './config';
import SelectedSongPage from './details';
import './search.css'; // Import CSS file for styling
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import { useAccessToken } from '../AccessTokenContext';

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
  const { accessToken, updateAccessToken } = useAccessToken();;
  const [hasSearched, setHasSearched] = useState(false);
  const [match, params] = useLocation();
  const [location, setLocation] = useLocation(); // Add this line to get the location
  const [accessTokenFetched, setAccessTokenFetched] = useState(false);

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
    if (!accessTokenFetched) {
      try {
        const response = await axios.post(
          'http://localhost:8000/callback/',
          { code: code },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
          const { access_token } = response.data;
          if (access_token!=null){
            updateAccessToken(access_token);
          }
          
        } else {
          console.error('Error: Unexpected status code', response.status);
        }
      } catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
      }
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
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    config.redirectUri
  )}&scope=user-library-read`;
    
  };

  const sendTrackToBackend = async (trackId) => {
    try {
      // Make an HTTP POST request to your backend with the selected track ID in the request body
      await axios.post('http://localhost:8000/track/', { trackId});
    } catch (error) {
      console.error('Error sending track ID and access token to backend for track:', error);
    }
  };
  
  const fetch_song_details = async (trackId, accessToken) => {
    console.log('error', accessToken)
    console.log("trackid", trackId)
    try {
      const response = await axios.post(
        'http://localhost:8000/get_track_info/', // Replace with the URL of your Django backend function
        {
          trackId: trackId.id,
          accessToken: accessToken,
        }
      );
  
      // The response object will contain the information sent back from the backend
      // You can access the data returned by the backend using response.data
      console.log('Track ID and access token sent to backend for selected song page:', trackId, accessToken);
      console.log('Response from backend:', response.data);
  
      // Assuming the backend returns the song details in response.data, you can now use the song details
      // For example, if the backend returns a JSON object with song details, you can access them like this:
      const fetchedsongdetails = response.data;
      return fetchedsongdetails;
      // Now you can use the songDetails object to display information about the song in your frontend.
  
    } catch (error) {
      console.error('Error sending track ID and access token to backend for selected song page:', error);
    }
  };

  const handleSelectTrack = async (trackId) => {
    try {
      const song_details = await fetch_song_details(trackId, accessToken);
      console.log('Song details:', song_details);
      const songDetailsQueryParam = encodeURIComponent(JSON.stringify(song_details));
      setLocation(`/details/?song_details=${songDetailsQueryParam}`);
    } catch (error) {
      console.error('Error selecting track:', error);
    }
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-slate-600 font-montserrat text-black">
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
  
      {/* Render the SelectedSongPage component when a song is selected */}
      <Route path="/details/">
        {({ params }) => <SelectedSongPage/>}
      </Route>
        
      {/* Render the SearchResults component with the necessary props */}
      {hasSearched ? (
        searchResults.length > 0 ? (
          <SearchResults
            results={searchResults}
            handleTrackSelect={handleSelectTrack}
            sendTrackToBackend={sendTrackToBackend}
          />
        ) : (
          <p>{accessToken ? 'No results found.' : 'Please log in first.'}</p>
        )
      ) : null}
    </div>
  );
};

export default SpotifySearch;
