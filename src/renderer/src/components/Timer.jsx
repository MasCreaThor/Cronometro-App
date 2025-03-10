// src/renderer/src/components/Timer.jsx
import React, { useState, useEffect } from 'react';
import Display from '@renderer/components/Display';
import Controls from '@renderer/components/Controls';
import History from '@renderer/components/History';
import Alarma from '@renderer/assets/alarma.mp3';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [alarma] = useState(new Audio(Alarma));
  const [timeRecords, setTimeRecords] = useState([]);
  const [error, setError] = useState('');

  const reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
    setError('');
    setInitialTime(null);
    setCurrentTimerId(null);
  };

  const validateTime = () => {
    // Verificar si se ha establecido algún tiempo
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setError('Por favor, establece un tiempo antes de iniciar');
      return false;
    }
    setError('');
    return true;
  };

  const handleStartStop = () => {
    if (!isRunning) {
      // Solo validamos cuando estamos por iniciar
      if (!validateTime()) return;

      // Generamos un nuevo ID para este ciclo de temporización
      const newTimerId = Date.now();
      setCurrentTimerId(newTimerId);

      // Si iniciamos, guardamos el tiempo inicial para el historial
      const initialTime = {
        hours,
        minutes,
        seconds
      };
      // Guardamos en el estado para usarlo cuando finalice
      setInitialTime(initialTime);
    } else {
      // Si paramos manualmente, guardamos en el historial con el tiempo restante
      addToHistory({
        hours,
        minutes,
        seconds,
        completed: false
      });

      // Limpiamos ambos valores para evitar duplicados
      setInitialTime(null);
      setCurrentTimerId(null);
    }

    // Cambiamos el estado de ejecución
    setIsRunning(prev => !prev);
  };

  // Estado para guardar el tiempo inicial y un ID para cada ciclo de temporización
  const [initialTime, setInitialTime] = useState(null);
  const [currentTimerId, setCurrentTimerId] = useState(null);

  const addToHistory = (currentTime) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

    let timeEntry = {
      ...currentTime,
      date: formattedDate,
      id: currentTimerId || Date.now() // Usar ID existente o crear uno nuevo
    };

    // Verificar que no exista un registro con el mismo ID
    setTimeRecords(prev => {
      // Si ya existe un registro con este ID, no agregarlo de nuevo
      if (currentTimerId && prev.some(record => record.id === currentTimerId)) {
        return prev;
      }
      return [timeEntry, ...prev];
    });
  };

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        if (minutes > 0) {
          setMinutes((m) => m - 1);
          return 59;
        }
        if (hours > 0) {
          setHours((h) => h - 1);
          setMinutes(59);
          return 59;
        }

        // Temporizador completado
        alarma.play();
        setIsRunning(false);

        // Agregar al historial cuando finaliza, solo si hay un tiempo inicial
        if (initialTime) {
          addToHistory({
            ...initialTime,
            completed: true
          });
          // Limpiar para evitar duplicados
          setInitialTime(null);
          setCurrentTimerId(null);
        }

        clearInterval(intervalId);
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, hours, alarma, initialTime]);

  // Nuevo componente para mostrar errores
  const ErrorMessage = () => {
    if (!error) return null;
    return <div className="error-message">{error}</div>;
  };

  // Función para actualizar tamaño de la ventana según si hay historial
  useEffect(() => {
    const { ipcRenderer } = window.electron;
    const newHeight = timeRecords.length > 0 ? 500 : 320;
    ipcRenderer.send('resize', 400, newHeight);
  }, [timeRecords.length]);



  return (
    <div className="timer-container">
      <Display
        setHours={setHours}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
      />
      <ErrorMessage />
      <Controls
        setIsRunning={handleStartStop}
        isRunning={isRunning}
        reset={reset}
      />
      <History timeRecords={timeRecords} />
    </div>
  );
}

export default Timer;
