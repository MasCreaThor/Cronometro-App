// src/renderer/src/main.jsx
import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Timer from '@renderer/components/Timer';
import ThemeToggle from './components/ThemeToggle';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeToggle />
    <Timer />
  </React.StrictMode>,
);