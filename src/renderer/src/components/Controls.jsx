function Controls({ setIsRunning, isRunning, reset }) {
  return (
    <div id="divControls">
      <button onClick={reset}>reset</button>
      <button 
      style={{
        background: isRunning ? 'red' : 'green'
      }}
      onClick={ () => {setIsRunning(prev => !prev)}}>{isRunning ? 'stop' : 'start'}
      </button>
    </div>
  );
}

export default Controls;
