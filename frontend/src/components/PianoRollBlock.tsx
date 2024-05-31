import React, { memo } from 'react';
import { Token } from '../interfaces/ApiResponse';

interface PianoRollBlockProps {
  item: Token;
  onHover: (t: Token | null, heading: string) => void;
  heading: string; // Add heading as a prop
  highlight: boolean;
}

export function TokenTypeToColor(type: string) {
  switch (type) {
    case 'Bar': return '#67948b';
    case 'Position':
    case 'TimeShift': return '#748a9a';
    case 'Tempo':
    case 'Rest': return '#87673e';
    case 'Pitch':
    case 'NoteOn': return '#778b68';
    case 'Velocity': return '#cc968e';
    case 'Duration':
    case 'NoteOff': return '#4c4732';
    case 'Family':
    case 'TimeSig': return '#b076b2';
    default: return '#000000'
  }
}


const PianoRollBlock: React.FC<PianoRollBlockProps> = memo(({ item, onHover, heading, highlight }) => {

  const handleMouseEnter = () => {
    onHover(item, heading);
  };
  const handleMouseLeave = () => {
    onHover(null, "");
  };

  return (
    <div
      style={{
        display: 'inline-block',
        width: '40px',
        height: '60px',
        border: '1px solid #ccc',
        margin: '5px',
        position: 'relative',
        backgroundColor: highlight ? 'yellow' : TokenTypeToColor(item.type)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ fontSize: '8px' }}>
          <strong>{item.type}</strong>
        </div>
      </div>
    </div>
  );
});

export default PianoRollBlock;
