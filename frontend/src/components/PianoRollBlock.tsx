import React, { useState } from 'react';
import { Token } from '../interfaces/ApiResponse';

interface PianoRollBlockProps {
  item: Token;
  heading: string; // Add heading as a prop
}

const PianoRollBlock: React.FC<PianoRollBlockProps> = ({ item, heading }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  
  const dynamicFill = (type: string) => {
    if (type === 'Bar') {
      return '#67948b'
    }
    else if (type === 'Position' || type === 'TimeShift') {
      return '#748a9a'
    }
    else if (type === 'Tempo' || type === 'Rest') {
      return '#87673e'
    }
    else if (type === 'Pitch' || type === 'NoteOn') {
      return '#778b68'
    }
    else if (type === 'Velocity') {
      return '#cc968e'
    }
    else if (type === 'Duration' || type === 'NoteOff') {
      return '#4c4732'
    }
    else if (type === 'Family' || type === 'TimeSig') {
      return '#b076b2'
    }
    else {
      return '#000000'
    }
  };

  return (
      <div
        style={{
          display: 'inline-block',
          width: '70px',
          height: '100px',
          border: '1px solid #ccc',
          margin: '5px',
          position: 'relative',
          backgroundColor: dynamicFill(item.type)
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {isHovered && (
            <>
              <div style={{ fontSize: '12px', marginBottom: '5px' }}>
                <b>{heading}</b>
              </div>
              <div style={{ fontSize: '10px' }}>
                <strong>Type:</strong> {item.type}
              </div>
              <div style={{ fontSize: '10px' }}>
                <strong>Value:</strong> {item.value}
              </div>
              <div style={{ fontSize: '10px' }}>
                <strong>Time:</strong> {item.time}
              </div>
              <div style={{ fontSize: '10px' }}>
                <strong>Program:</strong> {item.program}
              </div>
              <div style={{ fontSize: '10px' }}>
                <strong>Desc:</strong> {item.desc}
              </div>
            </>
          )}
          {!isHovered && (
            <>
              <div style={{ fontSize: '10px' }}>
                <strong>{item.type}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    );
};

export default PianoRollBlock;
