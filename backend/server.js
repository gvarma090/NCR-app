require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const rideRoutes = require("./routes/rides.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

/* HEALTH */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* API ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/admin", adminRoutes);

/* 🔑 ADMIN UI (CRITICAL FIX) */
app.use("/admin", express.static(__dirname + "/admin"));

/* FALLBACK: redirect /admin → /admin/index.html */
app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin/index.html");
});

app.listen(PORT, () => {
  console.log("🚀 Backend running on port " + PORT);
});

