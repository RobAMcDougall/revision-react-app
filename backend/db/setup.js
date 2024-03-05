const fs = require("fs");
const db = require("./db");

const sql = fs.readFileSync("./db/setup.sql").toString();
await db.query(sql);
