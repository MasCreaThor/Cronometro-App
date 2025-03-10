// src/renderer/src/components/Display.jsx
function Display({ setHours, setMinutes, setSeconds, hours, minutes, seconds, isRunning }) {

  const handleChange = (event, setter, maxValue) => {
    // Obtener solo números del valor ingresado
    let value = event.target.value.replace(/[^0-9]/g, '');

    // Eliminar ceros iniciales
    value = value.replace(/^0+/, '');

    // Si está vacío, establecer como 0
    if (value === '') value = '0';

    // Convertir a número y asegurar que esté dentro del rango
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      setter(0);
      return;
    }

    // Limitar el valor al máximo permitido
    setter(Math.min(numValue, maxValue));
  };

  // Prevenir la entrada no numérica
  const handleKeyDown = (e) => {
    // Permitir: Delete, Backspace, Tab, Escape, Enter, flechas
    const allowedKeys = ['Delete', 'Backspace', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (
      allowedKeys.includes(e.key) ||
      // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.ctrlKey === true && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) ||
      // Permitir: Home, End, números
      ['Home', 'End'].includes(e.key) ||
      (/[0-9]/.test(e.key))
    ) {
      // Permitir estos casos
      return;
    }

    // Bloquear cualquier otra tecla
    e.preventDefault();
  };

  return (
    <div id="divDisplay">
      <input
        type="text"
        value={String(hours).padStart(2, '0')}
        onChange={(e) => handleChange(e, setHours, 23)}
        onKeyDown={handleKeyDown}
        readOnly={isRunning}
        disabled={isRunning}
        style={{ opacity: isRunning ? 0.7 : 1 }}
      /> <span>:</span>

      <input
        type="text"
        value={String(minutes).padStart(2, '0')}
        onChange={(e) => handleChange(e, setMinutes, 59)}
        onKeyDown={handleKeyDown}
        readOnly={isRunning}
        disabled={isRunning}
        style={{ opacity: isRunning ? 0.7 : 1 }}
      /> <span>:</span>

      <input
        type="text"
        value={String(seconds).padStart(2, '0')}
        onChange={(e) => handleChange(e, setSeconds, 59)}
        onKeyDown={handleKeyDown}
        readOnly={isRunning}
        disabled={isRunning}
        style={{ opacity: isRunning ? 0.7 : 1 }}
      />
    </div>
  );
}

export default Display;
