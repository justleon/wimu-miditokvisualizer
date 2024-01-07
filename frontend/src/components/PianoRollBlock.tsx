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
  
    return (
        <div
          style={{
            display: 'inline-block',
            width: '40px',
            height: '80px',
            border: '1px solid #ccc',
            margin: '5px',
            position: 'relative',
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
          </div>
        </div>
      );
  };
  
  export default PianoRollBlock;
