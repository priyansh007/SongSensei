import React, { useState, useEffect, useRef} from 'react';
import './details.css';
import CustomAudioPlayer from '../components/customaudioplayer';
import { Link } from "wouter"; // Import the Link component

const SelectedSongPage = () => {
  const [songDetails, setSongDetails] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [dominantColor, setDominantColor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const displayRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const contentRef = useRef(null);

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

  const { name, artists, album, preview_url, release_date, popularity, track_image_url} = songDetails;

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
                <p className="popularity">Popularity: {popularity}/100 <i class="fas fa-fire" style={{ color: '#1a8cff', marginBottom: '4px', marginLeft: '3px'}}></i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="display" ref={displayRef}>
        <div className='display-header-container'>
          <div className='display-header' style={{ backgroundColor: `rgb(${dominantColor.r},${dominantColor.g},${dominantColor.b})` }}>
            <p className="sampleheader">sampleheader</p>
          </div>
          <div className='display-fade' style={gradientStyle}>
          </div>
        </div>
        <div className='display-body'>
          <p className="sampletext">sampletext</p>
          <p className="sampletext">sampletext</p>
          <p className="sampletext">sampletext</p>
          <p className="sampletext">sampletext</p>
          <p className="sampletext">sampletext</p>
          <p className="sampletext">sampletext</p>
          {isLoadingMore && <p className="loading-message">Loading more content...</p>}
        </div>
      </div>
      <div className="search-controls" ref={displayRef}>
        
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
          {popularity} <i class="fas fa-fire" style={{ color: '#1a8cff', marginBottom: '4px', marginLeft: '3px'}}></i>
        </div>
      </div>
    </div>
  );
};  

export default SelectedSongPage;
