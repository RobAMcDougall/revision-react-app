const db = require("../db/db");

async function createVideoCard(account, videoId){
    const response = await db.query(
        "INSERT INTO video_card (account, video_id) VALUES ($1, $2) RETURNING *;",
        [account, videoId]
    );
    
    return response.rows[0];
}

async function getVideoCard(id) {
    const response = await db.query("SELECT * FROM video_card WHERE id = $1", [id]);
    
    try {
        return response.rows[0];
    } catch {
        throw new Error("Video card could not be found.");
    }
}

async function deleteVideoCard(id){
    const response = await db.query("DELETE FROM video_card WHERE id = $1 RETURNING *;", [id]);
    
    try {
        return response.rows[0];
    } catch {
        throw new Error("Video card could not be found.");
    }
}

async function updateResumeTimestamp(id, timestamp) {
    const response = await db.query(
        "UPDATE video_card SET resume_timestamp = $2 WHERE id = $1 RETURNING *;",
        [id, timestamp]
    );
    
    try {
        return response.rows[0];
    } catch {
        throw new Error("Video card could not be found.");
    }
}

module.exports = {createVideoCard, getVideoCard, deleteVideoCard, updateResumeTimestamp};
