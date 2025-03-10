import React, { useEffect } from 'react';
import { useState } from 'react';
import Display from '@renderer/components/Display';
import Controls from '@renderer/components/Controls';
import History from '@renderer/components/History';
import Countdown from '@renderer/components/Countdown';
import Alarma from '@renderer/assets/alarma.mp3';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [alarma] = useState(new Audio(Alarma));
  const [history, setHistory] = useState(() => {
    // Initialize history from localStorage if available
    const savedHistory = localStorage.getItem('timerHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Store the initial timer values when starting
  const [initialTimerValues, setInitialTimerValues] = useState({ hours: 0, minutes: 0, seconds: 0 });
  // Track if timer was started with non-zero values
  const [validTimerStarted, setValidTimerStarted] = useState(false);

  const reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Función para iniciar la cuenta regresiva antes del temporizador
  const startCountdown = () => {
    // Solo iniciar si hay un tiempo válido configurado
    if (hours > 0 || minutes > 0 || seconds > 0) {
      // Guardar los valores iniciales de tiempo
      const exactInitialValues = { hours, minutes, seconds };
      setInitialTimerValues(exactInitialValues);
      setValidTimerStarted(true);

      // Mostrar la cuenta regresiva
      setShowCountdown(true);

      console.log("Countdown started. Timer values:", exactInitialValues);
    } else {
      console.log("Timer not started: All values are zero");
      setValidTimerStarted(false);
    }
  };

  // Esta función se llamará cuando termine la cuenta regresiva
  const onCountdownComplete = () => {
    setShowCountdown(false);
    // Iniciar el temporizador real
    setIsRunning(true);
    console.log("Countdown complete, timer started");
  };

  // Delete a specific history item
  const deleteHistoryItem = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    localStorage.setItem('timerHistory', JSON.stringify(updatedHistory));
  };

  // Delete all history
  const deleteAllHistory = () => {
    setHistory([]);
    localStorage.removeItem('timerHistory');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRunning((prev) => {
        if (!prev) {
          clearInterval(intervalId);
          return false;
        }
        return true;
      });

      if (isRunning) {
        setSeconds(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    if (seconds === 0 && minutes === 0 && hours === 0) {
      // Timer ended - only add to history if it was a valid timer (started with non-zero values)
      if (validTimerStarted) {
        const timerCompleteHistoryItem = {
          hours: initialTimerValues.hours,
          minutes: initialTimerValues.minutes,
          seconds: initialTimerValues.seconds,
          timestamp: Date.now(),
          completed: true
        };

        // Add new item at the BEGINNING of the array (stack order - newest first)
        const updatedHistory = [timerCompleteHistoryItem, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('timerHistory', JSON.stringify(updatedHistory));
      }

      alarma.play();
      setIsRunning(false);
      return;
    }
    if (seconds < 0 && minutes > 0) {
      setMinutes(prev => prev - 1);
      setSeconds(59);
    }
    if (seconds < 0 && minutes === 0 && hours > 0) {
      setHours(prev => prev - 1);
      setMinutes(59);
      setSeconds(59);
    }
  }, [seconds, minutes, hours, isRunning, alarma, history, initialTimerValues, validTimerStarted]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Componente de cuenta regresiva */}
      <Countdown
        isActive={showCountdown}
        onComplete={onCountdownComplete}
      />

      <Display
        setHours={setHours}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
      />
      <Controls
        setIsRunning={(value) => {
          // Si está ejecutándose, solo detener
          if (isRunning && !value) {
            setIsRunning(false);
          }
          // Si no está ejecutándose y queremos iniciar, primero mostrar la cuenta regresiva
          else if (!isRunning && value) {
            startCountdown();
          }
        }}
        isRunning={isRunning || showCountdown} // Para deshabilitar el botón durante la cuenta regresiva
        reset={reset}
      />
      <History
        history={history}
        deleteHistoryItem={deleteHistoryItem}
        deleteAllHistory={deleteAllHistory}
      />
    </div>
  );
}

export default Timer;