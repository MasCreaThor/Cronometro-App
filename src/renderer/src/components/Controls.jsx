// src/renderer/src/components/Controls.jsx
function Controls({ setIsRunning, isRunning, reset }) {
  return (
    <div id="divControls">
      <button
        onClick={reset}
        disabled={isRunning}
        style={{
          opacity: isRunning ? 0.3 : 0.6,
          cursor: isRunning ? 'not-allowed' : 'pointer'
        }}
      >
        reset
      </button>
      <button
        style={{
          background: isRunning ? 'red' : 'green',
          opacity: 0.6
        }}
        onClick={setIsRunning}
      >
        {isRunning ? 'stop' : 'start'}
      </button>
    </div>
  );
}

export default Controls;
