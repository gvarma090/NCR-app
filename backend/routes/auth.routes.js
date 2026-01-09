// backend/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * LOGIN / REGISTER
 */
router.post("/login", async (req, res) => {
  try {
    const { phone, role, vehicleType } = req.body;

    if (!phone || !role) {
      return res.status(400).json({ message: "phone and role required" });
    }

    // 1. Check existing user
    const existing = await db.query(
      "SELECT * FROM users WHERE phone=$1 AND role=$2",
      [phone, role]
    );

    if (existing.rows.length) {
      return res.json(existing.rows[0]);
    }

    // 2. Insert new user
    const result = await db.query(
      `INSERT INTO users
       (phone, role, vehicle_type, approval_status, blocked)
       VALUES ($1,$2,$3,'PENDING',false)
       RETURNING *`,
      [phone, role, role === "DRIVER" ? vehicleType : null]
    );

    return res.json(result.rows[0]);
  } catch (err) {
    console.error("AUTH LOGIN ERROR:", err);
    return res.status(500).json({ message: "Auth failed" });
  }
});

module.exports = router;

