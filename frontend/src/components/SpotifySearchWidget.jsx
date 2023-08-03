import React, { useEffect } from 'react';

const SpotifySearchWidget = () => {
  const SPOTIFY_CLIENT_ID = '60d3214a14d64ae0bc29adcb6e50628e';

  useEffect(() => {
    // Load Spotify Widget SDK without using the proxy
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Spotify SDK
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify SDK is ready');
      setTimeout(() => {
        const player = new Spotify.Player({
          name: 'My Web Player',
          getOAuthToken: cb => cb(SPOTIFY_CLIENT_ID)
        });

      // Connect to the Spotify service
      player.connect();
    }, 1000);
  };
    // Clean up
    return () => {
      // Remove the Spotify Widget SDK script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return <div id="spotify-search-widget" style={{ width: '300px', height: '380px' }}>
  {/* Adjust width and height as needed */}
</div>
};

export default SpotifySearchWidget;
