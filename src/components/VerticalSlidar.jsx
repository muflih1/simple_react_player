import React, { useEffect, useRef, useState } from "react";

export default function VerticalSlidar({ value, setValue, video }) {
  const [isScrubbing, setIsScrubbing] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    function toggleDocScrub(e) {
      if (isScrubbing) toggleScrubbing(e);
    }
    function handleDocMove(e) {
      if (isScrubbing) handleMouseMove(e);
    }

    document.addEventListener("mousedown", toggleDocScrub);
    document.addEventListener("mouseup", toggleDocScrub);
    document.addEventListener("mousemove", handleDocMove);

    return () => {
      document.removeEventListener("mousedown", toggleDocScrub);
      document.removeEventListener("mouseup", toggleDocScrub);
      document.removeEventListener("mousemove", handleDocMove);
    };
  }, [isScrubbing]);

  const toggleScrubbing = (e) => {
    let buttons;
    if (e.nativeEvent) {
      buttons = e.nativeEvent.buttons;
    } else {
      buttons = e.buttons;
    }
    setIsScrubbing((buttons & 1) === 1);

    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    let y;
    if (e.nativeEvent) {
      y = e.nativeEvent.y;
    } else {
      y = e.y;
    }
    const rect = sliderRef.current.getBoundingClientRect();
    const progress =
      1 - Math.min(Math.max(0, y - rect.y), rect.height) / rect.height;
    if (isScrubbing) {
      e.preventDefault();
      video.volume = progress;
      video.muted = progress === 0;
      setValue(progress);
    }
  };

  const thumbHeight = 16;
  const thumbContainer = 32;

  const thumbPos = value * (thumbContainer - thumbHeight);

  return (
    <div
      className="vertical-slider-container"
      onMouseDown={toggleScrubbing}
      onMouseMove={handleMouseMove}
      ref={sliderRef}
    >
      <div className="vertical-slider-area">
        <div className="progress" style={{ flexGrow: value }} />
        <div
          className="thumb-container"
          style={{ bottom: `calc(${value * 100}% - ${thumbPos}px)` }}
        >
          <div className="thumb" />
        </div>
      </div>
    </div>
  );
}
