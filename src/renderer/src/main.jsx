import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Timer from '@renderer/components/Timer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
);
