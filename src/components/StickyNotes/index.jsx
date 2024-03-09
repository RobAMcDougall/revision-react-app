import { useState, useEffect } from "react";
import "./sticky.css";

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

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

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
            <button className="sticky-button" onClick={addNote}>
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="notes-container">
        {notes.map((note) => (
          <div
            key={note.id}
            className="sticky-note"
            data-testid="sticky-note"
            style={{ background: note.color }}
          >
            <p>{note.text}</p>
            <button
              className="sticky-button "
              onClick={() => removeNote(note.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
