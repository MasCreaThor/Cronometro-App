// src/renderer/src/components/History.jsx
function History({ timeRecords }) {
  if (!timeRecords || timeRecords.length === 0) {
    return null;
  }

  return (
    <div className="history-container">
      <h3>Historial de tiempos</h3>
      <div className="history-list">
        {timeRecords.map((record, index) => (
          <div
            key={index}
            className={`history-item ${record.completed ? 'completed' : 'stopped'}`}
          >
            <span>{record.hours.toString().padStart(2, '0')}:</span>
            <span>{record.minutes.toString().padStart(2, '0')}:</span>
            <span>{record.seconds.toString().padStart(2, '0')}</span>
            <span className="history-date">
              {record.completed ? '✅ ' : '⏹️ '}
              {record.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
