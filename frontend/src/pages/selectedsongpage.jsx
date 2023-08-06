import React from 'react';

const SelectedSongPage = ({ track }) => {
  // Assuming 'track' contains information about the selected song
  const { name, artist, album, preview_url } = track;

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
