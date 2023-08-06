import React, { useEffect, useRef, useState } from "react";

export default function VerticalSlidar({ value, setValue, video, setHide }) {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [zoomThumb, setZoomThumb] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    function removeStyles() {
      setZoomThumb(false);
      setActive(false);
      setHide(false);
    }
    function toggleDocScrub(e) {
      if (isScrubbing) toggleScrubbing(e);
    }
    function handleDocMove(e) {
      if (isScrubbing) handleMouseMove(e);
    }

    document.addEventListener("mousedown", toggleDocScrub);
    document.addEventListener("mouseup", (e) => {
      toggleDocScrub(e);
      removeStyles();
    });
    document.addEventListener("mousemove", handleDocMove);

    return () => {
      document.removeEventListener("mousedown", toggleDocScrub);
      document.removeEventListener("mouseup", (e) => {
        toggleDocScrub(e);
        removeStyles();
      });
      document.removeEventListener("mousemove", handleDocMove);
    };
  }, [isScrubbing]);

  const toggleScrubbing = (e) => {
    setZoomThumb(true);
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
    setHide(true);
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
      // video.volume = progress;
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
      onMouseUp={() => setZoomThumb(false)}
      onMouseMove={handleMouseMove}
      ref={sliderRef}
    >
      <div className="vertical-slider-area">
        <div className="progress" style={{ flexGrow: value }} />
        <div
          className={`thumb-container ${hovered ? "hover" : ""} ${
            active ? "active" : ""
          }`}
          style={{ bottom: `calc(${value * 100}% - ${thumbPos}px)` }}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
        >
          <div className={`thumb ${zoomThumb ? "zoom" : ""}`} />
        </div>
      </div>
    </div>
  );
}
