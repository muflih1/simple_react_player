import React from "react";
import VerticalSlidar from "./VerticalSlidar";

export default function Controls({
  currentTime,
  maxTime,
  togglePlay,
  paused,
  toggleFullscreen,
  fullscreen,
}) {
  return (
    <div className="buttons-container">
      <div className="left">
        <button className="player-button" onClick={togglePlay}>
          {paused ? (
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M21 12L4 2v20l17-10z"></path>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M4 2h5v20H4V2zm11 20h5V2h-5v20z"></path>
              </g>
            </svg>
          )}
        </button>
      </div>
      <div className="right">
        <div className="duration">
          <span>
            {currentTime} / {maxTime}
          </span>
        </div>
        <div className="sound-container">
          <button className="player-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M15 22.94V1.06L6.68 7H3.5C2.12 7 1 8.12 1 9.5v5C1 15.88 2.12 17 3.5 17h3.18L15 22.94zM3.5 9H6v6H3.5c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5zM13 19.06l-5-3.57V8.51l5-3.57v14.12zm5.95-12.01c-.24-.24-.49-.45-.75-.65l1-1.75c.41.29.8.62 1.16.99 3.52 3.51 3.52 9.21 0 12.72-.36.37-.75.7-1.16.99l-1-1.75c.26-.2.51-.41.75-.65 2.73-2.73 2.73-7.17 0-9.9zM17 12c0-.8-.31-1.52-.82-2.06l1.02-1.78c1.1.91 1.8 2.29 1.8 3.84s-.7 2.93-1.8 3.84l-1.02-1.78c.51-.54.82-1.26.82-2.06z"></path>
              </g>
            </svg>
          </button>
          <VerticalSlidar  />
        </div>
        <button className="player-button" onClick={toggleFullscreen}>
          {fullscreen ? (
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M21.457 3.96L16.414 9H21v2h-8V3h2v4.59l5.043-5.05 1.414 1.42zM3 13h8v8H9v-4.59l-5.043 5.05-1.414-1.42L7.586 15H3v-2z"></path>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M13 3h8v8h-2V6.41l-5.043 5.05-1.414-1.42L17.586 5H13V3zm-1.543 10.96L6.414 19H11v2H3v-8h2v4.59l5.043-5.05 1.414 1.42z"></path>
              </g>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
