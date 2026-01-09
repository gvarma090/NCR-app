import React, { useEffect, useState } from "react";
import { fetchDrivers, approveDriver, rejectDriver } from "../services/api";

export default function AdminDashboard() {
  const [drivers, setDrivers] = useState([]);

  const loadDrivers = async () => {
    const data = await fetchDrivers();
    setDrivers(data);
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>🚦 Driver Approval Dashboard</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: 20, width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Phone</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th>Subscription</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map(driver => (
            <tr key={driver.phone}>
              <td>{driver.phone}</td>
              <td>{driver.vehicleType}</td>

              <td>
                {driver.approvalStatus === "APPROVED" && "✅ APPROVED"}
                {driver.approvalStatus === "PENDING" && "⏳ PENDING"}
                {driver.approvalStatus === "REJECTED" && "❌ REJECTED"}
              </td>

              <td>
                {driver.subscription.expired
                  ? "❌ EXPIRED"
                  : "🟢 ACTIVE"}
              </td>

              <td>
                {driver.approvalStatus === "PENDING" && (
                  <>
                    <button
                      style={{ marginRight: 10 }}
                      onClick={async () => {
                        await approveDriver(driver.phone);
                        loadDrivers();
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={async () => {
                        await rejectDriver(driver.phone);
                        loadDrivers();
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

