const API_URL = "http://100.52.126.162:4000/api/auth";

export async function fetchDrivers() {
  const res = await fetch(`${API_URL}/admin/drivers`);
  return res.json();
}

export async function approveDriver(phone) {
  return fetch(`${API_URL}/admin/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  });
}

export async function rejectDriver(phone) {
  return fetch(`${API_URL}/admin/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  });
}

