// backend/db/pool.js
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "ncr-postgres",
  user: process.env.POSTGRES_USER || "ncr",
  password: process.env.POSTGRES_PASSWORD || "ncr",
  database: process.env.POSTGRES_DB || "ncr",
  port: 5432,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

module.exports = pool;

