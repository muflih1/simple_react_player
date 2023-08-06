import React, { useEffect, useRef, useState } from "react";
import { formatDuration } from "./Player";

export default function Seackbar({ value, setValue, video, setCurrentTime }) {
  const [isScrubbing, setIsScrubbing] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    function toggleDocuScrub(e) {
      if (isScrubbing) toggleScrubbing(e);
    }
    function handleDocMove(e) {
      if (isScrubbing) handleMouseMove(e);
    }

    document.addEventListener('mouseup', toggleDocuScrub);
    document.addEventListener('mousemove', handleDocMove);
    
    return () => {
      document.removeEventListener('mouseup', toggleDocuScrub);
      document.removeEventListener('mousemove', handleDocMove);
    }

  }, [isScrubbing]);


  const toggleScrubbing = (e) => {
    let buttons;
    if (e.nativeEvent) {
      buttons = e.nativeEvent.buttons;
    } else {
      buttons = e.buttons;
    }
    let x;
    if (e.nativeEvent) {
      x = e.nativeEvent.x;
    } else {
      x = e.x;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;
    setIsScrubbing((buttons & 1) === 1);

    if (isScrubbing) {
      video.pause();
    } else {
      video.currentTime = percent * video.duration;
    }

    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    let x;
    if (e.nativeEvent) {
      x = e.nativeEvent.x;
    } else {
      x = e.x;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;
    if (isScrubbing) {
      e.preventDefault();
      video.currentTime = percent * video.duration;
      setCurrentTime(formatDuration(video.currentTime));
      setValue(percent);
    }
  };

  const thumbWidth = 16;
  const thumbContainer = 32;

  const thumbPos = value * (thumbContainer - thumbWidth);

  return (
    <div
      className="seackbar-container"
      onMouseDown={toggleScrubbing}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div className="seackbar-area">
        <div className="progress" style={{ flexGrow: value }} />
        <div className="thumb-container" style={{ left: `calc(${(value * 100)}% - ${thumbPos}px)` }}>
          <div className="thumb" />
        </div>
      </div>
    </div>
  );
}
