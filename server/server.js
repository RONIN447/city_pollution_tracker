const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
 
  user: 'root', // Use your MySQL username
  password: 'Akshat@4420', // Use your MySQL password
  database: 'city_pollution_tracker',
  port: '3306',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Get pollution data for an area
app.get('/pollution/:area_id', (req, res) => {
  const { area_id } = req.params;
  const query = `SELECT * FROM Pollution_Data WHERE area_id = ?`;
  db.query(query, [area_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add user submission
app.post('/submit', (req, res) => {
  const { area_id, pollution_type, description, submitted_by } = req.body;
  const query = `INSERT INTO User_Submissions (area_id, pollution_type, description, submitted_by) VALUES (?, ?, ?, ?)`;
  db.query(query, [area_id, pollution_type, description, submitted_by], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Submission added successfully!' });
  });
});

// Get all areas
app.get('/areas', (req, res) => {
  const query = `SELECT * FROM Areas`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
