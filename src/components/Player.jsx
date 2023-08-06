import React, { useEffect, useRef, useState } from "react";
import Seackbar from "./Seackbar";
import Controls from "./Controls";

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

export function formatDuration(time) {
  const second = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(second)}`;
  }

  return `${hours}:${leadingZeroFormatter.format(
    minutes
  )}:${leadingZeroFormatter.format(second)}`;
}

export default function Player() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [maxTime, setMaxTime] = useState("0:00");
  const [paused, setPaused] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolme] = useState(1);

  console.log(videoRef);

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          togglePlay();
          break;
        case "rightarrow":
          skip(10);
          break;
        case "leftarrow":
          skip(-10);
          break;
        case "f":
          toggleFullscreen();
          break;
        default:
      }
    }

    function fullscreenChange() {
      if (document.fullscreenElement == null) {
        setIsFullscreen(false);
      } else {
        setIsFullscreen(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", fullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", fullscreenChange);
    };
  }, [videoRef]);

  function toggleFullscreen() {
    if (document.fullscreenElement == null) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function skip(duration) {
    videoRef.current.currentTime += duration;
  }

  function togglePlay() {
    console.log("called");
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
  }

  const handleLoadedData = () => {
    const duration = videoRef.current.duration;
    setMaxTime(formatDuration(duration));
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const current = video.currentTime;
    setCurrentTime(formatDuration(current));
    const percent = video.currentTime / video.duration;
    setVideoProgress(percent);
  };

  return (
    <div className="player-container">
      <div className="aspect-spacer" />
      <div className="player-inner">
        <div className="player" ref={playerRef}>
          <video
            src="/assets/video.mp4"
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onDoubleClick={toggleFullscreen}
            onTimeUpdate={handleTimeUpdate}
            onLoadedData={handleLoadedData}
            ref={videoRef}
          ></video>
          <section className="player-controls">
            <div className="shade" />
            <div className="space-x">
              <Seackbar
                value={videoProgress}
                setValue={setVideoProgress}
                video={videoRef.current}
                setCurrentTime={setCurrentTime}
              />
              <Controls
                currentTime={currentTime}
                maxTime={maxTime}
                togglePlay={togglePlay}
                toggleFullscreen={toggleFullscreen}
                paused={paused}
                fullscreen={isFullscreen}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
