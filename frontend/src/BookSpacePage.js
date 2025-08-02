import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRegBuilding, FaRegCalendarAlt, FaRegCommentDots, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Define styles to be used in the component for a cleaner look
const newPalette = {
  primary: '#10B981', // Emerald 500
  primaryHover: '#059669', // Emerald 600
  secondary: '#F97316', // Orange 500
  gradient: 'linear-gradient(135deg, #34D399, #059669)', // Emerald 400 to 600
  accent: '#F97316', // Orange 500
  text: '#1F2937', // Gray 800
  textLight: '#6B7280', // Gray 500
  background: '#F9FAFB', // Gray 50
  containerBg: 'rgba(255, 255, 255, 0.9)',
  success: '#10B981', // Green 500
  error: '#EF4444', // Red 500
  icon1: '#3B82F6', // Blue 500
  icon2: '#F97316', // Orange 500
  icon3: '#10B981', // Emerald 500
  icon4: '#F59E0B', // Orange 500
  icon5: '#34C759', // Green 500
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  container: {
    maxWidth: 600,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: newPalette.text,
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: newPalette.textLight,
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.3s',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: newPalette.text,
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    borderRadius: '12px',
    border: '1px solid #ddd',
    background: newPalette.containerBg,
    fontSize: '1rem',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
  },
  inputIcon: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    // Color will be applied inline
    pointerEvents: 'none',
  },
  button: {
    width: '100%',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    background: newPalette.gradient,
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '1rem',
  },
  statusMessage: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontWeight: '600',
    padding: '0.75rem',
    borderRadius: '12px',
  },
};

export default function BookSpacePage() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ spaceId: '', startTime: '', endTime: '', specialRequests: '', pack: '' });
  const [bookingStatus, setBookingStatus] = useState(null);
  const currentUserId = localStorage.getItem('currentUserId');
const user = currentUserId
  ? JSON.parse(localStorage.getItem(`user_${currentUserId}`)) || {}
  : {};
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/spaces')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to load spaces'))
      .then(setSpaces)
      .catch(err => setError(err.toString()))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (bookingStatus === 'success') {
      const timer = setTimeout(() => navigate('/user/dashboard'), 2000);
      return () => clearTimeout(timer);
    }
  }, [bookingStatus, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setBookingStatus(null);
    const payload = { 
      ...form, 
      userId: user.id, 
      startTime: new Date(form.startTime).toISOString(), 
      endTime: new Date(form.endTime).toISOString(),
      pack: form.pack
    };
    try {
      const response = await fetch('/api/reservations', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      if (!response.ok) throw new Error('Booking failed. Please try again.');
      setBookingStatus('success');
      setForm({ spaceId: '', startTime: '', endTime: '', specialRequests: '', pack: '' });
    } catch (err) {
      setBookingStatus(err.toString());
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = newPalette.accent;
    e.target.style.boxShadow = `0 0 0 3px ${newPalette.accent.replace(')', ', 0.2)').replace('rgb', 'rgba')}`;
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#D1D5DB'; // Gray 300;
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={styles.page}>
      <motion.div style={styles.container} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header style={styles.header}>
          <h1 style={styles.title}>Book Your Space</h1>
          <Link to="/user/dashboard" style={styles.backLink} onMouseOver={e => e.currentTarget.style.color = newPalette.primary} onMouseOut={e => e.currentTarget.style.color = newPalette.textLight}>
            <FaArrowLeft />
            Back to Dashboard
          </Link>
        </header>

        {loading ? <p>Loading spaces...</p> : error ? <p style={{ color: '#f97316' }}>{error}</p> : (
          <form onSubmit={handleSubmit}>
            <motion.div style={styles.formGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <motion.label htmlFor="spaceId" style={styles.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Select a Space</motion.label>
                            <div style={{ position: 'relative' }}>
                <FaRegBuilding style={{ ...styles.inputIcon, color: newPalette.icon1 }} />
                <select id="spaceId" name="spaceId" value={form.spaceId} onChange={handleChange} required style={styles.input} onFocus={handleFocus} onBlur={handleBlur}>
                  <option value="" disabled>Choose your space...</option>
                  {spaces.map(s => <option key={s.id} value={s.id}>{s.name} ({s.type})</option>)}
                </select>
              </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <motion.div style={styles.formGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <label htmlFor="startTime" style={styles.label}>Start Time</label>
                <div style={{ position: 'relative' }}>
                  <FaRegCalendarAlt style={{ ...styles.inputIcon, color: newPalette.icon2 }} />
                  <input type="datetime-local" id="startTime" name="startTime" value={form.startTime} onChange={handleChange} required style={styles.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </motion.div>

              <motion.div style={styles.formGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <label htmlFor="endTime" style={styles.label}>End Time</label>
                <div style={{ position: 'relative' }}>
                  <FaRegCalendarAlt style={{ ...styles.inputIcon, color: newPalette.icon2 }} />
                  <input type="datetime-local" id="endTime" name="endTime" value={form.endTime} onChange={handleChange} required style={styles.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </motion.div>
            </div>

            <motion.div style={styles.formGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <label htmlFor="pack" style={styles.label}>Select Pack</label>
              <div style={{ position: 'relative' }}>
                <FaRegBuilding style={{ ...styles.inputIcon, color: newPalette.icon4 }} />
                <select id="pack" name="pack" value={form.pack} onChange={handleChange} required style={styles.input} onFocus={handleFocus} onBlur={handleBlur}>
                  <option value="" disabled>Choose your pack...</option>
                  <option value="Open Space">Open Space (25dh/hour)</option>
                  <option value="Small Office">Small Office (100dh/week) - Most Popular</option>
                  <option value="Standard Office">Standard Office (200dh/week)</option>
                </select>
              </div>
            </motion.div>

            <motion.div style={styles.formGroup} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <motion.label htmlFor="specialRequests" style={styles.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Special Requests (Optional)</motion.label>
                            <div style={{ position: 'relative' }}>
                <FaRegCommentDots style={{ ...styles.inputIcon, color: newPalette.icon3 }} />
                <textarea id="specialRequests" name="specialRequests" value={form.specialRequests} onChange={handleChange} style={{ ...styles.input, height: 100, paddingTop: '0.75rem' }} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </motion.div>

            <motion.button type="submit" style={styles.button} whileHover={{ scale: 1.02, boxShadow: `0 4px 20px ${newPalette.primary.replace(')', ', 0.4)').replace('rgb', 'rgba')}` }} whileTap={{ scale: 0.98 }}>
              Confirm Booking
              <FaPaperPlane />
            </motion.button>
          </form>
        )}

        {bookingStatus && (
          <motion.div 
            style={{ ...styles.statusMessage, background: bookingStatus === 'success' ? `rgba(16, 185, 129, 0.1)` : `rgba(239, 68, 68, 0.1)`, color: bookingStatus === 'success' ? newPalette.success : newPalette.error }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            {bookingStatus === 'success' ? <><FaCheckCircle style={{ marginRight: '0.5rem' }} /> Booking successful! Redirecting...</> : <><FaExclamationCircle style={{ marginRight: '0.5rem' }} /> {bookingStatus}</>}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 