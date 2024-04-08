// Updated React Component with Vite and React Router

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './bot/bot.css';

const Bot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handlePrediction = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('http://127.0.0.1:5000/predict', {
        text: inputText,
      });

      setMessages([
        ...messages,
        { sender: 'user', content: inputText },
        { sender: 'bot', content: response.data.prediction },
      ]);
    } catch (err) {
      setError('Error fetching prediction.');
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  const handleAdminCheck = () => {
    const enteredUsername = window.prompt('Enter your username:');
    const enteredPassword = window.prompt('Enter your password:');

    // Check the entered username and password
    if (enteredUsername === '123' && enteredPassword === '123') {
      // Redirect to App.jsx page
      navigate('/home');
    } else {
      alert('Invalid username or password. Access denied.');
    }
  };

  return (
    <div className="combined-container">
      {/* Hotel List */}
      <div className="hotel-list">
        <h2>Hotel Names</h2>
        <ul>
          <li>The O Hotel Pune</li>
          <li>JW Marriott Hotel Pune</li>
          <li>Vivanta by Taj - Blue Diamond</li>
          <li>Hyatt Regency Pune</li>
          <li>Conrad Pune</li>
          <li>Sheraton Grand Pune Bund Garden Hotel</li>
          <li>Radisson Blu Hotel Pune Kharadi</li>
          <li>The Westin Pune Koregaon Park</li>
          <li>Le Meridien Pune</li>
          <li>The Corinthians Resort and Club</li>
        </ul>
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <strong>{message.sender === 'user' ? 'You' : 'Bot'}</strong>: {message.content}
            </div>
          ))}
        </div>
        <textarea
          className="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="predict-button" onClick={handlePrediction} disabled={loading}>
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>
        <button className="admin-check-button" onClick={handleAdminCheck}>
          Are you an admin?
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Bot;
