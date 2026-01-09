// backend/routes/rides.routes.js
const express = require("express");
const router = express.Router();
const db = require("../db");

/* ============================
   CUSTOMER → REQUEST RIDE
============================ */
router.post("/request", async (req, res) => {
  const { customerPhone, source, destination, fare, vehicleType } = req.body;

  if (!customerPhone || !source || !destination || !fare || !vehicleType) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const result = await db.query(
    `INSERT INTO rides
     (customer_phone, source, destination, fare, vehicle_type)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [customerPhone, source, destination, fare, vehicleType]
  );

  res.json(result.rows[0]);
});

/* ============================
   DRIVER → VIEW PENDING RIDES
============================ */
router.get("/pending", async (req, res) => {
  const { phone } = req.query;

  const driver = await db.query(
    `SELECT vehicle_type
     FROM users
     WHERE phone=$1
       AND role='DRIVER'
       AND approval_status='APPROVED'
       AND blocked=false`,
    [phone]
  );

  if (!driver.rows.length) return res.json([]);

  const rides = await db.query(
    `SELECT *
     FROM rides
     WHERE status='REQUESTED'
       AND vehicle_type=$1
     ORDER BY created_at ASC`,
    [driver.rows[0].vehicle_type]
  );

  res.json(rides.rows);
});

/* ============================
   DRIVER → ACCEPT RIDE (FIXED)
============================ */
router.post("/accept", async (req, res) => {
  const { rideId, driverPhone } = req.body;

  try {
    // 🚫 BLOCK multiple active rides
    const active = await db.query(
      `SELECT id
       FROM rides
       WHERE driver_phone=$1
         AND status='ONGOING'`,
      [driverPhone]
    );

    if (active.rows.length > 0) {
      return res.status(400).json({
        message: "Driver already has an active ride"
      });
    }

    // ✅ Accept exactly ONE ride
    const result = await db.query(
      `UPDATE rides
       SET status='ONGOING',
           driver_phone=$1,
           updated_at=NOW()
       WHERE id=$2
         AND status='REQUESTED'
       RETURNING *`,
      [driverPhone, rideId]
    );

    if (!result.rows.length) {
      return res.status(400).json({ message: "Ride not available" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Accept ride error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================
   DRIVER → ACTIVE RIDE (FIXED)
============================ */
router.get("/active/:phone", async (req, res) => {
  const result = await db.query(
    `SELECT *
     FROM rides
     WHERE driver_phone=$1
       AND status='ONGOING'
     ORDER BY updated_at DESC
     LIMIT 1`,
    [req.params.phone]
  );

  res.json(result.rows[0] || null);
});

module.exports = router;

