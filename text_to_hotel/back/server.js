const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const extractInformation = require('./extractor');

const app = express();
const PORT = 5500;

// Connect to SQLite database
const db = new sqlite3.Database('./okay.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
    // Create RoomInfo table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS RoomInfo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      hotel TEXT,
      numPeople INTEGER,
      roomType TEXT,
      checkInDate TEXT,
      checkOutDate TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/extract', (req, res) => {
  const { text } = req.body;
  const result = extractInformation(text);

  // Check if extractInformation returned undefined
  if (!result || result === undefined) {
    console.error('Error: Unable to extract information.');
    return res.status(400).json({ error: 'Unable to extract information from the provided text.' });
  }
  res.json(result);
});

// Route to handle inserting extracted information into the database
app.post('/insert', (req, res) => {
  const { name, hotel, numPeople, roomType, checkInDate, checkOutDate } = req.body;

  // Use prepared statement to insert data
  const query = 'INSERT INTO RoomInfo (name, hotel, numPeople, roomType, checkInDate, checkOutDate) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, hotel, numPeople, roomType, checkInDate, checkOutDate];

  db.run(query, values, function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(`Row inserted with ID: ${this.lastID}`);
    res.json({
      id: this.lastID,
      name,
      hotel,
      numPeople,
      roomType,
      checkInDate,
      checkOutDate,
    });
  });
});

app.delete('/delete/:id', (req, res) => {
  const idToDelete = req.params.id;

  // Use prepared statement to delete data by ID
  const query = 'DELETE FROM RoomInfo WHERE id = ?';

  db.run(query, idToDelete, function (err) {
    if (err) {
      console.error('Error deleting data:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(`Row with ID ${idToDelete} deleted.`);
    res.json({ message: `Row with ID ${idToDelete} deleted.` });
  });
});

// Route to fetch data from the SQLite database
app.get('/data', (req, res) => {
  // Fetch data from the SQLite database
  db.all('SELECT * FROM RoomInfo', (err, rows) => {
    if (err) {
      console.error('Error fetching data from the database:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Convert relevant fields to integers before sending the response
    const formattedRows = rows.map((row) => ({
      ...row,
      numPeople: parseInt(row.numPeople),
      checkInDate: parseInt(row.checkInDate),
      checkOutDate: parseInt(row.checkOutDate),
    }));

    res.json(formattedRows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
