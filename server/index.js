// 3. Backend (server/index.js)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool, initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database on server start
initDb();

app.post('/api/register', async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    
    res.json({
      success: true,
      message: 'Registration successful!',
      user: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') { // Unique violation error code
      res.status(400).json({
        success: false,
        message: 'Email already registered.'
      });
    } else {
      console.error('Error during registration:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred during registration.'
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});