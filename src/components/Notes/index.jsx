import { useState, useRef } from "react";
import "./Note.css";

const Notes = ({ currentTimestamp, setCurrentTimestamp, playerRef }) => {
  const [note, setNote] = useState("");
  const textareaRef = useRef(null);

  const handleSkipToTimestamp = (timestamp) => {
    setCurrentTimestamp(timestamp);
    const player = playerRef.current;
    if (player && player.seekTo) {
      player.seekTo(timestamp, true);
    }
  };

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const formatTimestamp = (timestamp) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `(${formattedMinutes}:${formattedSeconds})`;
  };

  const handleSave = () => {
    const currentValue = textareaRef.current.value;
    setNote(currentValue);
    textareaRef.current.value = currentValue;
  };

  const handleAddTimestamp = () => {
    const formattedTimestamp = formatTimestamp(currentTimestamp);
    setNote((prevNote) => `${prevNote} ${formattedTimestamp}`);
  };

  const extractTimestamps = () => {
    const timestampRegex = /\((\d{2}):(\d{2})\)/g;
    const matches = note.match(timestampRegex);
    return matches ? matches.map((match) => match.slice(1, -1)) : [];
  };

  const renderTimestampButtons = () => {
    const timestamps = extractTimestamps();
    return timestamps.map((timestamp, index) => (
      <button
        key={index}
        onClick={() => handleSkipToTimestamp(timestampToSeconds(timestamp))}
        className="timestamp-button"
      >
        {timestamp}
      </button>
    ));
  };

  const timestampToSeconds = (timestamp) => {
    const [minutes, seconds] = timestamp.split(":");
    return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  };

  return (
    <div className="notebook">
      <textarea
        className="note-textarea"
        ref={textareaRef}
        value={note}
        onChange={handleChange}
        placeholder="Enter your notes here..."
        rows={5}
        cols={50}
      />
      <div>
        <button className="timestamp-button" onClick={handleAddTimestamp}>
          Add Timestamp
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        {renderTimestampButtons()}
      </div>
    </div>
  );
};

export default Notes;
