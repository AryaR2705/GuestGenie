import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Bot from './bot.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Bot />} />
        <Route path="/home" element={<App />} /> 
        <Route path="/annyang" element={<annyang />} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);
