import { useState, useRef } from "react";
import "./Note.css";

const Notes = ({ currentTimestamp, setCurrentTimestamp }) => {
  const [note, setNote] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const formatTimestamp = (timestamp) => {
    // Convert seconds to minutes and seconds
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
  
    // Format the minutes and seconds with leading zeros
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
  
    return `(${formattedMinutes}:${formattedSeconds})`;
  };
  
  

  const handleSave = () => {
    // Get the current value of the textarea
    const currentValue = textareaRef.current.value;

    // Update the textarea content and state
    setNote(currentValue);
    textareaRef.current.value = currentValue;
  };

  const handleAddTimestamp = () => {
    // Add the formatted currentTimestamp to the last word
    const formattedTimestamp = formatTimestamp(currentTimestamp);
    setNote((prevNote) => `${prevNote} ${formattedTimestamp}`);
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
      </div>
    </div>
  );
};

export default Notes;
