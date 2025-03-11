import React from 'react';

function History({ history, deleteHistoryItem, deleteAllHistory }) {
  // No need to sort the history array here since we're now adding new items
  // at the beginning of the array in the Timer component

  if (history.length === 0) {
    return (
      <div className="history-container" style={{
        marginTop: '20px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)'
      }}>
        <h3>No history yet</h3>
      </div>
    );
  }

  return (
    <div className="history-container" style={{
      marginTop: '20px',
      maxHeight: '150px',
      overflowY: 'auto',
      width: '90%',
      padding: '10px',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>History</h3>
        <button
          onClick={deleteAllHistory}
          style={{
            background: 'transparent',
            color: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
            padding: '5px 10px',
            fontSize: '12px',
            width: 'auto',
            height: 'auto'
          }}
        >
          Clear All
        </button>
      </div>
      <ul style={{
        listStyleType: 'none',
        padding: 0,
        margin: 0
      }}>
        {history.map((item, index) => (
          <li key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span>
              {String(item.hours).padStart(2, '0')}:{String(item.minutes).padStart(2, '0')}:{String(item.seconds).padStart(2, '0')}
              {item.completed && <span style={{ fontSize: '12px', marginLeft: '5px', color: '#4CAF50' }}>✓</span>}
              {item.timestamp && (
                <span style={{ fontSize: '12px', marginLeft: '10px', opacity: 0.6 }}>
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              )}
            </span>
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