import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Database from './Database';
import './index/index.css';
import DeleteButton from './DeleteButton';


function App() {
  const [inputText, setInputText] = useState('');
  const [extractedData, setExtractedData] = useState({
    id: null,
    numPeople: 0,
    roomType: '',
    checkInDate: 0,
    checkOutDate: 0,
  });
  const [showDatabase, setShowDatabase] = useState(false);
  const [insertingData, setInsertingData] = useState(false);
  const [buttonName, setButtonName] = useState('');
  const [selectedHotel, setSelectedHotel] = useState('');

  const extractInformation = async () => {
    try {
      const response = await axios.post('http://localhost:5500/extract', {
        text: inputText,
      });
      setExtractedData(response.data);
    } catch (error) {
      console.error('Error extracting information:', error);
    }
  };





  const insertIntoDatabase = async () => {
    try {
      setInsertingData(true);

      if (
        !buttonName ||
        !selectedHotel ||
        !extractedData.numPeople ||
        !extractedData.roomType ||
        !extractedData.checkInDate ||
        !extractedData.checkOutDate
      ) {
        alert('Error: Please fill in all fields.');
        return;
      }

      const formattedCheckInDate = extractedData.checkInDate.toString();
      const formattedCheckOutDate = extractedData.checkOutDate.toString();

      await axios.post('http://localhost:5500/insert', {
        ...extractedData,
        name: buttonName,
        hotel: selectedHotel,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
      });

      setShowDatabase(true);
      window.location.reload();
    } catch (error) {
      console.error('Error inserting information into the database:', error);
    } finally {
      setInsertingData(false);
    }
  };

  const handleExtractInformation = async () => {
    await extractInformation();
    setExtractedData((prevData) => ({
      id: prevData.id,
      numPeople: parseInt(prevData.numPeople) || 0,
      roomType: prevData.roomType,
      checkInDate: parseInt(prevData.checkInDate) || 0,
      checkOutDate: parseInt(prevData.checkOutDate) || 0,
    }));
  };

  const deleteDatabaseEntry = async () => {
    try {
      setInsertingData(true);

      if (!extractedData.id) {
        alert('Error: Missing ID for deletion.');
        return;
      }

      await axios.delete(`http://localhost:5500/delete/${extractedData.id}`);
      await fetchData();

      setButtonName('');
      setSelectedHotel('');
      setInputText('');
      setShowDatabase(true);
    } catch (error) {
      console.error('Error deleting information from the database:', error);
    } finally {
      setInsertingData(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5500/data');
      setExtractedData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const hotelOptions = [
    'The O Hotel Pune',
    'JW Marriott Hotel Pune',
    'Vivanta by Taj - Blue Diamond',
    'Hyatt Regency Pune',
    'Conrad Pune',
    'Sheraton Grand Pune Bund Garden Hotel',
    'Radisson Blu Hotel Pune Kharadi',
    'The Westin Pune Koregaon Park',
    'Le Meridien Pune',
    'The Corinthians Resort and Club',
  ];

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      if (showDatabase) {
        fetchData();
      }
    }, 5000);

    return () => clearInterval(fetchDataInterval);
  }, [showDatabase]);

  return (
    <div className='everything'>
      <h1>Room Info Extractor</h1>
      <p className='jin'>
        User Name:{' '}
        <input
          type="text"
          value={buttonName}
          onChange={(e) => setButtonName(e.target.value)}
        />
      </p>
      <p className='jin'>
        Select Hotel:{' '}
        <select
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
        >
          <option value="">Select a hotel</option>
          {hotelOptions.map((hotel, index) => (
            <option key={index} value={hotel}>
              {hotel}
            </option>
          ))}
        </select>
      </p>
      <textarea
        rows="5"
        cols="50"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="type something like this : i want to book room for 3 people which should be 2bhk and from 3 jan to 7 feb"
      />
      <br />
      <button onClick={handleExtractInformation}>Extract Information</button>
      <br />
      <div>
        <h2 className='jin'>Result:</h2>
        <p className='jin'>
          Number of people:{' '}
          <input
            type="number"
            value={extractedData.numPeople || ''}
            onChange={(e) =>
              setExtractedData({
                ...extractedData,
                numPeople: parseInt(e.target.value) || 0,
              })
            }
          />
        </p>
        <p className='jin'>
          Room type in BHK:{' '}
          <input
            type="text"
            value={extractedData.roomType || ''}
            onChange={(e) =>
              setExtractedData({ ...extractedData, roomType: e.target.value })
            }
          />
        </p>
        <p className='jin'>
          Check-in date:{' '}
          <input
            type="text"
            value={extractedData.checkInDate || ''}
            onChange={(e) =>
              setExtractedData({
                ...extractedData,
                checkInDate: e.target.value,
              })
            }
          />
        </p>
        <p className='jin'>
          Check-out date:{' '}
          <input
            type="text"
            value={extractedData.checkOutDate || ''}
            onChange={(e) =>
              setExtractedData({
                ...extractedData,
                checkOutDate: e.target.value,
              })
            }
          />
        </p>
        <button onClick={insertIntoDatabase}>Insert Into Database</button>
        <DeleteButton extractedData={extractedData} onDelete={fetchData} />
      </div>
      <br></br>
      <br></br>
      <Database />
    </div>
  );
}

export default App;
