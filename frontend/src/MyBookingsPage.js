import React, { useEffect, useState } from 'react';

export default function MyBookingsPage() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [bookings, setBookings] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/reservations?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setBookings(data));
    fetch('/api/spaces')
      .then(res => res.json())
      .then(data => {
        setSpaces(data);
        setLoading(false);
      });
  }, [user.id]);

  const getSpaceName = (id) => {
    const space = spaces.find(s => s.id === Number(id));
    return space ? space.name : id;
  };

  if (loading) return <div>Loading your bookings...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 12 }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookings.map(b => (
            <div key={b.id} style={{
              background: '#f8fafc',
              borderRadius: 16,
              padding: 20,
              boxShadow: '0 2px 8px #0001'
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                Space: {getSpaceName(b.spaceId)}
              </div>
              <div>Start: {b.startTime}</div>
              <div>End: {b.endTime}</div>
              <div>Status: {b.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 