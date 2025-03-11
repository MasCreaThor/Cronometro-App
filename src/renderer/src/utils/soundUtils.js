// src/renderer/src/utils/soundUtils.js

// Mapeamos los IDs a los nombres de archivos reales
export const SOUND_FILES = {
  'default': 'alarma.mp3',
  'bell': 'alarma2.mp3',
  'digital': 'alarma3.mp3'
};

// Lista de sonidos disponibles
export const SOUND_OPTIONS = [
  { id: 'default', name: 'Alarma Predeterminada' },
  { id: 'bell', name: 'Tu Segundo Sonido' },
  { id: 'digital', name: 'Tu Tercer Sonido' }
];

// Función para obtener la ruta completa a un archivo de sonido
export function getSoundPath(soundId) {
  return `./src/assets/${SOUND_FILES[soundId]}`;
}

// Función para reproducir un sonido
export function playSound(soundId, audioRef, onEndCallback) {
  // Si ya hay un audio sonando, detenerlo
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  // Crear y reproducir el nuevo audio
  const audio = new Audio(getSoundPath(soundId));

  // Configurar el callback para cuando termine la reproducción
  if (onEndCallback) {
    audio.onended = onEndCallback;
  }

  // Reproducir el sonido
  audio.play().catch(err => {
    console.error(`Error reproduciendo sonido ${soundId}:`, err);

    // Intentar con el sonido predeterminado si hay un error
    if (soundId !== 'default') {
      const defaultAudio = new Audio(getSoundPath('default'));
      defaultAudio.play();
      audioRef.current = defaultAudio;
    }
  });

  // Actualizar la referencia
  audioRef.current = audio;

  return audio;
}