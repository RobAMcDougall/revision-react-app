import { useState, useRef, useEffect } from "react";
import "./Note.css";

const Notes = ({ currentTimestamp, setCurrentTimestamp, playerRef }) => {
  const [note, setNote] = useState("");
  const textareaRef = useRef(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("videonotes", JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("videonotes")) || [];
    setNotes(storedNotes);
  }, []);

  const handleSkipToTimestamp = (timestamp) => {
    setCurrentTimestamp(timestamp);
    const player = playerRef.current;
    if (player) {
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
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleSave = () => {
    if (note.trim() === "") {
      return;
    }

    const formattedTimestamp = formatTimestamp(currentTimestamp);
    const newNote = {
      text: note,
      timestamp: currentTimestamp,
      formattedTimestamp: formattedTimestamp,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNote("");

    setCurrentTimestamp((prevTimestamp) => prevTimestamp);
  };

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes.splice(index, 1);
      return updatedNotes;
    });
  };

  const renderNotes = () => {
    return notes.map((note, index) => (
      <div key={index} className="note">
        <p className="note">{note.text}</p>
        <button
          onClick={() => handleSkipToTimestamp(note.timestamp)}
          className="timestamp-button"
        >
          {note.formattedTimestamp}
        </button>
        <button
          onClick={() => handleDeleteNote(index)}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    ));
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
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      {renderNotes()}
    </div>
  );
};

export default Notes;
