import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import pici from './assets/pici.png';

function Stats({ stats, colors }) {
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
            color: colors.primary,
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
            color: colors.primaryDark,
            letterSpacing: '-0.5px'
          }}>
            {stat.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BookingsTab({ colors, bookings, onCreateBooking, onCancelBooking, isDashboardView }) {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {!isDashboardView && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2.5rem',
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
          padding: '2rem',
          borderRadius: '24px',
          boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
          border: '1px solid rgba(242, 243, 247, 0.8)',
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
            background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
          }}></div>

          <h2 style={{ 
            fontSize: '2rem',
            fontWeight: '800',
            margin: 0,
            paddingLeft: '1rem',
            fontFamily: "'Poppins', sans-serif",
            background: 'linear-gradient(90deg, #2F3542 0%, #57606F 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-0.5px'
          }}>
            All My Bookings
          </h2>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onCreateBooking}
            style={{ 
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '14px',
              padding: '1rem 2rem',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.5px'
            }}
          >
            <span>➕</span> Book a Space
          </motion.button>
        </div>
      )}

      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem' 
      }}>
        {bookings && bookings.map((booking) => (
            <motion.div
              key={booking.id}
            whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(255, 107, 107, 0.15)' }}
              style={{ 
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
              border: '1px solid rgba(242, 243, 247, 0.8)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Decorative accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '6px',
              height: '100%',
              background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
            }}></div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              marginBottom: '1.5rem',
              paddingLeft: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  📅
                </div>
                <div>
                  <div style={{ 
                  fontWeight: '700',
                    fontSize: '1.2rem',
                    color: '#2F3542',
                    fontFamily: "'Poppins', sans-serif",
                    marginBottom: '0.25rem'
                  }}>
                    {formatDateTime(booking.date)}
                  </div>
                  <div style={{ 
                    color: '#A4B0BE',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    fontFamily: "'Poppins', sans-serif"
                }}>
                  {booking.spaceName || 'Space Name'}
                  </div>
                </div>
              </div>
                <div style={{
                background: booking.status === 'PENDING' 
                  ? 'linear-gradient(135deg, #FFD166 0%, #F9A826 100%)'
                  : booking.status === 'CONFIRMED'
                  ? 'linear-gradient(135deg, #4ECDC4 0%, #2ECC71 100%)'
                  : 'linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                  fontWeight: '600',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {booking.status}
                </div>
              </div>
              
              <div style={{
                display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.5rem',
              paddingLeft: '1rem'
              }}>
                <div>
                  <div style={{ 
                  color: '#A4B0BE',
                    fontSize: '0.85rem',
                  marginBottom: '0.35rem',
                  fontWeight: '500',
                  fontFamily: "'Poppins', sans-serif"
                  }}>
                  Price
                  </div>
                  <div style={{ 
                  color: '#2F3542',
                  fontWeight: '700',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <span style={{ color: '#4ECDC4' }}>$</span>
                  {booking.price || '0'}
                  </div>
                </div>
                  </div>

                  <div style={{ 
              display: 'flex',
              gap: '1rem',
              paddingLeft: '1rem'
            }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 6px 16px rgba(100, 210, 255, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/edit-booking/${booking.id}`)}
                style={{ 
                  flex: 1,
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px rgba(78, 205, 196, 0.3)',
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>✏️</span>
                Edit
              </motion.button>

              {booking.status !== 'CANCELLED' && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onCancelBooking(booking.id)}
                  style={{ 
                    flex: 1,
                    background: 'transparent',
                    color: '#FF6B6B',
                    border: '2px solid #FF6B6B',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span></span>
                  Cancel
                </motion.button>
              )}
                  </div>
          </motion.div>
        ))}
                </div>
    </div>
  );
}

function DashboardTab({ colors, stats, bookings, onCreateBooking, onCancelBooking }) {
  const navigate = useNavigate();
  return (
    <div>
      <Stats stats={stats} colors={colors} />
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {dashboardData.upcomingBookings && dashboardData.upcomingBookings.map((booking) => (
          <motion.div
            key={booking.id}
            whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(255, 107, 107, 0.15)' }}
            style={{ 
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
              border: '1px solid rgba(242, 243, 247, 0.8)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Decorative accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '6px',
              height: '100%',
              background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
            }}></div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
              paddingLeft: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem'
                }}>
                  📅
                </div>
                <div>
                  <div style={{ 
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    color: '#2F3542',
                    fontFamily: "'Poppins', sans-serif",
                    marginBottom: '0.25rem'
                  }}>
                    {booking.spaceName}
                  </div>
                  <div style={{ 
                    color: '#A4B0BE',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    {formatDateTime(booking.start_time)}
                  </div>
                </div>
              </div>
              <div style={{
                background: booking.status === 'PENDING' 
                  ? 'linear-gradient(135deg, #FFD166 0%, #F9A826 100%)'
                  : booking.status === 'CONFIRMED'
                  ? 'linear-gradient(135deg, #4ECDC4 0%, #2ECC71 100%)'
                  : 'linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {booking.status}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              marginBottom: '1.5rem',
              paddingLeft: '1rem'
            }}>
              <div>
                <div style={{
                  color: '#A4B0BE',
                  fontSize: '0.85rem',
                  marginBottom: '0.35rem',
                  fontWeight: '500',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  Start Time
                </div>
                <div style={{
                  color: '#2F3542',
                  fontWeight: '600',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem'
                }}>
                  {formatDateTime(booking.start_time)}
                </div>
              </div>
              <div>
                <div style={{
                  color: '#A4B0BE',
                  fontSize: '0.85rem',
                  marginBottom: '0.35rem',
                  fontWeight: '500',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  End Time
                </div>
                <div style={{
                  color: '#2F3542',
                  fontWeight: '600',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem'
                }}>
                  {formatDateTime(booking.end_time)}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              paddingLeft: '1rem'
            }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 6px 16px rgba(100, 210, 255, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/edit-booking/${booking.id}`)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px rgba(78, 205, 196, 0.3)',
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span></span>
                Edit
              </motion.button>

              {booking.status !== 'CANCELLED' && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onCancelBooking(booking.id)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    color: '#FF6B6B',
                    border: '2px solid #FF6B6B',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span></span>
                  Cancel
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
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

// Helper function for status colors
const getStatusColor = (status) => {
  switch(status?.toLowerCase()) {
    case 'confirmed':
      return '#4ECDC4';
    case 'pending':
      return '#FFD166';
    case 'cancelled':
      return '#FF6B6B';
    default:
      return '#A4B0BE';
  }
};

function UserDashboard() {
  const navigate = useNavigate();
  // Load the current user's info from localStorage using currentUserId
  const currentUserId = localStorage.getItem('currentUserId');
  const user = useMemo(() => {
    if (currentUserId) {
      return JSON.parse(localStorage.getItem(`user_${currentUserId}`)) || {};
    }
    return {};
  }, [currentUserId]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    upcomingBookings: [],
    communityPosts: []
  });
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modern green accent palette with enhanced colors
  const colors = {
    primary: '#10b981',      // Bold green
    primaryDark: '#059669',  // Darker green
    primaryLight: '#6ee7b7', // Light green
    secondary: '#3b82f6',    // Blue for secondary actions
    accent: '#f59e0b',       // Orange for accents
    orange: '#f97316',       // A vibrant orange
    text: '#1e293b',         // Slate
    textSecondary: '#64748b', // Lighter text
    lightText: '#f8fafc',    // Light
    background: '#ffffff',   // White background
    card: '#ffffff',         // Card background
    border: '#e5e7eb',       // Light border
    glass: 'rgba(255, 255, 255, 0.95)', // More opaque glass
    glassBorder: 'rgba(255, 255, 255, 0.3)', // Glass effect border
    shadow: '0 4px 20px rgba(16, 185, 129, 0.08)',
    status: {
      pending: { background: '#fffbeb', color: '#f59e0b' },
      confirmed: { background: '#ecfdf5', color: '#10b981' },
      cancelled: { background: '#f8fafc', color: '#64748b' },
    },
  };

  const getStatusStyle = (status) => {
    const style = colors.status[status?.toLowerCase()] || colors.status.cancelled;
    return {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'capitalize',
      background: style.background,
      color: style.color,
    };
  };

  const fetchDashboardData = useCallback(async () => {
    if (!user || !user.id) return;
    setLoading(true);
    try {
      // Ensure user.id is treated as a number
      const userId = parseInt(user.id);
      if (isNaN(userId)) {
        console.error('Invalid user ID:', user.id);
        return;
      }

      console.log('Fetching data for user:', userId);

      // First fetch reservations
      const reservationsRes = await fetch(`/api/reservations?userId=${userId}`);
      if (!reservationsRes.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const reservations = await reservationsRes.json();
      console.log('Raw reservations:', reservations);

      // Then fetch spaces
      const spacesRes = await fetch('/api/spaces');
      if (!spacesRes.ok) {
        throw new Error('Failed to fetch spaces');
      }
      const spaces = await spacesRes.json();

      // Map reservations to match your database fields
      const processedReservations = reservations.map(reservation => ({
        id: reservation.id,
        date: reservation.date,
        pack_id: reservation.packId,
        status: reservation.status || 'pending',
        user_id: reservation.userId,
        end_time: reservation.endTime,
        payment_status: reservation.paymentStatus,
        space_id: reservation.spaceId,
        special_requests: reservation.specialRequests,
        start_time: reservation.startTime,
        // Add space name from spaces data
        spaceName: spaces.find(space => space.id === reservation.spaceId)?.name || 'Unknown Space'
      }));

      console.log('Processed reservations:', processedReservations);

      // Update dashboard data
      setDashboardData(prevData => ({
        ...prevData,
        upcomingBookings: processedReservations
      }));

      // Fetch community posts from activities (type 1)
      const communityPostsRes = await fetch('/api/activities/type/1');
      if (communityPostsRes.ok) {
        const communityPostsData = await communityPostsRes.json();
        let usersMap = {};
        if (communityPostsData && communityPostsData.length > 0) {
          const userIds = [...new Set(communityPostsData.map(a => a.userId).filter(id => id != null))];
          if (userIds.length > 0) {
            const userPromises = userIds.map(id => 
              fetch(`/api/users/${id}`).then(res => res.ok ? res.json() : null)
            );
            const usersData = await Promise.all(userPromises);
            usersMap = usersData.filter(user => user != null).reduce((acc, user) => {
              acc[user.id] = user.name;
              return acc;
            }, {});
          }
        }

        // Show all posts from all users, sorted by most recent
        const communityPosts = communityPostsData.map(post => ({
          id: post.id,
          authorId: post.userId,
          authorName: usersMap[post.userId] || 'Unknown User',
          content: post.description,
          timestamp: post.createdAt ? new Date(post.createdAt).toLocaleString() : '',
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setDashboardData(prevData => ({
          ...prevData,
          communityPosts: communityPosts
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Call fetchDashboardData when component mounts or user changes
  useEffect(() => {
    if (!user || !user.id) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, navigate, fetchDashboardData]);

  useEffect(() => {
    fetch('/api/spaces')
      .then(res => res.json())
      .then(data => setSpaces(data));
  }, []);

  useEffect(() => {
    const originalBg = document.body.style.background;
    document.body.style.background = `linear-gradient(rgba(30,34,44,0.20), rgba(30,34,44,0.20)), url('https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y293b3JraW5nJTIwc3BhY2V8ZW58MHx8MHx8fDA%3D')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    return () => {
      document.body.style.background = originalBg;
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);

  const getSpaceName = (id) => {
    const space = spaces.find(s => s.id === Number(id));
    return space ? space.name : id;
  };

  // Navigation items with icons
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'My Bookings', icon: '📅' },
    { id: 'community', label: 'Community', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  // Get current date with fancy formatting
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });

  const handleCreateBooking = () => {
    navigate('/book-space');
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/reservations/${bookingId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      await fetchDashboardData();
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleCreatePost = async (content) => {
    if (!content.trim() || !user) return;

    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: 'New Community Post',
          description: content,
          userId: user.id,
          activityTypeId: 1, // 1 = community post
          status: 'active'
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Backend error:', errorData);
        throw new Error('Failed to create post.');
      }

      await fetchDashboardData();

    } catch (error) {
      console.error('Error in handleCreatePost:', error);
    }
  };

  const handleLogout = () => {
    // Do NOT remove user info on logout
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primaryLight}20 100%)`,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '16px',
            border: `1px solid rgba(255, 255, 255, 0.3)`,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: `4px solid ${colors.primaryLight}`,
            
            borderTopColor: colors.primary,
            animation: 'spin 1s linear infinite'
          }} />
        </motion.div>
      </motion.div>
    );
  }

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
        boxShadow: '4px 0 20px rgba(16, 185, 129, 0.04)',
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
          onClick={() => setActiveTab('profile')}
        >
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=${colors.primary.replace('#', '')}&color=fff`} 
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
                boxShadow: '0 4px 12px rgba(16,185,129,0.15)',
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
                      boxShadow: '0 8px 24px 0 rgba(255,167,81,0.10)',
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
    background: 'radial-gradient(circle at 70% 30%, rgba(255,228,132,0.15) 0%, rgba(255,228,132,0) 50%)',
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
      background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)',
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
      Hey <span style={{ 
        color: 'inherit',
        background: 'linear-gradient(90deg, #4ECDC4 0%, #FF6B6B 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text'
      }}>{user.name ? user.name.split(' ')[0] : 'User'}</span>!
                  </div>
                  
    {/* Tagline - Vibrant and energetic */}
    <div style={{
      fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
      color: '#2F3542',
      margin: '0rem 0rem 0rem 0rem',
      padding: '0.9rem 0rem 0rem 0rem',
      fontWeight: 500,
      maxWidth: '90%',
      lineHeight: 1.5,
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(90deg, #2F3542 0%, #57606F 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }}>
      Where <span style={{ fontWeight: 700 }}>ambition</span> meets its perfect workspace<br/>
      and <span style={{ fontWeight: 700 }}>productivity</span> finds its rhythm
                    </div>
                  
    {/* Book button - Eye-catching CTA */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
      gap: '1.5rem',
      marginTop: '1.5rem',
      flexWrap: 'wrap'
    }}>
      <button
                        style={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                          color: 'white',
                          border: 'none',
          padding: '1rem 2.2rem',
                          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(255, 107, 107, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 107, 107, 0.3)';
        }}
        onClick={() => navigate('/book-space')}
      >
        <span style={{ position: 'relative', zIndex: 2 }}>
          
          Book Your Space
        </span>
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.6s ease'
        }}></span>
      </button>
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

                  {/* Stats section (optional, keep as is) */}
                  {typeof stats !== 'undefined' && stats.length > 0 && (
                    <div style={{ marginBottom: '2.5rem' }}>
                      <Stats stats={stats} colors={colors} />
                    </div>
                  )}

                  {/* Bookings & Community Cards Row */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '2rem',
                      marginTop: '1rem',
                    }}
                  >
                    {/* Vibrant Bookings Card */}
<div style={{
  flex: '1 1 350px',
  minWidth: '320px',
  background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
  border: '1px solid rgba(242, 243, 247, 0.8)',
  padding: '2rem',
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
  }}></div>

  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.75rem',
    paddingLeft: '0.5rem'
  }}>
    <h3 style={{
      color: '#2F3542',
      fontSize: '1.6rem',
      fontWeight: '800',
      margin: 0,
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: '-0.5px',
      background: 'linear-gradient(90deg, #2F3542 0%, #57606F 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }}>
      Upcoming Bookings
    </h3>
                    </div>
                    
                    {dashboardData.upcomingBookings && dashboardData.upcomingBookings.length > 0 ? (
                      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.75rem',
                      }}>
                        {dashboardData.upcomingBookings.map((booking) => (
                          <motion.div 
                            key={booking.id} 
          whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(255, 107, 107, 0.15)' }}
                            style={{ 
            background: 'white',
            borderRadius: '18px',
            boxShadow: '0 4px 16px 0 rgba(60,72,88,0.08)',
            border: '1px solid rgba(242, 243, 247, 0.8)',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            position: 'relative',
                                overflow: 'hidden'
                            }}
                          >
                            <div style={{ 
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
            marginBottom: '1rem',
                            }}>
                              <div>
                                <div style={{ 
                fontWeight: '700',
                fontSize: '1.2rem',
                color: '#2F3542',
                fontFamily: "'Poppins', sans-serif",
                marginBottom: '0.25rem'
                                }}>
                                  {booking.spaceName}
                                </div>
                                <div style={{ 
                color: '#A4B0BE',
                fontSize: '0.95rem',
                fontWeight: '500',
                fontFamily: "'Poppins', sans-serif",
                                }}>
                                  {booking.roomType}
                                </div>
                               
                                
                              </div>
            <div style={{
              ...getStatusStyle(booking.status),
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '600',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.85rem'
            }}>
                                {booking.status}
                              </div>
                            </div>
                            
                            <div style={{ 
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
            marginBottom: '1.25rem',
                            }}>
                              <div>
                                <div style={{ 
                color: '#A4B0BE',
                                  fontSize: '0.85rem',
                marginBottom: '0.35rem',
                fontWeight: '500',
                fontFamily: "'Poppins', sans-serif",
                                }}>
                                  Date & Time
                                </div>
                                <div style={{ 
                color: '#2F3542',
                fontWeight: '600',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem'
                                }}>
                                  {formatDateTime(booking.start_time)}
                                </div>
                              </div>
                              <div>
                                  
                                  
                              </div>
                            </div>
                            
                            <div style={{ 
                              display: 'flex',
            gap: '1rem',
                            }}>
                              <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 6px 16px rgba(100, 210, 255, 0.3)' }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate(`/edit-booking/${booking.id}`)}
                                style={{ 
                                  flex: 1,
                background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                                  color: 'white', 
                                  border: 'none', 
                borderRadius: '14px',
                padding: '0.85rem',
                fontWeight: '700',
                                  cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 4px 14px rgba(78, 205, 196, 0.3)',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: '0.5px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Edit Booking</span>
                              </motion.button>

                              {booking.status.toLowerCase() !== 'cancelled' && (
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleCancelBooking(booking.id)}
                                  style={{ 
                                    flex: 1,
                                    background: 'transparent', 
                  color: '#FF6B6B',
                                      border: '2px solid #FF6B6B',
                  borderRadius: '14px',
                  padding: '0.85rem',
                  fontWeight: '700',
                                    cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s ease'
                                  }}
                                >
                                  Cancel
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        padding: '2.5rem 2rem',
                        textAlign: 'center',
        background: 'rgba(248, 250, 252, 0.7)',
        borderRadius: '18px',
        border: '2px dashed rgba(209, 213, 219, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
                          fontSize: '3rem',
          marginBottom: '1.25rem',
          opacity: 0.8,
        }}
      >
        📅
      </motion.div>
      <h4
        style={{
          fontSize: '1.3rem',
          fontWeight: '700',
          color: '#2F3542',
          marginBottom: '0.75rem',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
                          No upcoming bookings
                        </h4>
      <p
        style={{
          color: '#A4B0BE',
          marginBottom: '1.75rem',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '1rem'
        }}
      >
        Ready to book your perfect workspace?
                        </p>
                        <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCreateBooking}
                          style={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                            color: 'white',
                            border: 'none',
          borderRadius: '14px',
          padding: '1rem 2rem',
          fontWeight: '700',
                            cursor: 'pointer',
          fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 16px rgba(255, 107, 107, 0.3)',
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '0.5px'
        }}
      >
        <span>➕</span> Book a Space Now
                        </motion.button>
    </motion.div>
                    )}
                  </div>

                    {/* Vibrant Community Card */}
                    <div style={{
                        flex: '1 1 350px',
                        minWidth: '320px',
                      background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
                      borderRadius: '24px',
                      boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
                      border: '1px solid rgba(242, 243, 247, 0.8)',
                        padding: '2rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                        background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
                      }}></div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.75rem',
                        paddingLeft: '0.5rem'
                      }}>
                        <h3 style={{
                          color: '#2F3542',
                          fontSize: '1.6rem',
                          fontWeight: '800',
                          margin: 0,
                          fontFamily: "'Poppins', sans-serif",
                          letterSpacing: '-0.5px',
                          background: 'linear-gradient(90deg, #2F3542 0%, #57606F 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}>
                          Community Feed
                        </h3>
                      </div>

                    {dashboardData.communityPosts && dashboardData.communityPosts.length > 0 ? (
                      dashboardData.communityPosts.slice(0, 3).map((post) => (
                          <motion.div
                            key={post.id}
                            whileHover={{ y: -5 }}
                            style={{
                              marginBottom: '1.5rem',
                              padding: '1.25rem',
                              background: 'white',
                              borderRadius: '16px',
                              border: '1px solid rgba(242, 243, 247, 0.8)',
                              boxShadow: '0 4px 16px rgba(60, 72, 88, 0.05)'
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem',
                              marginBottom: '1rem'
                            }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                fontFamily: "'Poppins', sans-serif"
                              }}>
                                {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}
                        </div>
                              <div>
                                <div style={{
                                  fontWeight: '700',
                                  fontSize: '1rem',
                                  color: '#2F3542',
                                  fontFamily: "'Poppins', sans-serif"
                                }}>
                                  {post.authorName}
                                </div>
                                <div style={{
                                  fontSize: '0.85rem',
                                  color: '#A4B0BE',
                                  fontFamily: "'Poppins', sans-serif"
                                }}>
                                  {post.timestamp}
                                </div>
                              </div>
                            </div>
                            <div style={{
                              color: '#2F3542',
                              fontSize: '0.95rem',
                              lineHeight: '1.5',
                              fontFamily: "'Poppins', sans-serif"
                            }}>
                              {post.content}
                            </div>
                          </motion.div>
                      ))
                    ) : (
                        <div style={{
                          textAlign: 'center',
                          padding: '2rem',
                          color: '#A4B0BE',
                          fontFamily: "'Poppins', sans-serif"
                        }}>
                          No community posts yet.
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 6px 16px rgba(100, 210, 255, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab('community')}
                        style={{
                          marginTop: 'auto',
                          background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '14px',
                          padding: '0.85rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          boxShadow: '0 4px 14px rgba(78, 205, 196, 0.3)',
                          fontFamily: "'Poppins', sans-serif",
                          letterSpacing: '0.5px'
                        }}
                      >
                        View All Posts
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
                  <div style={{ 
                    background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
                    border: '1px solid rgba(242, 243, 247, 0.8)',
                    padding: '2rem',
                    marginBottom: '2.5rem',
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
                      background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
                    }}></div>

                    <h2 style={{ 
                      fontSize: '2rem',
                      fontWeight: '800',
                      margin: 0,
                      paddingLeft: '1rem',
                      fontFamily: "'Poppins', sans-serif",
                      background: 'linear-gradient(90deg, #2F3542 0%, #57606F 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      letterSpacing: '-0.5px'
                    }}>
                      All My Bookings
                    </h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {dashboardData.upcomingBookings && dashboardData.upcomingBookings.length > 0 ? (
                    dashboardData.upcomingBookings.map((booking) => (
                        <motion.div
                          key={booking.id}
                          whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(255, 107, 107, 0.15)' }}
                          style={{ 
                            background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
                            borderRadius: '24px',
                            boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
                            border: '1px solid rgba(242, 243, 247, 0.8)',
                            padding: '2rem',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          {/* Decorative accent */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '6px',
                            height: '100%',
                            background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
                          }}></div>

                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1.5rem',
                            paddingLeft: '1rem'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}>
                              <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.5rem'
                              }}>
                                📅
                        </div>
                              <div>
                                <div style={{ 
                                  fontWeight: '700',
                                  fontSize: '1.2rem',
                                  color: '#2F3542',
                                  fontFamily: "'Poppins', sans-serif",
                                  marginBottom: '0.25rem'
                                }}>
                                  {booking.spaceName}
                                </div>
                                <div style={{ 
                                  color: '#A4B0BE',
                                  fontSize: '0.95rem',
                                  fontWeight: '500',
                                  fontFamily: "'Poppins', sans-serif"
                                }}>
                                  {booking.roomType}
                                </div>
                              </div>
                            </div>
                            <div style={{
                              background: booking.status === 'PENDING' 
                                ? 'linear-gradient(135deg, #FFD166 0%, #F9A826 100%)'
                                : booking.status === 'CONFIRMED'
                                ? 'linear-gradient(135deg, #4ECDC4 0%, #2ECC71 100%)'
                                : 'linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              fontFamily: "'Poppins', sans-serif",
                              letterSpacing: '0.5px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}>
                              {booking.status}
                            </div>
                          </div>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.5rem',
                            marginBottom: '1.5rem',
                            paddingLeft: '1rem'
                          }}>
                            <div>
                              <div style={{
                                color: '#A4B0BE',
                                fontSize: '0.85rem',
                                marginBottom: '0.35rem',
                                fontWeight: '500',
                                fontFamily: "'Poppins', sans-serif"
                              }}>
                                Start Time
                              </div>
                              <div style={{
                                color: '#2F3542',
                                fontWeight: '600',
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: '1rem'
                              }}>
                                {formatDateTime(booking.start_time)}
                              </div>
                            </div>
                            <div>
                              <div style={{
                                color: '#A4B0BE',
                                fontSize: '0.85rem',
                                marginBottom: '0.35rem',
                                fontWeight: '500',
                                fontFamily: "'Poppins', sans-serif"
                              }}>
                                End Time
                              </div>
                              <div style={{
                                color: '#2F3542',
                                fontWeight: '600',
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: '1rem'
                              }}>
                                {formatDateTime(booking.end_time)}
                              </div>
                            </div>
                          </div>

                          <div style={{
                            display: 'flex',
                            gap: '1rem',
                            paddingLeft: '1rem'
                          }}>
                            <motion.button
                              whileHover={{ scale: 1.03, boxShadow: '0 6px 16px rgba(100, 210, 255, 0.3)' }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => navigate(`/edit-booking/${booking.id}`)}
                              style={{
                                flex: 1,
                                background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                padding: '0.85rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                boxShadow: '0 4px 14px rgba(78, 205, 196, 0.3)',
                                fontFamily: "'Poppins', sans-serif",
                                letterSpacing: '0.5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                              }}
                            >
                              <span></span>
                              Edit
                            </motion.button>

                            {booking.status !== 'cancelled' && (
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleCancelBooking(booking.id)}
                                style={{
                                  flex: 1,
                                  background: 'transparent',
                                  color: '#FF6B6B',
                                  border: '2px solid #FF6B6B',
                                  borderRadius: '14px',
                                  padding: '0.85rem',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                  fontSize: '1rem',
                                  fontFamily: "'Poppins', sans-serif",
                                  letterSpacing: '0.5px',
                                  transition: 'all 0.2s ease',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.5rem'
                                }}
                              >
                                <span></span>
                                Cancel
                              </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          padding: '2.5rem 2rem',
                          textAlign: 'center',
                          background: 'rgba(248, 250, 252, 0.7)',
                          borderRadius: '18px',
                          border: '2px dashed rgba(209, 213, 219, 0.5)',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            fontSize: '3rem',
                            marginBottom: '1.25rem',
                            opacity: 0.8,
                          }}
                        >
                          📅
                        </motion.div>
                        <h4
                          style={{
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            color: '#2F3542',
                            marginBottom: '0.75rem',
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          No bookings yet
                        </h4>
                        <p
                          style={{
                            color: '#A4B0BE',
                            marginBottom: '1.75rem',
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '1rem'
                          }}
                        >
                          Ready to book your perfect workspace?
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Community Tab */}
              {activeTab === 'community' && (
                <CommunityTab 
                  colors={colors}
                  posts={dashboardData.communityPosts}
                  onCreatePost={handleCreatePost}
                  isLoading={loading}
                />
              )}
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <ProfileTab 
                  colors={colors}
                  user={user}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SpacesTab({ colors, spaces, onBookNow }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        width: '100%'
      }}
    >
      <motion.h2 
        style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          background: 'none',
          WebkitBackgroundClip: 'initial',
          WebkitTextFillColor: 'initial'
        }}
      >
        Available Spaces
      </motion.h2>

      {spaces && Object.keys(spaces).length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {Object.entries(spaces).map(([type, availability], index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              style={{
                background: colors.glass,
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: `1px solid ${colors.glassBorder}`,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
              }}
            >
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.8rem'
                }}>
                  {type === 'Office' ? '🏢' : 
                   type === 'Desk' ? '💻' : '🛋️'}
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    margin: 0,
                    color: colors.primaryDark
                  }}>
                    {type} Spaces
                  </h3>
                  <p style={{ 
                    margin: 0,
                    fontSize: '0.9rem',
                    color: colors.text,
                    opacity: 0.8
                  }}>
                    {availability.total} total spaces
                  </p>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '0.8rem',
                    color: colors.text,
                    opacity: 0.7
                  }}>
                    Currently Available
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: availability.available > 0 ? colors.primaryDark : colors.accent
                  }}>
                    {availability.available}
                  </div>
                </div>
                
                <div style={{
                  padding: '0.5rem 1rem',
                  background: availability.available > 0 ? `${colors.primary}15` : `${colors.accent}15`,
                  borderRadius: '12px',
                  color: availability.available > 0 ? colors.primaryDark : colors.accent,
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  {availability.available > 0 ? 'Available' : 'Fully Booked'}
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={availability.available <= 0}
                onClick={() => availability.available > 0 && onBookNow()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: availability.available > 0 
                    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
                    : '#e2e8f0',
                  color: availability.available > 0 ? 'white' : colors.text,
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: availability.available > 0 ? 'pointer' : 'not-allowed',
                  opacity: availability.available > 0 ? 1 : 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>📅</span> {availability.available > 0 ? 'Book Now' : 'Check Back Later'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            background: colors.glass,
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: `1px dashed ${colors.primaryLight}`,
            marginTop: '2rem'
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏢</div>
          <h3 style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            color: colors.primaryDark
          }}>
            No spaces available
          </h3>
          <p style={{ 
            color: colors.text,
            opacity: 0.7,
            marginBottom: '2rem',
            fontSize: '1.1rem',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            All spaces are currently booked. Please check back later for availability.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function CommunityTab({ colors, posts: initialPosts, onCreatePost, isLoading }) {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await fetch(`/api/community-posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments = await response.json();
      setPosts(currentPosts => 
        currentPosts.map(p => 
          p.id === postId ? { ...p, comments: comments } : p
        )
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '2rem auto',
      padding: '0 2rem'
    }}>
      {/* Header Section */}
      <div style={{ 
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
        border: '1px solid rgba(242, 243, 247, 0.8)',
        padding: '2rem',
        marginBottom: '2.5rem',
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
          background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
        }}></div>

        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '800',
          margin: 0,
          paddingLeft: '1rem',
          fontFamily: "'Poppins', sans-serif",
          background: 'linear-gradient(90deg, #2F3542 0%, #57606F 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          Community Feed
        </h2>
      </div>

      {/* Create Post Section */}
      <div style={{
        background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
        border: '1px solid rgba(242, 243, 247, 0.8)',
          padding: '2rem',
        marginBottom: '2.5rem',
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
          background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
        }}></div>
        
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Share your thoughts with the community..."
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid rgba(242, 243, 247, 0.8)',
            background: 'white',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1rem',
            resize: 'vertical',
            marginBottom: '1.5rem',
            color: '#2F3542',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem'
        }}>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 6px 16px rgba(100, 210, 255, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (newPostContent.trim()) {
                onCreatePost(newPostContent);
                setNewPostContent('');
              }
            }}
            disabled={!newPostContent.trim()}
            style={{
              background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              padding: '1rem 2rem',
              fontWeight: '700',
              cursor: newPostContent.trim() ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              opacity: newPostContent.trim() ? 1 : 0.7,
              boxShadow: '0 4px 14px rgba(78, 205, 196, 0.3)',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <span>✨</span> Share Post
          </motion.button>
        </div>
      </div>
      
      {/* Posts List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
      {isLoading ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#A4B0BE',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '1.1rem'
          }}>
            Loading posts...
        </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
        <motion.div
              key={post.id}
              whileHover={{ y: -5 }}
          style={{
                background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFF 100%)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.12)',
                border: '1px solid rgba(242, 243, 247, 0.8)',
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
                background: 'linear-gradient(to bottom, #FF6B6B 0%, #4ECDC4 100%)'
              }}></div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                marginBottom: '1.5rem',
                paddingLeft: '1rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4ECDC4 0%, #6A4C93 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  fontFamily: "'Poppins', sans-serif",
                  boxShadow: '0 4px 14px rgba(78, 205, 196, 0.3)'
                }}>
                  {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.75rem'
                  }}>
                    <h4 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      margin: 0,
                      color: '#2F3542',
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      {post.authorName || 'Unknown User'}
                    </h4>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#A4B0BE',
                      fontFamily: "'Poppins', sans-serif"
                    }}>
                      {post.timestamp}
                    </span>
                  </div>
          <p style={{ 
                    color: '#2F3542',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    margin: 0,
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    {post.content}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingLeft: '1rem',
                marginTop: '1.5rem'
              }}>
          <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(78, 205, 196, 0.2)' }}
            whileTap={{ scale: 0.95 }}
                  onClick={() => fetchCommentsForPost(post.id)}
            style={{
                    background: 'transparent',
                    border: '2px solid #4ECDC4',
              borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    color: '#4ECDC4',
              fontWeight: '600',
                    fontSize: '0.95rem',
              cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
                  <span>💬</span>
                  {post.comments ? `${post.comments.length} Comments` : 'View Comments'}
          </motion.button>
              </div>
        </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'rgba(248, 250, 252, 0.7)',
              borderRadius: '24px',
              border: '2px dashed rgba(209, 213, 219, 0.5)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: '3rem',
                marginBottom: '1.25rem',
                opacity: 0.8
              }}
            >
              💭
    </motion.div>
            <h4 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#2F3542',
              marginBottom: '0.75rem',
              fontFamily: "'Poppins', sans-serif"
            }}>
              No posts yet
            </h4>
            <p style={{
              color: '#A4B0BE',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem'
            }}>
              Be the first to start a conversation!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProfileTab({ colors, user }) {
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
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editedUser)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        // Save the updated user info to localStorage (persist after logout)
        localStorage.setItem(`user_${user.id}`, JSON.stringify({
          ...user,
          ...updatedUser
        }));
        setSaveMessage('Profile updated successfully!');
        setIsEditing(false);
        window.location.reload(); // Simple refresh to update the user data
      } else {
        const errorData = await response.text();
        setSaveMessage('Failed to update profile. Please try again.');
        console.error('Update error:', errorData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage('An error occurred while updating your profile.');
    } finally {
      setIsSaving(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditedUser({
      name: user.name || '',
      email: user.email || ''
    });
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });
      if (response.ok) {
        setPasswordMessage('Password changed successfully!');
        setShowPasswordForm(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.text();
        setPasswordMessage(errorData || 'Failed to change password.');
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

  const isPasswordValid =
    currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        width: '100%'
      }}
    >
      <motion.h2 
        style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '2rem',
          background: 'none',
          WebkitBackgroundClip: 'initial',
          WebkitTextFillColor: 'initial'
        }}
      >
        Your Profile
      </motion.h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: colors.glass,
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: `1px solid ${colors.glassBorder}`,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
          }}
        >
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
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
              {editedUser.name ? editedUser.name.charAt(0).toUpperCase() : 'U'}
            </motion.div>
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '0.5rem 0',
              color: colors.primaryDark
            }}>
              {editedUser.name || 'User'}
            </h3>
            <p style={{ 
              color: colors.text,
              opacity: 0.8,
              margin: 0
            }}>
              {editedUser.email}
            </p>
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
                    ? '#e2e8f0' 
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
                disabled={isSaving}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'transparent',
                  border: `1px solid ${colors.primaryLight}`,
                  borderRadius: '12px',
                  color: colors.primaryDark,
                  fontWeight: '600',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                Cancel
              </motion.button>
            </div>
          )}
          
          {saveMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                background: saveMessage.includes('successfully') 
                  ? `${colors.primary}15` 
                  : `${colors.accent}15`,
                color: saveMessage.includes('successfully') 
                  ? colors.primaryDark 
                  : colors.accent,
                border: `1px solid ${saveMessage.includes('successfully') 
                  ? colors.primaryLight 
                  : colors.accent}`
              }}
            >
              {saveMessage}
            </motion.div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'transparent',
              border: `1px solid ${colors.primaryLight}`,
              borderRadius: '12px',
              color: colors.primaryDark,
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem'
            }}
            onClick={() => setShowPasswordForm(v => !v)}
            disabled={showPasswordForm}
          >
            Change Password
          </motion.button>
          {showPasswordForm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '1.5rem',
                background: colors.glass,
                borderRadius: '16px',
                padding: '2rem',
                border: `1px solid ${colors.glassBorder}`,
                boxShadow: '0 4px 16px rgba(31,38,135,0.08)'
              }}
            >
              <h4 style={{ margin: '0 0 1.5rem 0', color: colors.primaryDark }}>Change Password</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${colors.primaryLight}`,
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${colors.primaryLight}`,
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: `1.5px solid ${colors.primaryLight}`,
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <div style={{ color: colors.accent, marginTop: '0.5rem', fontSize: '0.95rem' }}>
                  New passwords do not match.
                </div>
              )}
              {passwordMessage && (
                <div style={{
                  marginTop: '1rem',
                  color: passwordMessage.includes('success') ? colors.primaryDark : colors.accent,
                  fontWeight: '500',
                  fontSize: '0.98rem'
                }}>
                  {passwordMessage}
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePasswordChange}
                  disabled={!isPasswordValid || isPasswordSaving}
                  style={{
                    flex: 1,
                    padding: '0.9rem',
                    background: isPasswordValid && !isPasswordSaving ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)` : '#e2e8f0',
                    color: isPasswordValid && !isPasswordSaving ? 'white' : colors.text,
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: '600',
                    cursor: isPasswordValid && !isPasswordSaving ? 'pointer' : 'not-allowed',
                    fontSize: '1rem'
                  }}
                >
                  {isPasswordSaving ? 'Saving...' : 'Save Password'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelPassword}
                  disabled={isPasswordSaving}
                  style={{
                    flex: 1,
                    padding: '0.9rem',
                    background: 'transparent',
                    border: `1.5px solid ${colors.primaryLight}`,
                    borderRadius: '10px',
                    color: colors.primaryDark,
                    fontWeight: '600',
                    cursor: isPasswordSaving ? 'not-allowed' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: colors.glass,
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: `1px solid ${colors.glassBorder}`,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
          }}
        >
          <h3 style={{ 
            fontSize: '1.5rem',
            fontWeight: '600',
            marginTop: 0,
            marginBottom: '1.5rem',
            color: colors.primaryDark
          }}>
            Account Details
          </h3>
          
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '0.9rem',
                color: colors.text,
                opacity: 0.8,
                marginBottom: '0.5rem'
              }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '10px',
                    border: `2px solid ${colors.primaryLight}`,
                    fontWeight: '500',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="Enter your full name"
                />
              ) : (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '10px',
                  border: `1px solid ${colors.primaryLight}`,
                  fontWeight: '500'
                }}>
                  {editedUser.name || 'Not specified'}
                </div>
              )}
            </div>
            
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '0.9rem',
                color: colors.text,
                opacity: 0.8,
                marginBottom: '0.5rem'
              }}>
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '10px',
                    border: `2px solid ${colors.primaryLight}`,
                    fontWeight: '500',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="Enter your email address"
                />
              ) : (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '10px',
                  border: `1px solid ${colors.primaryLight}`,
                  fontWeight: '500'
                }}>
                  {editedUser.email}
                </div>
              )}
            </div>
            

            
            <div>
              <label style={{ 
                display: 'block',
                fontSize: '0.9rem',
                color: colors.text,
                opacity: 0.8,
                marginBottom: '0.5rem'
              }}>
                Member Since
              </label>
              <div style={{
                padding: '0.75rem 1rem',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '10px',
                border: `1px solid ${colors.primaryLight}`,
                fontWeight: '500'
              }}>
                {user.joinDate || 'Unknown'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function PostCard({ post, colors, onToggleComments }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleToggleComments = () => {
    if (!showComments && !post.comments) {
      onToggleComments && onToggleComments(post.id);
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/community-posts/${post.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: newComment,
          userId: JSON.parse(localStorage.getItem('user')).id
        })
      });

      if (response.ok) {
        setNewComment('');
        // Refresh comments
        onToggleComments && onToggleComments(post.id);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: colors.glass,
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        border: `1px solid ${colors.glassBorder}`,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      }}
    >
      <div style={{ 
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem',
              fontWeight: '600',
              margin: 0,
              color: colors.primaryDark
            }}>
              {post.authorName || 'Unknown User'}
            </h4>
            <span style={{ 
              fontSize: '0.8rem',
              color: colors.text,
              opacity: 0.7
            }}>
              {post.timestamp}
            </span>
          </div>
          <p style={{ 
            color: colors.text,
            lineHeight: '1.6',
            margin: 0
          }}>
            {post.content}
          </p>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        borderTop: `1px solid ${colors.primaryLight}`,
        paddingTop: '1rem'
      }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleComments}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'transparent',
            border: 'none',
            color: colors.primaryDark,
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          <span>💬</span>
          {post.comments ? `${post.comments.length} comments` : 'View comments'}
        </motion.button>
      </div>
      
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: `1px solid ${colors.primaryLight}`
          }}
        >
          {/* Add comment form */}
          <div style={{ marginBottom: '1rem' }}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{
                width: '100%',
                minHeight: '60px',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${colors.primaryLight}`,
                background: 'rgba(255,255,255,0.7)',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '0.5rem'
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                style={{
                  padding: '0.5rem 1rem',
                  background: newComment.trim() 
                    ? colors.primary 
                    : '#e2e8f0',
                  color: newComment.trim() ? 'white' : colors.text,
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '0.9rem'
                }}
              >
                Comment
              </motion.button>
            </div>
          </div>
          
          {/* Comments list */}
          {post.comments && post.comments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {post.comments.map((comment, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '12px',
                  border: `1px solid ${colors.primaryLight}`
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: colors.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.8rem'
                    }}>
                      {comment.authorName ? comment.authorName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span style={{ 
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: colors.primaryDark
                    }}>
                      {comment.authorName || 'Unknown User'}
                    </span>
                    <span style={{ 
                      fontSize: '0.8rem',
                      color: colors.text,
                      opacity: 0.7
                    }}>
                      {comment.timestamp}
                    </span>
                  </div>
                  <p style={{ 
                    color: colors.text,
                    margin: 0,
                    fontSize: '0.9rem'
                  }}>
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center',
              color: colors.text,
              opacity: 0.7,
              fontSize: '0.9rem'
            }}>
              No comments yet. Be the first to comment!
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default UserDashboard;