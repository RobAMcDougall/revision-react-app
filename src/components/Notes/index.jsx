import { useState } from "react";
import "./Note.css";

const Notes = () => {
  const [note, setNote] = useState("");

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const handleSave = () => {
    console.log("Note saved:", note);
  };

  return (
    <div className="notebook">
      <textarea
        className="note-textarea"
        value={note}
        onChange={handleChange}
        placeholder="Enter your notes here..."
        rows={5}
        cols={50}
      />
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Notes;
