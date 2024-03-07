const db = require("../db/db");

async function createVideoNote(videoId, text, timestamp) {
    const result = timestamp
        ? await db.query(
            "INSERT INTO video_note (video, text, timestamp) VALUES ($1, $2, $3) RETURNING *;",
            [videoId, text, timestamp])
        : await db.query(
            "INSERT INTO video_note (video, text) values ($1, $2) RETURNING *;",
            [videoId, text]);
    
    return result.rows[0];
}

async function getVideoNotes(video) {
    const response = await db.query("SELECT * FROM video_note WHERE video = $1", [video]);
    return response.rows;
}

async function deleteVideoNote(id){
    const response = await db.query("DELETE FROM video_note WHERE id = $1 RETURNING *;", [id]);

    try {
        return response.rows[0];
    } catch {
        throw new Error("Video note could not be found.");
    }
}

async function updateNoteText(id, text) {
    const response = await db.query(
        "UPDATE video_note SET text = $2 WHERE id = $1 RETURNING *;",
        [id, text]
    );

    try {
        return response.rows[0];
    } catch {
        throw new Error("Video note could not be found.");
    }
}

module.exports = {createVideoNote, getVideoNotes, deleteVideoNote, updateNoteText};
