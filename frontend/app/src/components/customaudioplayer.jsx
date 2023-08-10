import React, { useState, useEffect, useRef } from 'react';
import './customaudioplayer.css'; // Import your custom audio player CSS file

const CustomAudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // Initial volume value

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeControlRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="custom-audio-player">
      <button className="play-button2" onClick={togglePlay}>
        {isPlaying ? (
          <i className="fas fa-pause" style={{ color: 'white' }}></i>
        ) : (
          <i className="fas fa-play" style={{ color: 'white' }}></i>
        )}
      </button>
      <div className="time">{`${formatTime(currentTime)} / ${formatTime(
          duration
        )}`}</div>
      <div className="progress-container">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          className="progress-bar"
          onChange={handleTimeChange}
          ref={progressBarRef}
          style={{
            backgroundImage: `-webkit-gradient(
              linear,
              left top,
              right top,
              color-stop(${currentTime / duration}, #1a8cff),
              color-stop(${currentTime / duration}, #d3d3d3)
            )`,
          }}
        />
      </div>
        <div className="volume-button">
            <i className="fas fa-volume-up"></i>
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
          ref={volumeControlRef}
          style={{
            backgroundImage: `-webkit-gradient(
              linear,
              left top,
              right top,
              color-stop(${volume}, #1a8cff),
              color-stop(${volume}, #d3d3d3)
            )`,
          }}
        />
      </div>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          setDuration(audioRef.current.duration);
        }}
        volume={volume}
      />
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default CustomAudioPlayer;
