import { useState } from "react";
import "./index.css";

export default function StickyNotes() {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addNote = () => {
    if (inputValue.trim() !== "" && notes.length < 4) {
      setNotes([
        ...notes,
        { id: Date.now(), text: inputValue, color: getRandomColor() },
      ]);
      setInputValue("");
    }
  };

  const removeNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const getRandomColor = () => {
    const colors = ["#ffcc99", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="stickyNotes-tile">
      <div className="stickyNotes-tile-white">
        <div className="sticky-notes-board">
          <h1>Sticky Notes Board</h1>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new note"
            />
            <button onClick={addNote}>Add</button>
          </div>
        </div>
      </div>
      <div className="notes-container">
        {notes.map((note) => (
          <div
            key={note.id}
            className="sticky-note"
            style={{ background: note.color }}
          >
            <p>{note.text}</p>
            <button onClick={() => removeNote(note.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
