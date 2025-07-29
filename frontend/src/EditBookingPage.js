import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRegBuilding, FaRegCalendarAlt, FaRegCommentDots, FaCheckCircle, FaExclamationCircle, FaPaperPlane } from 'react-icons/fa';

// Palette and styles copied from BookSpacePage
const newPalette = {
  primary: '#10B981',
  primaryHover: '#059669',
  secondary: '#F97316',
  gradient: 'linear-gradient(135deg, #34D399, #059669)',
  accent: '#F97316',
  text: '#1F2937',
  textLight: '#6B7280',
  background: '#F9FAFB',
  containerBg: 'rgba(255, 255, 255, 0.9)',
  success: '#10B981',
  error: '#EF4444',
  icon1: '#3B82F6',
  icon2: '#F97316',
  icon3: '#10B981',
  icon4: '#F59E0B',
  icon5: '#34C759',
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
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
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

export default function EditBookingPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ spaceId: '', startTime: '', endTime: '', specialRequests: '', pack: '' });
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        
        const [spacesRes, bookingRes] = await Promise.all([
          fetch('/api/spaces'),
          fetch(`/api/reservations/${bookingId}`)
        ]);
        const spacesData = spacesRes.ok ? await spacesRes.json() : [];
        const bookingData = bookingRes.ok ? await bookingRes.json() : null;
        setSpaces(spacesData);
        if (bookingData) {
          setForm({
            spaceId: bookingData.spaceId || '',
            startTime: bookingData.startTime ? bookingData.startTime.slice(0,16) : '',
            endTime: bookingData.endTime ? bookingData.endTime.slice(0,16) : '',
            specialRequests: bookingData.specialRequests || '',
            pack: bookingData.pack || ''
          });
        }
      } catch (e) {
        setError('Failed to load booking or spaces');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [bookingId]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFocus = (e) => {
    e.target.style.borderColor = newPalette.accent;
    e.target.style.boxShadow = `0 0 0 3px ${newPalette.accent.replace(')', ', 0.2)').replace('rgb', 'rgba')}`;
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#D1D5DB'; // Gray 300;
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    
    try {
      const payload = {
        ...form,
        startTime: new Date(form.startTime).toISOString(),
        endTime: new Date(form.endTime).toISOString()
      };
      
      const response = await fetch(`/api/reservations/${bookingId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update failed:', errorText);
        throw new Error(`Update failed: ${response.status} ${response.statusText}`);
      }
      
      const updatedReservation = await response.json();
      console.log('Reservation updated successfully:', updatedReservation);
      setStatus('success');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => navigate('/user/dashboard'), 1500);
    } catch (err) {
      console.error('Error updating reservation:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{padding:40}}>Loading...</div>;
  if (error) return <div style={{padding:40, color:'#f97316'}}>{error}</div>;

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <motion.div style={styles.container} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header style={styles.header}>
          <h1 style={styles.title}>Edit Reservation</h1>
          <Link to="/user/dashboard" style={styles.backLink} onMouseOver={e => e.currentTarget.style.color = newPalette.primary} onMouseOut={e => e.currentTarget.style.color = newPalette.textLight}>
            <FaArrowLeft />
            Back to Dashboard
          </Link>
        </header>
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
            <label htmlFor="specialRequests" style={styles.label}>Special Requests</label>
            <div style={{ position: 'relative' }}>
              <FaRegCommentDots style={{ ...styles.inputIcon, color: newPalette.icon3 }} />
              <textarea id="specialRequests" name="specialRequests" value={form.specialRequests} onChange={handleChange} style={{ ...styles.input, paddingLeft: '2.5rem', minHeight: 80 }} onFocus={handleFocus} onBlur={handleBlur} rows={3} />
            </div>
          </motion.div>
          <motion.button 
            type="submit" 
            style={{...styles.button, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}} 
            whileHover={loading ? {} : { scale: 1.03 }} 
            whileTap={loading ? {} : { scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={{width: 16, height: 16, border: '2px solid transparent', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite'}}></div>
                Saving...
              </>
            ) : (
              <>
                <FaPaperPlane /> Save Changes
              </>
            )}
          </motion.button>
          {status === 'success' && <div style={{ ...styles.statusMessage, background: 'rgba(16,185,129,0.1)', color: newPalette.success }}><FaCheckCircle style={{ marginRight: 8 }} />Reservation updated!</div>}
          {status === 'error' && <div style={{ ...styles.statusMessage, background: 'rgba(239,68,68,0.09)', color: newPalette.error }}><FaExclamationCircle style={{ marginRight: 8 }} />Failed to update reservation.</div>}
        </form>
      </motion.div>
    </div>
  );
}
