import { Midi, Track } from '@tonejs/midi';

export const processMidiFile = (file: File, callback: (noteData: any[]) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const midi = new Midi(arrayBuffer);
      const notes = midi.tracks.flatMap(track => track.notes);
      callback(notes);
    };
    reader.readAsArrayBuffer(file);
  };