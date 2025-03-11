// src/renderer/src/components/Countdown.jsx
import React, { useState, useEffect } from 'react';

function Countdown({ onComplete, isActive }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    // Reiniciar la cuenta cuando se active
    if (isActive) {
      setCount(3);
    }
  }, [isActive]);

  useEffect(() => {
    // Si no está activa la cuenta regresiva, no hacer nada
    if (!isActive) return;

    // Si la cuenta llega a 0, completar
    if (count === 0) {
      onComplete();
      return;
    }

    // Decrementar la cuenta cada segundo
    const interval = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, isActive, onComplete]);

  // Si no está activa, no mostrar nada
  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000, // Asegurarnos que esté por encima de todo
      flexDirection: 'column'
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: 'bold',
        color: count === 3 ? '#ff6b6b' : count === 2 ? '#feca57' : '#1dd1a1',
        opacity: 0.9,
        textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
        transform: 'scale(1)',
        transition: 'transform 0.2s ease-in-out',
        animation: 'countdownPulse 0.8s ease-in-out'
      }}>
        {count}
      </div>
      <p style={{
        marginTop: '20px',
        fontSize: '18px',
        color: 'rgba(255, 255, 255, 0.7)',
        letterSpacing: '2px'
      }}>
        PREPARADO?...
      </p>

      <style>
        {`
          @keyframes countdownPulse {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
          }
        `}
      </style>
    </div>
  );
}

export default Countdown;