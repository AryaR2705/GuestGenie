const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = 5500;

// Connect to SQLite database
const db = new sqlite3.Database('./hotel.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
    // Create RoomInfo table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS RoomInfo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numPeople INTEGER,
      roomType TEXT,
      checkInDate TEXT,
      checkOutDate TEXT
    )`);
  }
});

// Middleware
app.use(bodyParser.json());

// Route to handle information extraction
app.post('/extract', (req, res) => {
  const { text } = req.body;
  const result = extractInformation(text);

  // Store the extracted information in the SQLite database
  db.run(
    'INSERT INTO RoomInfo (numPeople, roomType, checkInDate, checkOutDate) VALUES (?, ?, ?, ?)',
    [result.numPeople, result.roomType, result.checkInDate, result.checkOutDate],
    function (err) {
      if (err) {
        console.error('Error inserting data:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log(`Row inserted with ID: ${this.lastID}`);
      res.json(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
