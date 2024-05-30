import React, { useEffect, useRef, useState } from 'react';

interface MyPianoRollProps {
    notes: any[];
}

const MyPianoRoll: React.FC<MyPianoRollProps> = ({ notes }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredNote, setHoveredNote] = useState<any | null>(null);
  
    const noteHeight = 20;
    const keyWidth = 75;
    const verticalGridLineInterval = 12.5;
    const verticalGridLineThickerInterval = 100;
  
    // Calculate the range of notes to be displayed
    const midiNotes = notes.map(note => note.midi);
    const lowestNote = Math.min(...midiNotes);
    const highestNote = Math.max(...midiNotes);
    const maxTime = Math.max(...notes.map(note => note.time + note.duration));
  
    const lowestOctaveNote = Math.floor(lowestNote / 12) * 12 - 12;
    const highestOctaveNote = Math.ceil(highestNote / 12) * 12 + 11;
  
    const numKeys = highestOctaveNote - lowestOctaveNote + 1;
    const canvasHeight = numKeys * noteHeight;
    const canvasWidth = maxTime * 100 + 200;
  
    useEffect(() => {
      const drawGrid = (ctx: CanvasRenderingContext2D) => {
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
  
      const drawNotes = (ctx: CanvasRenderingContext2D) => {
        notes.forEach(note => {
          ctx.fillStyle = note === hoveredNote ? 'red' : 'blue';
          const x = note.time * 100; // Simplified position calculation
          const y = canvasHeight - (note.midi - lowestOctaveNote + 1) * noteHeight; // Corrected position calculation
          const width = note.duration * 100;
          ctx.fillRect(x + keyWidth, y, width, noteHeight);
          ctx.fillStyle = 'white';
          ctx.fillText(note.name, x + keyWidth + 2, y + noteHeight - 2);
        });
      };
  
      const drawPianoKeys = (ctx: CanvasRenderingContext2D) => {
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
  
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawGrid(ctx);
          drawPianoKeys(ctx);
          drawNotes(ctx);
        }
      }
    }, [notes, hoveredNote, lowestNote, highestNote, lowestOctaveNote, highestOctaveNote, maxTime]);
  
    const handleMouseMove = (event: React.MouseEvent) => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - keyWidth;
        const y = event.clientY - rect.top;
        const hovered = notes.find(note => {
          const noteX = note.time * 100;
          const noteY = canvasHeight - (note.midi - lowestOctaveNote + 1) * noteHeight;
          const noteWidth = note.duration * 100;
          return x >= noteX && x <= noteX + noteWidth && y >= noteY && y <= noteY + noteHeight;
        });
        setHoveredNote(hovered || null);
      }
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

export default MyPianoRoll;