import React, { useState, useEffect, useRef } from 'react';
import './CustomAudioPlayer.css'; // Import your custom audio player CSS file

const CustomAudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5); // Initial volume value

  const audioRef = useRef(null);

  // Toggle play/pause state
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Function to update current time smoothly
  const smoothUpdateTime = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    if (isPlaying) {
      requestAnimationFrame(smoothUpdateTime);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (isPlaying) {
      requestAnimationFrame(smoothUpdateTime);
    }
  };

  const duration = audioRef.current ? audioRef.current.duration : 0;

  // Format time in minutes:seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="custom-audio-player">
      <button className="play-button" onClick={togglePlay}>
      {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
      </button>
      <div className="progress-container">
      <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          className="progress-bar"
          onChange={(e) => (audioRef.current.currentTime = e.target.value)}
        />
        <div className="time">{formatTime(currentTime)}</div>
      </div>
      <div className="audio-container">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          className="volume-control"
          onChange={handleVolumeChange}
        />
      </div>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        volume={volume}
      />
    </div>
  );
}
export default CustomAudioPlayer;
