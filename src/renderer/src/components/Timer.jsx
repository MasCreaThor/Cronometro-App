// src/renderer/src/components/Timer.jsx
import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Display from '@renderer/components/Display';
import Controls from '@renderer/components/Controls';
import History from '@renderer/components/History';
import Countdown from '@renderer/components/Countdown';
import SoundSelector from '@renderer/components/SoundSelector';
import { playSound } from '@renderer/utils/soundUtils';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  // Estado para el sonido seleccionado
  const [selectedSound, setSelectedSound] = useState(() => {
    return localStorage.getItem('selectedSound') || 'default';
  });

  // Referencia para el audio de la alarma
  const alarmRef = useRef(null);

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('timerHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Valores iniciales del temporizador
  const [initialTimerValues, setInitialTimerValues] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [validTimerStarted, setValidTimerStarted] = useState(false);

  // Función para cambiar el sonido seleccionado
  const handleSoundChange = (soundId) => {
    setSelectedSound(soundId);
    localStorage.setItem('selectedSound', soundId);
  };

  // Función para reproducir la alarma utilizando el módulo de utilidad
  const playAlarm = () => {
    playSound(selectedSound, alarmRef);
  };

  const reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const startCountdown = () => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      const exactInitialValues = { hours, minutes, seconds };
      setInitialTimerValues(exactInitialValues);
      setValidTimerStarted(true);
      setShowCountdown(true);
    } else {
      setValidTimerStarted(false);
    }
  };

  const onCountdownComplete = () => {
    setShowCountdown(false);
    setIsRunning(true);
  };

  const deleteHistoryItem = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    localStorage.setItem('timerHistory', JSON.stringify(updatedHistory));
  };

  const deleteAllHistory = () => {
    setHistory([]);
    localStorage.removeItem('timerHistory');
  };

  useEffect(() => {
    let intervalId;

    // Solo crear el intervalo si isRunning es true
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }

    // Limpiar el intervalo cuando cambie isRunning o se desmonte el componente
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (seconds === 0 && minutes === 0 && hours === 0) {
      if (validTimerStarted) {
        const timerCompleteHistoryItem = {
          hours: initialTimerValues.hours,
          minutes: initialTimerValues.minutes,
          seconds: initialTimerValues.seconds,
          timestamp: Date.now(),
          completed: true,
          sound: selectedSound
        };

        const updatedHistory = [timerCompleteHistoryItem, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('timerHistory', JSON.stringify(updatedHistory));
      }

      playAlarm();
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
  }, [seconds, minutes, hours, isRunning, history, initialTimerValues, validTimerStarted, selectedSound]);

  // Limpiar la referencia de audio cuando se desmonte el componente
  useEffect(() => {
    return () => {
      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '20px 0',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Componente de cuenta regresiva - posición absoluta para no afectar el layout */}
      <Countdown
        isActive={showCountdown}
        onComplete={onCountdownComplete}
      />

      {/* Contenedor principal para los controles del timer */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        flex: '0 0 auto',
        marginBottom: '20px'
      }}>
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
          setIsRunning={() => {
            if (isRunning) {
              setIsRunning(false);
            }
            else {
              startCountdown();
            }
          }}
          isRunning={isRunning || showCountdown}
          reset={reset}
        />

        <SoundSelector
          currentSound={selectedSound}
          onSoundChange={handleSoundChange}
        />
      </div>

      {/* Contenedor del historial con tamaño fijo */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <History
          history={history}
          deleteHistoryItem={deleteHistoryItem}
          deleteAllHistory={deleteAllHistory}
        />
      </div>
    </div>
  );
}

export default Timer;