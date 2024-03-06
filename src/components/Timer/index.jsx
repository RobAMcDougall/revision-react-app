import { useState, useEffect } from "react";
import "./index.css";
import timerSound from "../../../public/beep-sound-8333.mp3"; // Import your sound file

const Timer = () => {
  const workDuration = 1500;
  const breakDuration = 300;
  const [seconds, setSeconds] = useState(workDuration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            new Audio(timerSound).play();
            return prevSeconds;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const resetTimer = () => {
    setSeconds(workDuration);
    setIsActive(false);
  };
  const addBreak = () => {
    setSeconds(0);
    setTimeout(() => {
      setSeconds((prevSeconds) => prevSeconds + breakDuration);
    }, 1000);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="timer">
      <div className="timer-display">
        {minutes}:{remainingSeconds < 10 ? "0" : ""}
        {remainingSeconds}
      </div>
      <div className="timer-buttons">
        <button className="timer-button" onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="timer-button" onClick={resetTimer}>
          Pomodoro
        </button>
        <button className="timer-button" onClick={addBreak}>
          Add 5 Min Break
        </button>
      </div>
    </div>
  );
};

export default Timer;
