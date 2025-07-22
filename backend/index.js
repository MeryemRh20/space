const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your actual MySQL credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'workbeatuser', // your MySQL username
  password: 'workbeatpass', // your MySQL password
  database: 'workbeat'
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  // Only allow 'admin' role if explicitly provided (for manual admin setup)
  const userRole = role === 'admin' ? 'admin' : 'user';
  db.query(
    'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
    [email, password, userRole],
    (err, results) => {
      if (err) return res.status(400).json({ error: 'User already exists or DB error' });
      res.json({ id: results.insertId, email, role: userRole });
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (results.length > 0) {
        const user = results[0];
        return res.json({ id: user.id, email: user.email, role: user.role });
      }
      res.status(401).json({ error: 'Invalid credentials' });
    }
  );
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
