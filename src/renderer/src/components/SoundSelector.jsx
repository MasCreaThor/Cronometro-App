// src/renderer/src/components/SoundSelector.jsx
import React, { useRef, useState } from 'react';
import { SOUND_OPTIONS, playSound } from '@renderer/utils/soundUtils';

function SoundSelector({ currentSound, onSoundChange }) {
  // Referencia para controlar el audio que se está reproduciendo
  const audioRef = useRef(null);
  // Estado para controlar qué sonido se está reproduciendo
  const [playingSound, setPlayingSound] = useState(null);

  // Función para probar un sonido
  const handlePlaySound = (soundId) => {
    // Si el sonido seleccionado es el que ya está sonando, solo detenerlo
    if (playingSound === soundId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingSound(null);
      return;
    }

    // Reproducir el nuevo sonido
    playSound(soundId, audioRef, () => setPlayingSound(null));
    setPlayingSound(soundId);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '15px',
      marginBottom: '15px',
      width: '90%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '300px'
      }}>
        <select
          value={currentSound}
          onChange={(e) => onSoundChange(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid currentColor',
            background: 'transparent',
            color: 'currentColor',
            width: '70%',
            cursor: 'pointer'
          }}
        >
          {SOUND_OPTIONS.map((sound) => (
            <option key={sound.id} value={sound.id}>
              {sound.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => handlePlaySound(currentSound)}
          style={{
            background: playingSound === currentSound ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
            color: 'currentColor',
            border: '1px solid currentColor',
            borderRadius: '4px',
            padding: '8px',
            fontSize: '12px',
            width: 'auto',
            height: 'auto',
            cursor: 'pointer'
          }}
        >
          {playingSound === currentSound ? 'Detener' : 'Probar'}
        </button>
      </div>
    </div>
  );
}

export default SoundSelector;