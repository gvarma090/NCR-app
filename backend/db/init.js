const db = require("./index");

async function initDB() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      phone TEXT PRIMARY KEY,
      role TEXT NOT NULL,
      vehicle_type TEXT,
      approval_status TEXT DEFAULT 'PENDING',
      blocked BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS rides (
      id SERIAL PRIMARY KEY,
      customer_phone TEXT NOT NULL,
      source TEXT NOT NULL,
      destination TEXT NOT NULL,
      fare INTEGER NOT NULL,
      vehicle_type TEXT NOT NULL,
      status TEXT DEFAULT 'REQUESTED',
      driver_phone TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("✅ DB schema ready");
}

module.exports = initDB;

