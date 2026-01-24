import { API_BASE_URL } from '../config/api';

export async function fetchPendingRides(userId: string) {
  const res = await fetch(
    `${API_BASE_URL}/rides/pending?userId=${userId}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch rides');
  }

  return res.json();
}

export async function acceptRide(
  rideId: number,
  driverUserId: string
) {
  const res = await fetch(
    `${API_BASE_URL}/rides/accept`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rideId,
        driverUserId
      })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Accept failed');
  }

  return data;
}

