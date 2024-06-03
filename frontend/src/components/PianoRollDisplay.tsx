import React, { useEffect, useRef, useState } from 'react';
import { Note, Token } from '../interfaces/ApiResponse';

interface PianoRollDisplayProps {
    notes: Note[][];
    onNoteHover: (note: Note | null) => void;
    onNoteSelect: (note: Note | null) => void;
    track?: number;
    hoveredToken: Token | null;
    selectedToken: Token | null;
}

const PianoRollDisplay: React.FC<PianoRollDisplayProps> = ({ notes, onNoteHover, onNoteSelect, hoveredToken, selectedToken, track = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNote, setHoveredNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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
        const highlight_token = hoveredToken && note.start + ':' + note.pitch === hoveredToken.note_id;
        const selected_token = selectedToken && note.start + ':' + note.pitch === selectedToken.note_id;

        const highlight_note = note === hoveredNote;
        const selected_note = note === selectedNote;

        const highlight = highlight_token || highlight_note;
        const selected = selected_token || selected_note;

        ctx.fillStyle = highlight ? '#ebcc34' : selected ? '#de1818' : '#1c13d1';
        
        const x = note.start * timeScale; // Simplified position calculation
        const y = canvasHeight - (note.pitch - lowestOctaveNote + 1) * noteHeight; // Corrected position calculation
        const width = (note.end - note.start) * timeScale;

        ctx.fillRect(x + keyWidth, y, width, noteHeight);
        ctx.fillStyle = highlight ? 'black' : 'white';
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
  }, [notes, track, hoveredToken, selectedToken, hoveredNote, selectedNote, lowestNote, highestNote, lowestOctaveNote, highestOctaveNote, maxTime]);

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

  const handleMouseLeave = () => {
    setHoveredNote(null);
    onNoteHover(null);
  };
  
  const handleNoteClick = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (!canvas || !rect) {
      return;
    }

    const x = event.clientX - rect.left - keyWidth;
    const y = event.clientY - rect.top;
    const clicked = trackNotes.find(note => {
      const noteX = note.start * timeScale;
      const noteY = canvasHeight - (note.pitch - lowestOctaveNote + 1) * noteHeight;
      const noteWidth = (note.end - note.start) * timeScale;
      return x >= noteX && x <= noteX + noteWidth && y >= noteY && y <= noteY + noteHeight;
    });
    setSelectedNote(clicked || null);
    onNoteSelect(clicked || null);
  };

  useEffect(() => {
    if (hoveredToken) {
      const hoveredNote = trackNotes.find(note => note.start + ':' + note.pitch === hoveredToken.note_id);
      setHoveredNote(hoveredNote || null);
      onNoteHover(hoveredNote || null);
    }
  }, [hoveredToken, trackNotes, onNoteHover]);

  useEffect(() => {
    if (selectedToken) {
      const selectedNote = trackNotes.find(note => note.start + ':' + note.pitch === selectedToken.note_id);
      setSelectedNote(selectedNote || null);
      onNoteSelect(selectedNote || null);
    }
  }, [selectedToken, trackNotes, onNoteSelect]);

  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleNoteClick}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default PianoRollDisplay;
