const db = require("../db/db");

async function createAccount(data) {
    const {username, email, password} = data;
    const response = await db.query(
        "INSERT INTO account (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
        [username, email, password]
    );

    return response.rows[0];
}

async function getAccount(username) {
    const response = await db.query("SELECT * FROM account WHERE username = $1;", [username]);

    try {
        return response.rows[0];
    } catch {
        throw new Error("User could not be found.");
    }
}

module.exports = {createAccount, getAccount};
