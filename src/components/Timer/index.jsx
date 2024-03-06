import React, { useState, useEffect } from "react";
import './index.css'

export default function Timer() {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;

    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Timer completed, you can add your logic here
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  const handleStartStop = () => {
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(1500); // Reset to 25 minutes
  };

  return (
    <div className="timer-tile">
      <div className="timer-tile-white">
        <div className="timer-container">
          {/* Your donut-shaped display */}
          <div className="donut-display">
            <p className="timer-text">{formatTime(time)}</p>
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button onClick={handleStartStop}>
              {isActive ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
