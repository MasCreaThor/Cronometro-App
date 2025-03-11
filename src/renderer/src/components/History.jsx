// src/renderer/src/components/History.jsx
import React, { useState } from 'react';

function History({ history, deleteHistoryItem, deleteAllHistory }) {
  const [expanded, setExpanded] = useState(false);

  // Definimos una altura base para el contenedor de historial
  const baseHeight = '150px';
  // Altura expandida para cuando se active "Ver más"
  const expandedHeight = '250px';

  if (history.length === 0) {
    return (
      <div className="history-container" style={{
        marginTop: '20px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        width: '90%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h3 style={{ margin: 0, fontSize: '14px' }}>No history yet</h3>
      </div>
    );
  }

  return (
    <div className="history-container" style={{
      marginTop: '20px',
      height: expanded ? expandedHeight : baseHeight,
      maxHeight: expanded ? expandedHeight : baseHeight,
      overflowY: 'auto',
      width: '90%',
      padding: '10px',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'height 0.3s ease',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'inherit',
        zIndex: 10,
        padding: '5px 0'
      }}>
        <h3 style={{ margin: 0, fontSize: '14px' }}>History</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '11px',
              width: 'auto',
              height: 'auto',
              cursor: 'pointer'
            }}
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>
          <button
            onClick={deleteAllHistory}
            style={{
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '11px',
              width: 'auto',
              height: 'auto',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </div>
      </div>
      <ul style={{
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        overflowY: 'auto'
      }}>
        {history.map((item, index) => (
          <li key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '14px' }}>
                  {String(item.hours).padStart(2, '0')}:{String(item.minutes).padStart(2, '0')}:{String(item.seconds).padStart(2, '0')}
                  {item.completed && <span style={{ fontSize: '12px', marginLeft: '5px', color: '#4CAF50' }}>✓</span>}
                </span>
              </div>
              {item.timestamp && (
                <span style={{ fontSize: '11px', opacity: 0.6 }}>
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              )}
            </div>
            <button
              onClick={() => deleteHistoryItem(index)}
              style={{
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.6)',
                border: 'none',
                fontSize: '16px',
                width: '20px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;