// Database.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './data/app.css';
function Database() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/data');
        console.log('Fetched Data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="database-container">
      <h2>Room Info Database</h2>
      <table className="database-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Hotel</th>
            <th>Number of People</th>
            <th>Room Type in BHK</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            {/* Add new headers for the new columns */}
            {/* Example:
            <th>New Column 1</th>
            <th>New Column 2</th>
            */}
          </tr>
        </thead>
        <tbody className='hero'>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.hotel}</td>
              <td>{entry.numPeople}</td>
              <td>{entry.roomType}</td>
              <td>{entry.checkInDate}</td>
              <td>{entry.checkOutDate}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Database;
