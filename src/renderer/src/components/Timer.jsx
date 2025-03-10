import React, { useState, useEffect } from 'react';
import Display from '@renderer/components/Display';
import Controls from '@renderer/components/Controls';
import Alarma from '@renderer/assets/alarma.mp3';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [alarma] = useState(new Audio(Alarma));

  const reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
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
        alarma.play();
        setIsRunning(false);
        clearInterval(intervalId);
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, hours, alarma]);

  return (
    <div>
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
        setIsRunning={setIsRunning}
        isRunning={isRunning}
        reset={reset}
      />
    </div>
  );
}

export default Timer;
