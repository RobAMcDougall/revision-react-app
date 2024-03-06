const {v4: uuid} = require("uuid");
const db = require("../db/db");

async function createSession(user_id) {
    const response = await db.query(
        "INSERT into auth_session (account, token) VALUES ($1, $2) RETURNING token;",
        [user_id, uuid(undefined, undefined, undefined)]
    );
    return response.rows[0];
}

async function getSession(token) {
    const response = await db.query("SELECT * FROM auth_session WHERE token = $1;", [token]);
    
    try {
        return response.rows[0];
    } catch {
        throw new Error("Token could not be found.");
    }
}

async function destroySession(token) {
    const response = await db.query("DELETE FROM auth_session WHERE token = $1 RETURNING *;", [token]);
    
    try {
        return response.rows[0];
    } catch {
        throw new Error("Token could not be found.")
    }
}

module.exports = {createSession, getSession, destroySession};