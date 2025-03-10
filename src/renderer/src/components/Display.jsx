function Display({ setHours, setMinutes, setSeconds, hours, minutes, seconds, isRunning }) {

  const handleChange = (event, setter, maxValue) => {
    let value = event.target.value.replace(/^0+/, ''); // Elimina ceros iniciales
    
    if (value === '') value = '0'; // Evita que el campo quede vacío
    value = Math.min(Math.max(parseInt(value, 10) || 0, 0), maxValue); // Asegura que el valor esté dentro del rango
    setter(value); // Actualiza el estado
  };

  return (
    <div id="divDisplay">
      <input 
        type="number" 
        value={String(hours).padStart(2, '0')} 
        min={0} max={23} 
        step={1} 
        onChange={(e) => handleChange(e, setHours, 23)} 
        readOnly={isRunning}
      /> <span>:</span>

      <input 
        type="number" 
        value={String(minutes).padStart(2, '0')} 
        min={0} max={59} 
        step={1} 
        onChange={(e) => handleChange(e, setMinutes, 59)} 
        readOnly={isRunning}
      /> <span>:</span>

      <input 
        type="number" 
        value={String(seconds).padStart(2, '0')} 
        min={0} 
        max={59} 
        onChange={(e) => handleChange(e, setSeconds, 59)} 
        readOnly={isRunning}
      />
    </div>
  );
}

export default Display;
