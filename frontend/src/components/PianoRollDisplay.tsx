import React, { useEffect, useRef, useState } from 'react';
import { Note } from '../interfaces/ApiResponse';

interface PianoRollDisplayProps {
    notes: Note[][];
    onNoteHover: (note: Note | null) => void;
    track?: number;
}

const PianoRollDisplay: React.FC<PianoRollDisplayProps> = ({ notes, onNoteHover, track = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNote, setHoveredNote] = useState<Note | null>(null);

  const noteHeight = 20;
  const keyWidth = 75;
  const verticalGridLineInterval = 12.5;
  const verticalGridLineThickerInterval = 100;
  const timeScale = 0.5;

  // Calculate the range of notes to be displayed
  const trackNotes = notes[track] || [];
  const lowestNote = Math.min(...trackNotes.map(note => note.pitch));
  const highestNote = Math.max(...trackNotes.map(note => note.pitch));
  const maxTime = Math.max(...trackNotes.map(note => note.end));

  const lowestOctaveNote = Math.floor(lowestNote / 12) * 12 - 12;
  const highestOctaveNote = Math.ceil(highestNote / 12) * 12 + 11;

  const numKeys = highestOctaveNote - lowestOctaveNote + 1;
  const canvasHeight = numKeys * noteHeight;
  const canvasWidth = maxTime * timeScale + 200;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    const drawGrid = () => {
      ctx.lineWidth = 0.35;

      // Draw horizontal grid lines
      for (let i = 0; i <= numKeys; i++) {
        const y = canvasHeight - i * noteHeight;
        ctx.strokeStyle = '#ccc';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }

      // Draw vertical grid lines for 16th notes
      for (let i = 0; i < canvasWidth; i += verticalGridLineInterval) {
        ctx.strokeStyle = (i % verticalGridLineThickerInterval === 0) ? '#aaa' : '#ccc'; // Thicker lines for beats
        ctx.beginPath();
        ctx.moveTo(i + keyWidth, 0);
        ctx.lineTo(i + keyWidth, canvasHeight);
        ctx.stroke();

        // Change background color every 4 grid lines
        if ((i / verticalGridLineInterval) % 8 < 4) {
          ctx.fillStyle = '#2a2a2a';
        } else {
          ctx.fillStyle = '#3a3a3a';
        }
        ctx.fillRect(i + keyWidth, 0, verticalGridLineInterval, canvasHeight);
      }
    };

    const drawNotes = () => {
      trackNotes.forEach(note => {
        ctx.fillStyle = note === hoveredNote ? 'red' : 'blue';
        const x = note.start * timeScale; // Simplified position calculation
        const y = canvasHeight - (note.pitch - lowestOctaveNote + 1) * noteHeight; // Corrected position calculation
        const width = (note.end - note.start) * timeScale;

        console.log(`Drawing note: ${note.name} at x=${x}, y=${y}, width=${width}`); // Log positions and size

        ctx.fillRect(x + keyWidth, y, width, noteHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(note.name, x + keyWidth + 2, y + noteHeight - 2);
      });
    };

    const drawPianoKeys = () => {
      const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

      for (let i = 0; i <= numKeys; i++) {
        const y = canvasHeight - (i + 1) * noteHeight; // Corrected position calculation
        const noteNumber = lowestOctaveNote + i; // Extend one octave below
        const noteName = noteNames[noteNumber % 12] + Math.floor(noteNumber / 12 - 1); // Shifted one octave down
        const isBlackKey = ['C#', 'D#', 'F#', 'G#', 'A#'].includes(noteNames[noteNumber % 12]);
        ctx.fillStyle = isBlackKey ? 'black' : 'white';
        ctx.fillRect(0, y, keyWidth, noteHeight);
        ctx.strokeRect(0, y, keyWidth, noteHeight);
        ctx.fillStyle = isBlackKey ? 'white' : 'black';
        ctx.fillText(noteName, 2, y + noteHeight - 2);
      }
    };

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    clearCanvas();
    drawGrid();
    drawPianoKeys();
    drawNotes();
  }, [notes, track, hoveredNote, lowestNote, highestNote, lowestOctaveNote, highestOctaveNote, maxTime]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (!canvas || !rect) {
      return;
    }

    const x = event.clientX - rect.left - keyWidth;
    const y = event.clientY - rect.top;
    const hovered = trackNotes.find(note => {
      const noteX = note.start * timeScale;
      const noteY = canvasHeight - (note.pitch - lowestOctaveNote + 1) * noteHeight;
      const noteWidth = (note.end - note.start) * timeScale;
      return x >= noteX && x <= noteX + noteWidth && y >= noteY && y <= noteY + noteHeight;
    });
    setHoveredNote(hovered || null);
    onNoteHover(hovered || null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onMouseMove={handleMouseMove}
      style={{ border: '1px solid black' }}
    />
  );
};

export default PianoRollDisplay;