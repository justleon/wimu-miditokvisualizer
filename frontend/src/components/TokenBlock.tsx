import React, { memo } from 'react';
import { Token } from '../interfaces/ApiResponse';

interface TokenBlockProps {
  item: Token;
  onHover: (t: Token | null, heading: string) => void;
  onSelect: (t: Token | null) => void;
  heading: string; // Add heading as a prop
  highlight: boolean | null;
  selected: boolean | null;
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


const TokenBlock: React.FC<TokenBlockProps> = memo(({ item, onHover, onSelect, heading, highlight, selected }) => {

  const handleMouseEnter = () => {
    if (item.note_id) {
      onHover(item, heading);
    }
  };
  const handleMouseLeave = () => {
    onHover(null, "");
  };
  const handleClick = () => {
    if (item.note_id) {
      onSelect(item);
    }
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
        backgroundColor: highlight ? '#ebcc34' : selected ? '#de1818' : TokenTypeToColor(item.type),
        color: highlight ? '#000000' : 'white'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ fontSize: '8px' }}>
          <strong>{item.type}</strong>
        </div>
      </div>
    </div>
  );
});

export default TokenBlock;
