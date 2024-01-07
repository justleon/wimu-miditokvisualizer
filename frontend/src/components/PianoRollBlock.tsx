import React, { useState } from 'react';
import { Token } from '../interfaces/ApiResponse';

interface PianoRollBlockProps {
  item: Token;
}

const PianoRollBlock: React.FC<PianoRollBlockProps> = ({ item }) => {
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
            <div>
              <strong>Type:</strong> {item.type}
            </div>
            <div>
              <strong>Value:</strong> {item.value}
            </div>
            <div>
              <strong>Time:</strong> {item.time}
            </div>
            <div>
              <strong>Program:</strong> {item.program}
            </div>
            <div>
              <strong>Desc:</strong> {item.desc}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PianoRollBlock;
