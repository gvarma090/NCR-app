const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * GET all drivers (filterable by status)
 * /api/admin/drivers?status=PENDING|APPROVED|BLOCKED
 */
router.get("/drivers", async (req, res) => {
  const { status } = req.query;

  let query = `
    SELECT phone, vehicle_type, approval_status, blocked, created_at
    FROM users
    WHERE role='DRIVER'
  `;
  const params = [];

  if (status === "PENDING") {
    query += " AND approval_status='PENDING' AND blocked=false";
  }
  if (status === "APPROVED") {
    query += " AND approval_status='APPROVED' AND blocked=false";
  }
  if (status === "BLOCKED") {
    query += " AND blocked=true";
  }

  query += " ORDER BY created_at DESC";

  const result = await db.query(query, params);
  res.json(result.rows);
});

/**
 * APPROVE DRIVER
 */
router.post("/approve", async (req, res) => {
  const { phone } = req.body;

  await db.query(
    `UPDATE users
     SET approval_status='APPROVED', blocked=false
     WHERE phone=$1 AND role='DRIVER'`,
    [phone]
  );

  res.json({ message: "Driver approved" });
});

/**
 * BLOCK DRIVER
 */
router.post("/block", async (req, res) => {
  const { phone } = req.body;

  await db.query(
    `UPDATE users
     SET blocked=true
     WHERE phone=$1 AND role='DRIVER'`,
    [phone]
  );

  res.json({ message: "Driver blocked" });
});

/**
 * UNBLOCK DRIVER
 */
router.post("/unblock", async (req, res) => {
  const { phone } = req.body;

  await db.query(
    `UPDATE users
     SET blocked=false
     WHERE phone=$1 AND role='DRIVER'`,
    [phone]
  );

  res.json({ message: "Driver unblocked" });
});

module.exports = router;

