import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import pici from './assets/PICTURE.png';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Updated Blue + Gold color palette
const colors = {
  primary: 'rgb(28, 93, 233)',       // Dark blue
  primaryDark: 'rgb(89, 174, 231)',   // Navy blue
  primaryLight: '#3B82F6',  // Bright blue
  secondary: '#0D9488',     // Green
  secondaryDark: '#0D9488', // Dark gold
  accent: '#0D9488',       // Orange accent
  text: '#1F2937',         // Dark gray
  textSecondary: '#4B5563', // Medium gray
  lightText: '#F9FAFB',     // Light text
  background: '#F8FAFC',    // Light background
  card: '#FFFFFF',         // White cards
  border: '#E5E7EB',       // Light border
  glass: 'rgba(255, 255, 255, 0.95)',
  glassBorder: 'rgba(255, 255, 255, 0.3)',
  shadow: '0 4px 20px rgba(30, 58, 138, 0.08)',
  status: {
    pending: { background: '#FEF3C7', color: '#D97706' },
    confirmed: { background: '#DBEAFE', color: '#1E40AF' },
    cancelled: { background: '#F3F4F6', color: '#6B7280' },
  },
};

function Stats({ stats }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
      gap: '1.5rem', 
      marginBottom: '2rem' 
    }}>
      {stats && stats.map((stat, index) => (
        <motion.div 
          key={index} 
          whileHover={{ y: -5 }}
          style={{ 
            background: colors.card, 
            padding: '1.75rem', 
            borderRadius: '16px', 
            border: `1px solid ${colors.border}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
        >
          <div style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: colors.secondary,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {stat.icon}
          </div>
          <div style={{ 
            color: colors.textSecondary, 
            marginBottom: '0.5rem',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            {stat.name}
          </div>
          <div style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            color: colors.primary,
            letterSpacing: '-0.5px'
          }}>
            {stat.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function UsersTab({ users, onEditUser, onDeleteUser, onUserUpdated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [editLoading, setEditLoading] = useState(false);

  const filteredUsers = users.filter(user => 
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle edit open
  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({ name: user.name || '', email: user.email || '' });
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const res = await fetch(`/api/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const updated = await res.json();
        onUserUpdated(updated);
        setEditUser(null);
      } else {
        alert('Failed to update user');
      }
    } catch (e) {
      alert('Error updating user');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2.5rem',
        background: `linear-gradient(to bottom, ${colors.card} 0%, ${colors.background} 100%)`,
        padding: '2rem',
        borderRadius: '24px',
        boxShadow: colors.shadow,
        border: `1px solid ${colors.border}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '100%',
          background: `linear-gradient(to bottom, ${colors.primary} 0%, ${colors.secondary} 100%)`
        }}></div>

        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '800',
          margin: 0,
          paddingLeft: '1rem',
          fontFamily: "'Poppins', sans-serif",
          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          User Management
        </h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              fontSize: '0.95rem',
              minWidth: '250px',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          />
        </div>
      </div>

      <div style={{ 
        background: colors.card,
        borderRadius: '24px',
        boxShadow: colors.shadow,
        border: `1px solid ${colors.border}`,
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr auto',
          gap: '1rem',
          marginBottom: '1.5rem',
          fontWeight: '600',
          color: colors.primary,
          padding: '0 1rem'
        }}>
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Actions</div>
        </div>
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ y: -5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr auto',
                gap: '1rem',
                alignItems: 'center',
                background: colors.card,
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                border: `1px solid ${colors.border}`
              }}
            >
              <div style={{ fontWeight: '600', color: colors.text }}>
                {user.name}
              </div>
              <div style={{ color: colors.textSecondary }}>{user.email}</div>
              <div>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  background: user.role === 'admin' 
                    ? colors.status.confirmed.background 
                    : colors.status.pending.background,
                  color: user.role === 'admin' 
                    ? colors.status.confirmed.color 
                    : colors.status.pending.color
                }}>
                  {user.role}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openEdit(user)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${colors.primary}`,
                    borderRadius: '8px',
                    padding: '0.5rem',
                    color: colors.primary,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✏️
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDeleteUser(user.id)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${colors.accent}`,
                    borderRadius: '8px',
                    padding: '0.5rem',
                    color: colors.accent,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  🗑️
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: colors.textSecondary, fontFamily: "'Poppins', sans-serif" }}>
            No users found
          </div>
        )}
        {/* Edit Modal */}
        {editUser && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.25)',
            zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <form onSubmit={handleEditSubmit} style={{
              background: colors.card,
              borderRadius: '16px',
              padding: '2rem',
              minWidth: 320,
              boxShadow: colors.shadow,
              display: 'flex', flexDirection: 'column', gap: '1.2rem',
              position: 'relative'
            }}>
              <h3 style={{ margin: 0, color: colors.primary }}>Edit User</h3>
              <label style={{ color: colors.text }}>Name
                <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required style={{ width: '100%', padding: '0.5rem', borderRadius: 8, border: `1px solid ${colors.border}`, marginTop: 4 }} />
              </label>
              <label style={{ color: colors.text }}>Email
                <input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} required style={{ width: '100%', padding: '0.5rem', borderRadius: 8, border: `1px solid ${colors.border}`, marginTop: 4 }} />
              </label>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditUser(null)} style={{ flex: 1, background: colors.border, border: 'none', borderRadius: 8, padding: '0.7rem', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={editLoading} style={{ flex: 1, background: colors.primary, color: 'white', border: 'none', borderRadius: 8, padding: '0.7rem', cursor: 'pointer' }}>{editLoading ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        )}
      </div>
      {filteredUsers.length > usersPerPage && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '2rem'
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '0.5rem 1rem',
              background: currentPage === 1 ? colors.border : colors.primary,
              color: currentPage === 1 ? colors.textSecondary : 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Previous
          </motion.button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <motion.button
              key={number}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(number)}
              style={{
                padding: '0.5rem 1rem',
                background: number === currentPage ? colors.primary : 'transparent',
                color: number === currentPage ? 'white' : colors.text,
                border: number === currentPage ? 'none' : `1px solid ${colors.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {number}
            </motion.button>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '0.5rem 1rem',
              background: currentPage === totalPages ? colors.border : colors.primary,
              color: currentPage === totalPages ? colors.textSecondary : 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Next
          </motion.button>
        </div>
      )}
    </div>
  );
}

function BookingsManagementTab({ bookings, onStatusChange }) {
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '1.7rem 0',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.2rem',
      fontFamily: 'Poppins, Segoe UI, sans-serif',
    }}>
      {bookings && bookings.map((booking) => (
        <motion.div
          key={booking.id}
          whileHover={{ y: -8, boxShadow: '0 12px 40px 0 rgba(30, 58, 138, 0.18)' }}
          style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(18px)',
            borderRadius: '28px',
            boxShadow: '0 8px 32px 0 rgba(30, 58, 138, 0.13)',
            border: 'none',
            padding: '2.2rem 2.7rem 2.2rem 0',
            display: 'grid',
            gridTemplateColumns: '12px 1fr',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'box-shadow 0.2s',
          }}
        >
          {/* Vertical accent bar */}
          <div style={{
            background: booking.status === 'confirmed' ? `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : 
                   booking.status === 'rejected' ? `linear-gradient(180deg, ${colors.accent} 0%, ${colors.secondaryDark} 100%)` : 
                   `linear-gradient(180deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
            width: '12px',
            height: '100%',
            borderRadius: '16px',
            marginRight: '2rem',
            boxShadow: '0 0 12px 0 rgba(30, 58, 138, 0.13)',
          }} />
          <div style={{ width: '100%', position: 'relative', paddingLeft: '3rem' }}>
            {/* Floating status badge */}
            <span style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2.2rem',
              padding: '0.5em 1.4em',
              borderRadius: '16px',
              fontWeight: 800,
              fontSize: '1.08rem',
              background: booking.status === 'confirmed' ? `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : 
                         booking.status === 'rejected' ? `linear-gradient(90deg, ${colors.accent} 0%, ${colors.secondaryDark} 100%)` : 
                         `linear-gradient(90deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
              color: '#fff',
              border: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 2px 12px rgba(30, 58, 138, 0.13)',
              textTransform: 'capitalize',
              zIndex: 2,
              transition: 'background 0.2s',
            }}>{booking.status}</span>
            {/* Space name/title */}
            <div style={{ fontWeight: 800, fontSize: '1.45rem', color: colors.text, letterSpacing: '-1px', marginBottom: '0.7rem', textShadow: `0 2px 8px ${colors.primary}22` }}>
              {booking.spaceName}
            </div>
            {/* Two-column info grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.3rem 2.5rem',
              fontSize: '1.08rem',
              color: colors.text,
              marginBottom: '1.2rem',
              alignItems: 'center',
            }}>
              <div><span style={{ color: colors.textSecondary, fontWeight: 600 }}>User:</span> <span style={{ fontWeight: 700 }}>{booking.userName}</span></div>
              <div><span style={{ color: colors.textSecondary, fontWeight: 600 }}>Reservation ID:</span> <span style={{ fontWeight: 700 }}>{booking.id}</span></div>
              <div><span style={{ color: colors.textSecondary, fontWeight: 600 }}>Start:</span> <span style={{ fontWeight: 700 }}>{formatDateTime(booking.startTime)}</span></div>
              <div><span style={{ color: colors.textSecondary, fontWeight: 600 }}>End:</span> <span style={{ fontWeight: 700 }}>{formatDateTime(booking.endTime)}</span></div>
            </div>
            {booking.status === 'pending' && (
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.2rem' }}>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onStatusChange(booking.id, 'confirmed')}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '1rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    fontSize: '1.08rem',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.7rem',
                    boxShadow: `0 2px 12px ${colors.primary}13`
                  }}
                >
                  <span></span>
                  Confirm
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onStatusChange(booking.id, 'rejected')}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondaryDark} 100%)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '1rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    fontSize: '1.08rem',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.7rem',
                    boxShadow: `0 2px 12px ${colors.accent}13`
                  }}
                >
                  <span></span>
                  Reject
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsDashboard({ reservations, users, spaces }) {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');
  const [hoveredData, setHoveredData] = useState(null);
  const [selectedUser, setSelectedUser] = useState('all');

  // Filter reservations by selected user
  const filteredReservations = useMemo(() => {
    if (selectedUser === 'all') return reservations;
    return reservations.filter(r => r.userId === selectedUser);
  }, [reservations, selectedUser]);

  // Process data based on selected time range
  const processData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let daysToShow = 7;
    if (timeRange === '30d') daysToShow = 30;
    if (timeRange === '90d') daysToShow = 90;
    const days = Array.from({ length: daysToShow }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (daysToShow - 1 - i));
      return d;
    });
    return days.map(day => {
      const dayStart = new Date(day);
      dayStart.setHours(0,0,0,0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23,59,59,999);
      const dayReservations = filteredReservations.filter(r => {
        const t = new Date(r.startTime || r.endTime);
        return t >= dayStart && t <= dayEnd;
      });
      return {
        date: day,
        dateLabel: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reservations: dayReservations.length,
        confirmed: dayReservations.filter(r => r.status === 'CONFIRMED').length,
        cancelled: dayReservations.filter(r => r.status === 'CANCELLED').length,
        revenue: dayReservations.reduce((sum, r) => sum + (r.price || 0), 0),
        users: dayReservations.map(r => r.userName).filter(Boolean),
        spaces: dayReservations.map(r => r.spaceName).filter(Boolean),
        details: dayReservations,
      };
    });
  }, [filteredReservations, timeRange]);

  // Space type distribution data
  const spaceTypeData = useMemo(() => {
    const spaceTypes = {};
    reservations.forEach(r => {
      const type = r.spaceType || 'Unknown';
      spaceTypes[type] = (spaceTypes[type] || 0) + 1;
    });
    return Object.entries(spaceTypes).map(([name, value]) => ({ name, value }));
  }, [reservations]);

  const COLORS = [colors.primary, colors.secondary, colors.accent, '#8b5cf6', '#64748b'];

  // Custom tooltip for reservations and revenue charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '1rem',
          fontFamily: "'Poppins', sans-serif",
          minWidth: 180
        }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: colors.primary }}>Date: {label}</div>
          <div>Reservations: {data.reservations}</div>
          <div>Revenue: {data.revenue} dh</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>Users:</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
            {data.details && data.details.map((r, i) => (
              <li key={i}>{r.userName} ({r.spaceName})</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for status distribution
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const status = payload[0].name;
      const total = processData.reduce((sum, d) => sum + d[status.toLowerCase()], 0);
      const reservationsList = processData.flatMap(d => d.details.filter(r => r.status === status.toUpperCase()));
      return (
        <div style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '1rem',
          fontFamily: "'Poppins', sans-serif",
          minWidth: 180
        }}>
          <div style={{ fontWeight: 700, marginBottom: 4, color: colors.primary }}>{status}: {total}</div>
          <div style={{ marginTop: 8, fontWeight: 600 }}>Users:</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13 }}>
            {reservationsList.map((r, i) => (
              <li key={i}>{r.userName} ({r.spaceName})</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem',
          fontWeight: '700',
          margin: 0,
          color: colors.primary,
          fontFamily: "'Poppins', sans-serif"
        }}>
          Analytics Dashboard
        </h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              background: colors.card,
              color: colors.text,
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer'
            }}
          >
            <option value="all">All Users</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name || u.email || u.id}</option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              background: colors.card,
              color: colors.text,
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer'
            }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              background: colors.card,
              color: colors.text,
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer'
            }}
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Reservations Per Space Pro Line Chart */}
        <motion.div
          whileHover={{ y: -10, boxShadow: '0 16px 48px 0 rgba(30, 58, 138, 0.18)' }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(224,247,250,0.95) 100%)',
            borderRadius: '32px',
            boxShadow: '0 8px 32px 0 rgba(30, 58, 138, 0.13)',
            border: '1.5px solid #e0e7ef',
            padding: '2.5rem 2.5rem 2rem 2.5rem',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '370px',
            transition: 'box-shadow 0.3s, transform 0.3s',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Decorative gradient accent */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '180px',
            height: '180px',
            background: `radial-gradient(circle at 60% 40%, ${colors.primary}33 0%, #fff0 80%)`,
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h4 style={{ 
              fontSize: '2rem',
              fontWeight: '900',
              margin: '0 0 0.5rem 0',
              fontFamily: "'Poppins', 'Inter', sans-serif",
              letterSpacing: '-1px',
              background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1,
            }}>
              Reservations Per Space
            </h4>
            <div style={{
              color: colors.textSecondary,
              fontWeight: 500,
              fontSize: '1.08rem',
              marginBottom: '2.2rem',
              fontFamily: "'Poppins', 'Inter', sans-serif",
            }}>
              Top {Math.min(5, spaces.length)} spaces by total bookings
            </div>
            <div style={{ height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spaces.map(s => ({
                  name: s.name || s.id,
                  reservations: reservations.filter(r => r.spaceId === s.id).length
                })).sort((a, b) => b.reservations - a.reservations).slice(0, 8)} margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
                  <defs>
                    <linearGradient id="colorResPro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.primary} stopOpacity={0.7}/>
                      <stop offset="100%" stopColor={colors.secondary} stopOpacity={0.15}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke="#e0e7ef" />
                  <XAxis dataKey="name" tick={{ fontSize: 15, fill: colors.primaryDark, fontWeight: 700 }} interval={0} angle={-18} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 15, fill: colors.primaryDark, fontWeight: 700 }} allowDecimals={false} axisLine={false} />
                  <Tooltip 
                    formatter={(value) => [value, 'Reservations']}
                    contentStyle={{ borderRadius: 16, fontFamily: "'Poppins', 'Inter', sans-serif", background: '#fff', border: '1.5px solid #e0e7ef', boxShadow: `0 4px 16px ${colors.primary}22` }}
                    labelStyle={{ fontWeight: 700, color: colors.primary, fontSize: 16 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reservations" 
                    stroke={colors.primary} 
                    strokeWidth={4}
                    dot={{ r: 8, fill: '#fff', stroke: colors.primary, strokeWidth: 4, filter: `drop-shadow(0 0 8px ${colors.primary}88)` }}
                    activeDot={{ r: 12, fill: colors.primary, stroke: colors.secondary, strokeWidth: 5, filter: `drop-shadow(0 0 12px ${colors.secondary}88)` }}
                    fill="url(#colorResPro)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Space Type Distribution */}
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: colors.card,
            borderRadius: '24px',
            boxShadow: colors.shadow,
            border: `1px solid ${colors.border}`,
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '320px'
          }}
        >
          <h4 style={{ 
            fontSize: '1.1rem',
            fontWeight: '600',
            margin: '0 0 1rem 0',
            color: colors.primary,
            fontFamily: "'Poppins', sans-serif"
          }}>
            Space Type Distribution
          </h4>
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={spaceTypeData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12, fill: colors.textSecondary }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 12, fill: colors.textSecondary }}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                  formatter={(value) => [value, 'Bookings']}
                  labelFormatter={(label) => `Space Type: ${label}`}
                />
                <Bar dataKey="value" fill={colors.primary} radius={[0, 4, 4, 0]}>
                  {spaceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AdminDashboardTab({ stats, reservations, users, spaces }) {
  // Join user and space info to each reservation
  const reservationsWithInfo = useMemo(() => {
    return reservations.map(res => {
      const user = users.find(u => u.id === res.userId) || {};
      const space = spaces.find(s => s.id === res.spaceId) || {};
      return {
        ...res,
        userName: user.name || 'Unknown',
        userEmail: user.email || '',
        spaceName: space.name || 'Unknown',
        spaceType: space.type || 'Unknown',
      };
    });
  }, [reservations, users, spaces]);

  // Sort reservations by startTime or endTime descending
  const recentReservations = [...reservationsWithInfo]
    .sort((a, b) => new Date(b.startTime || b.endTime) - new Date(a.startTime || a.endTime))
    .slice(0, 5);

  // Analytics data: reservations per day for last 7 days
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });
  const dayLabels = days.map(d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  const reservationsPerDay = days.map(day => {
    const dayStart = new Date(day); dayStart.setHours(0,0,0,0);
    const dayEnd = new Date(day); dayEnd.setHours(23,59,59,999);
    return reservationsWithInfo.filter(r => {
      const t = new Date(r.startTime || r.endTime);
      return t >= dayStart && t <= dayEnd;
    }).length;
  });
  const maxY = Math.max(...reservationsPerDay, 5);

  return (
    <div>
      <Stats stats={stats} />
      <AnalyticsDashboard reservations={reservationsWithInfo} users={users} spaces={spaces} />
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Recent Activity Card */}
        <motion.div
          whileHover={{ y: -5 }}
          style={{
            background: colors.card,
            borderRadius: '24px',
            boxShadow: colors.shadow,
            border: `1px solid ${colors.border}`,
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '6px',
            height: '100%',
            background: `linear-gradient(to bottom, ${colors.primary} 0%, ${colors.secondary} 100%)`
          }}></div>

          <h3 style={{ 
            fontSize: '1.5rem',
            fontWeight: '700',
            marginTop: 0,
            marginBottom: '1.5rem',
            color: colors.primary,
            fontFamily: "'Poppins', sans-serif"
          }}>
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentReservations.length === 0 && (
              <div style={{ color: colors.textSecondary, fontFamily: "'Poppins', sans-serif" }}>No recent reservations.</div>
            )}
            {recentReservations.map(res => (
              <div key={res.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(248, 250, 252, 0.7)',
                borderRadius: '12px',
                border: `1px solid ${colors.border}`
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  {res.userId}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: colors.text, marginBottom: '0.25rem' }}>
                    Reservation #{res.id}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: colors.textSecondary }}>
                    {res.status} • {formatDateTime(res.startTime || res.endTime)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return isoString;
    }
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return isoString;
  }
};

function AdminDashboard() {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('currentUserId');
  const [user, setUser] = useState(() => {
    if (currentUserId) {
      return JSON.parse(localStorage.getItem(`user_${currentUserId}`)) || {};
    }
    return {};
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState([
    { name: 'Total Users', value: '1,248', icon: '👥', change: '+12%' },
    { name: 'Active Bookings', value: '84', icon: '📅', change: '+5%' },
    { name: 'Revenue', value: '$12,845', icon: '💰', change: '+18%' },
    { name: 'Occupancy Rate', value: '78%', icon: '📊', change: '+3%' }
  ]);


  useEffect(() => {
    if (!user || !user.id) {
      navigate('/login');
      return;
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    // Fetch initial data
    fetchAdminData();
  }, [user, navigate]);

  // Update stats when users or bookings change
  useEffect(() => {
    const revenue = reservations.length * 100;
    const totalSpaces = 20;
    const occupancyRate = totalSpaces > 0 ? `${Math.round((reservations.length / totalSpaces) * 100)}%` : '0%';
    setStats([
      { name: 'Total Users', value: users.length.toString(), icon: '👥', change: '' },
      { name: 'Total Reservations', value: reservations.length.toString(), icon: '📅', change: '' },
      { name: 'Revenue', value: `${revenue} dh`, icon: '💰', change: '' },
      { name: 'Occupancy Rate', value: occupancyRate, icon: '📊', change: '' }
    ]);
  }, [users, reservations]);

  const fetchAdminData = async () => {

    try {
      // Fetch users
      const usersRes = await fetch('/api/users');
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }

      // Fetch spaces
      const spacesRes = await fetch('/api/spaces');
      if (spacesRes.ok) {
        const spacesData = await spacesRes.json();
        setSpaces(spacesData);
      }

      // Fetch reservations
      const reservationsRes = await fetch('/api/reservations');
      if (reservationsRes.ok) {
        const reservationsData = await reservationsRes.json();
        setReservations(reservationsData);
      }

      // Fetch stats (you might have a separate endpoint for admin stats)
      const statsRes = await fetch('/api/admin/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleEditUser = (user) => {
    // Open edit user modal or navigate to edit page
    console.log('Edit user:', user);
  };

  // Delete user handler (no confirmation)
  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(users => users.filter(u => u.id !== id));
      } else {
        alert('Failed to delete user');
      }
    } catch (e) {
      alert('Error deleting user');
    }
  };

  const handleEditBooking = (booking) => {
    // Open edit booking modal or navigate to edit page
    console.log('Edit booking:', booking);
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
          method: 'PUT'
        });
        
        if (response.ok) {
          setBookings(bookings.map(b => 
            b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
          ));
          // Show success message
        } else {
          console.error('Failed to cancel booking');
        }
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const updated = await res.json();
        setReservations(reservations => reservations.map(r => r.id === id ? updated : r));
      } else {
        alert('Failed to update status');
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Navigation items with icons
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  // Get current date with fancy formatting
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primaryLight}08 100%)`,
      display: 'flex',
      color: colors.text
    }}>
      {/* Navigation Sidebar - Enhanced Glassmorphism */}
      <nav style={{
        width: '90px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRight: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 0',
        boxShadow: '4px 0 20px rgba(30, 58, 138, 0.04)',
        zIndex: 2,
        backdropFilter: 'blur(10px)'
      }}>
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          style={{ marginBottom: '2rem', cursor: 'pointer' }}
          onClick={() => setActiveTab('dashboard')}
        >
          <svg width="36" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline 
              points="2,12 7,12 10,20 15,4 18,16 21,12 32,12" 
              stroke={colors.primary} 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        
        {/* Nav Icons */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          width: '100%',
          padding: '0 0.5rem'
        }}>
          {navItems.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id ? `${colors.primary}15` : 'transparent',
                border: 'none',
                borderRadius: '12px',
                width: '100%',
                height: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeTab === item.id ? colors.primary : colors.textSecondary,
                fontSize: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                padding: '0.5rem'
              }}
            >
              <div>{item.icon}</div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: '600',
                marginTop: '0.25rem'
              }}>
                {item.label}
              </div>
            </motion.button>
          ))}
        </div>
        
        {/* Avatar */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ 
            marginTop: 'auto', 
            marginBottom: '1rem',
            cursor: 'pointer'
          }}
        >
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'A')}&background=${colors.primary.replace('#', '')}&color=fff`} 
            alt="avatar" 
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              border: `2px solid ${colors.primaryLight}`,
              boxShadow: `0 4px 12px ${colors.primary}20`
            }} 
          />
        </motion.div>
      </nav>
      
      {/* Main Content */}
      <div style={{ 
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header - Enhanced Glassmorphism */}
        <header style={{
          padding: '1.25rem 2.5rem',
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <motion.h1 
            style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: 0,
              color: 'white',
              letterSpacing: '-0.5px'
            }}
          >
            {navItems.find(item => item.id === activeTab)?.label}
          </motion.h1>
          
          {/* Date and Logout in Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem' 
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.25rem',
              backdropFilter: 'blur(5px)'
            }}>
              <span>📅</span>
              {formattedDate}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                background: 'white',
                color: colors.primary,
                border: `2px solid white`,
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(30,58,138,0.15)',
                transition: 'all 0.25s cubic-bezier(.4,2,.6,1)',
                outline: 'none'
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7"></path>
                <path d="M9 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4"></path>
              </svg>
              Logout
            </motion.button>
          </div>
        </header>
        
        {/* Content */}
        <main style={{ 
          flex: 1,
          padding: '2.5rem',
          overflowY: 'auto',
          background: 'rgba(249, 250, 251, 0.5)'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <motion.div 
                  style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0rem 1rem 2.5rem 1rem',
                    minHeight: '100vh',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Welcome Card */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'linear-gradient(90deg,rgb(252, 252, 252) 0%,rgb(252, 255, 254) 100%)',
                      borderRadius: '20px',
                      boxShadow: '0 8px 24px 0 rgba(212, 175, 55, 0.10)',
                      padding: '0rem 4rem 0rem 4rem ',
                      marginBottom: '2.5rem',
                      minHeight: '160px',
                      position: 'relative',
                      overflow: 'hidden',
                      color: '#222',
                      maxWidth: '100%',
                    }}
                  >
                    {/* VIBRANT Welcome Section */}
                    <div style={{ 
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      height: '100%',
                      padding: '2rem 0',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Animated color splash */}
                      <div style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-10%',
                        width: '150%',
                        height: '150%',
                        background: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 50%)',
                        zIndex: 0,
                        animation: 'pulse 8s infinite alternate'
                      }}></div>

                      <div style={{
                        position: 'relative',
                        zIndex: 1
                      }}>
                        {/* Main greeting - Playful yet professional */}
                        <div style={{
                          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                          fontWeight: 800,
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                          lineHeight: 1.1,
                          fontFamily: "'Poppins', sans-serif",
                          letterSpacing: '-0.03em',
                          textShadow: '1px 1px 3px rgba(0,0,0,0.05)'
                        }}>
                          <span role="img" aria-label="wave" style={{ 
                            fontSize: '1.3em',
                            animation: 'waving 2s infinite'
                          }}></span>
                          Welcome <span style={{ 
                            color: 'inherit',
                            background: `linear-gradient(90deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                          }}>{user.name ? user.name.split(' ')[0] : 'Admin'}</span>!
                        </div>
                        
                        {/* Tagline - Vibrant and energetic */}
                        <div style={{
                          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                          color: colors.text,
                          margin: '0rem 0rem 0rem 0rem',
                          padding: '0.5rem 0rem 0rem 1.3rem',
                          fontWeight: 500,
                          maxWidth: '90%',
                          lineHeight: 1.5,
                          fontFamily: "'Poppins', sans-serif",
                          background: `linear-gradient(90deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`,
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}>
                          Manage your <span style={{ fontWeight: 700 }}>workspace</span> with ease<br/>
                          and <span style={{ fontWeight: 700 }}>optimize</span> your operations
                        </div>
                      </div>

                      {/* CSS Animations */}
                      <style>{`
                        @keyframes pulse {
                          0% { transform: scale(1); opacity: 0.15; }
                          50% { transform: scale(1.05); opacity: 0.2; }
                          100% { transform: scale(1); opacity: 0.15; }
                        }
                        @keyframes waving {
                          0% { transform: rotate(0deg); }
                          10% { transform: rotate(14deg); }
                          20% { transform: rotate(-8deg); }
                          30% { transform: rotate(14deg); }
                          40% { transform: rotate(-4deg); }
                          50% { transform: rotate(10deg); }
                          60% { transform: rotate(0deg); }
                          100% { transform: rotate(0deg); }
                        }
                      `}</style>
                    </div>
                    
                    {/* Right: Illustration */}
                    <div style={{ flex: '0 0 140px', marginLeft: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={pici}
                        alt="Welcome illustration"
                        style={{ width: '400px', height: 'auto', borderRadius: '12px' }}
                      />
                    </div>
                  </div>

                  <AdminDashboardTab stats={stats} reservations={reservations} users={users} spaces={spaces} />
                </motion.div>
              )}
              
              {/* Users Tab */}
              {activeTab === 'users' && (
                <UsersTab 
                  users={users}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                  onUserUpdated={updated => setUsers(users.map(u => u.id === updated.id ? updated : u))}
                />
              )}
              
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <BookingsManagementTab 
                  bookings={reservations.map(r => ({
                    ...r,
                    userName: users.find(u => u.id === r.userId)?.name || r.userId,
                    spaceName: spaces.find(s => s.id === r.spaceId)?.name || r.spaceId
                  }))}
                  onStatusChange={handleStatusChange}
                />
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    maxWidth: '700px',
                    margin: '0 auto',
                    padding: '0 1rem',
                  }}
                >
                  <AdminProfileCard user={user} setUser={setUser} />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function AdminProfileCard({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user.name || '',
    email: user.email || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser)
      });
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem(`user_${user.id}`, JSON.stringify({ ...user, ...updatedUser }));
        setEditedUser({ name: updatedUser.name, email: updatedUser.email });
        setIsEditing(false);
        setSaveMessage('Profile updated successfully!');
        if (setUser) setUser({ ...user, ...updatedUser });
      } else {
        setSaveMessage('Failed to update profile. Please try again.');
      }
    } catch (error) {
      setSaveMessage('An error occurred while updating your profile.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditedUser({ name: user.name || '', email: user.email || '' });
    setIsEditing(false);
    setSaveMessage('');
  };

  // Password change logic
  const handlePasswordChange = async () => {
    setIsPasswordSaving(true);
    setPasswordMessage('');
    try {
      const response = await fetch(`/api/users/${user.id}/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      if (response.ok) {
        setPasswordMessage('Password changed successfully!');
        setShowPasswordForm(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage('Failed to change password.');
      }
    } catch (error) {
      setPasswordMessage('An error occurred while changing your password.');
    } finally {
      setIsPasswordSaving(false);
      setTimeout(() => setPasswordMessage(''), 4000);
    }
  };

  const handleCancelPassword = () => {
    setShowPasswordForm(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordMessage('');
  };

  const isPasswordValid = currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(224,247,250,0.95) 100%)',
        borderRadius: '32px',
        boxShadow: '0 8px 32px 0 rgba(30, 58, 138, 0.13)',
        border: '1.5px solid #e0e7ef',
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '320px',
        marginTop: '2rem',
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '900',
          margin: '0 0 1.5rem 0',
          fontFamily: "'Poppins', 'Inter', sans-serif",
          letterSpacing: '-1px',
          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          lineHeight: 1.1,
        }}>
          Admin Profile
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              cursor: 'pointer'
            }}
          >
            {editedUser.name ? editedUser.name.charAt(0).toUpperCase() : 'A'}
          </motion.div>
          {!isEditing ? (
            <>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0.5rem 0', color: colors.primary }}>{editedUser.name || 'Admin'}</h3>
              <p style={{ color: colors.text, opacity: 0.8, margin: 0 }}>{editedUser.email}</p>
            </>
          ) : (
            <>
              <input
                type="text"
                value={editedUser.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder="Name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`,
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                }}
              />
              <input
                type="email"
                value={editedUser.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="Email"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: `1px solid ${colors.border}`,
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                }}
              />
            </>
          )}
        </div>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            style={{
              width: '100%',
              padding: '1rem',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}
          >
            Edit Profile
          </motion.button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveProfile}
              disabled={isSaving}
              style={{
                flex: 1,
                padding: '1rem',
                background: isSaving 
                  ? colors.border 
                  : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                color: isSaving ? colors.text : 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                fontSize: '1rem'
              }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancelEdit}
              style={{
                flex: 1,
                padding: '1rem',
                background: colors.border,
                color: colors.text,
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Cancel
            </motion.button>
          </div>
        )}
        {saveMessage && (
          <div style={{ color: saveMessage.includes('success') ? colors.primary : '#FF6B6B', marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>{saveMessage}</div>
        )}
        <div style={{ marginTop: '2rem' }}>
          {!showPasswordForm ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPasswordForm(true)}
              style={{
                width: '100%',
                padding: '1rem',
                background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
            >
              Change Password
            </motion.button>
          ) : (
            <div style={{ background: colors.background, borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', border: `1px solid ${colors.border}` }}>
              <input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: `1px solid ${colors.border}`, marginBottom: '1rem', fontSize: '1rem', fontFamily: 'inherit' }}
              />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New Password"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: `1px solid ${colors.border}`, marginBottom: '1rem', fontSize: '1rem', fontFamily: 'inherit' }}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: `1px solid ${colors.border}`, marginBottom: '1rem', fontSize: '1rem', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePasswordChange}
                  disabled={!isPasswordValid || isPasswordSaving}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: isPasswordSaving ? colors.border : `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
                    color: isPasswordSaving ? colors.text : 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: isPasswordSaving ? 'not-allowed' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {isPasswordSaving ? 'Saving...' : 'Save Password'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelPassword}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: colors.border,
                    color: colors.text,
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </motion.button>
              </div>
              {passwordMessage && (
                <div style={{ color: passwordMessage.includes('success') ? colors.primary : '#FF6B6B', marginTop: '1rem', textAlign: 'center', fontWeight: 600 }}>{passwordMessage}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;