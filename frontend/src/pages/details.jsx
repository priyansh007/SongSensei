import React, { useState, useEffect, useRef} from 'react';
import './details.css';
import CustomAudioPlayer from '../components/customaudioplayer';
import { Link } from "wouter"; // Import the Link component
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
import { useAccessToken } from '../AccessTokenContext'; // Import the hook

const SelectedSongPage = () => {
  const [songDetails, setSongDetails] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [dominantColor, setDominantColor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const displayRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const contentRef = useRef(null);
  const [response, setResponse] = useState(null);
  const [similarTracks, setSimilarTracks] = useState([]);
  const { accessToken } = useAccessToken();
  const [similarSongDetails, setSimilarSongDetails] = useState([]);
  const [searchingSimilarTracks, setSearchingSimilarTracks] = useState(false); // New state variable
  

  const loadMoreContent = () => {
    setIsLoadingMore(true);
    // Simulate fetching more content from an API
    setTimeout(() => {
      setIsLoadingMore(false);
      setCurrentPage(prevPage => prevPage + 1);
    }, 1000); // Adjust the timeout as needed
  };

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoadingMore) {
      loadMoreContent();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [isLoadingMore]);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const songDetailsParam = searchParams.get('song_details');

    if (songDetailsParam) {
      const decodedSongDetails = JSON.parse(decodeURIComponent(songDetailsParam));
      setSongDetails(decodedSongDetails);
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = decodedSongDetails.track_image_url;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        const dataUrl = canvas.toDataURL("image/png");
        setImageDataUrl(dataUrl);

        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts = {};

        for (let i = 0; i < imageData.length; i += 4) {
          const rgb = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]}`;
          colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
        }

        const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
        const dominantRgb = sortedColors[0];
        const [r, g, b] = dominantRgb.split(',').map(Number);

        setDominantColor({ r, g, b });
      };
    }
  }, []);

  if (!songDetails || !dominantColor) {
    return <p className="loading-message">Loading...</p>;
  }

  const {track_id, name, artists, album, preview_url, release_date, popularity, track_image_url} = songDetails;

  // Adjust opacity values to control the fading effect
  const numSteps = 10; // Number of gradient steps
  const gradientSteps = [];

  for (let i = 0; i <= numSteps; i++) {
    const opacity = i / numSteps;
    gradientSteps.push(`rgba(${dominantColor.r},${dominantColor.g},${dominantColor.b}, ${opacity})`);
  }

  // Join the gradient steps with commas to create the gradient background
  const gradientColors = gradientSteps.join(', ');

  // Calculate gradient style using dominantColor

  const gradientStyle = {
    background: `
      linear-gradient(
        to top,
        ${gradientColors}
      ),
      #171717`,
  };

  const searchSimilarTracks = async (event) => {
    event.preventDefault();
    setSearchingSimilarTracks(true);
    try {
        const response = await fetch('http://localhost:8000/get_similar_tracks/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            track_id: track_id,
            numoftracksrequested: 10
          }
        )
        });

        if (response.ok) {
          const responseData = await response.json();
          const similarTrackIds = responseData.similar_track_ids; // Adjust the key based on the response structure
          const fetchedSimilarSongDetails = [];

          for (const similarTrackId of similarTrackIds) {
            const similarSongDetail = await fetch_song_details(similarTrackId, accessToken);
            fetchedSimilarSongDetails.push(similarSongDetail);
            console.log(fetchedSimilarSongDetails)
          }
        
          setSimilarSongDetails(fetchedSimilarSongDetails);
        } else {
          console.error('Error fetching similar tracks:', response.statusText);
        }
        
    } catch (error) {
        console.error(error);
    }
    setSearchingSimilarTracks(false);
};

  const fetch_song_details = async (trackId, accessToken) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/get_track_info/', // Replace with the URL of your Django backend function
        {
          trackId: trackId,
          accessToken: accessToken,
        }
      );

      // The response object will contain the information sent back from the backend
      // You can access the data returned by the backend using response.data
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

  return (
    <div className="background-container">
      <div className="vertical-container-wrapper">
        <div className="navigate">
          <div className="home">
            <Link href="/">
              <i className="fas fa-home home-icon" style={{ marginRight: '27px' }}></i>Home
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
              <div className="track-image-background" style={{ backgroundColor: `rgb(${dominantColor.r},${dominantColor.g},${dominantColor.b})` }}>
                <div className="track-image">
                  <img src={imageDataUrl} alt="Track Image" />
                </div>
              </div>
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
                <p className="popularity">Popularity: {popularity}/100 <i className="fas fa-fire" style={{ color: '#1a8cff', marginBottom: '4px', marginLeft: '3px'}}></i></p>
              </div>
              <div className='find-similar-tracks-container'>
                <button className='find-similar-tracks' onClick={searchSimilarTracks}>
                  Find Similar Tracks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="display" ref={displayRef}>
        <div className="display-body">
        {searchingSimilarTracks ? ( // Display loading message while searching
            <p className="instructions">Loading...</p>
          ) : similarSongDetails.length === 0 ? (
            <p className="instructions">Click Find Similar Tracks to get started.</p>
          ) : (
            similarSongDetails
              .filter((song, index, self) => index === self.findIndex((s) => s.name === song.name))
              .map((similarSongDetail, index) => (
                <div key={index} className="similar-song-detail-container">
                  <div className="similar-song-detail">
                    <p className="similar-song-title">{similarSongDetail.name}</p>
                    <p className="similar-song-artist">{similarSongDetail.artists.join(', ')}</p>
                    <p className="similar-song-album">Album: {similarSongDetail.album}</p>
                    <p className="similar-song-release">Release Date: {similarSongDetail.release_date}</p>
                    <p className="similar-song-popularity">
                      Popularity: {similarSongDetail.popularity}/100{' '}
                      <i className="fas fa-fire" style={{ color: '#1a8cff', marginBottom: '4px', marginLeft: '3px' }}></i>
                    </p>
                    <div className="audio-player-container">
                      {similarSongDetail.preview_url ? (
                        <CustomAudioPlayer src={similarSongDetail.preview_url} />
                      ) : (
                        <p className="no-preview">No preview available.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
          {isLoadingMore && <p className="loading-message">Loading more content...</p>}
        </div>
      </div>
      <div className="audio-player">
        <div className='songplaying'>
          <h1>{name}</h1>
        </div>
        <div className='songartist'>
          <p>[{artists}]</p>
        </div>
        {preview_url ? (
          <CustomAudioPlayer src={preview_url} />
        ) : (
          <p className="no-preview">No preview available.</p>
        )}
        <div className='songpopularity'>
          {popularity} <i className="fas fa-fire" style={{ color: '#1a8cff', marginBottom: '4px', marginLeft: '3px'}}></i>
        </div>
      </div>
    </div>
  );
};

export default SelectedSongPage;
