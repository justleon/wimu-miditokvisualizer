import React from 'react';
import { Token } from '../interfaces/ApiResponse';
import { TokenTypeToColor } from './PianoRollBlock';

interface DataDisplayProps {
  token: Token | null;
  heading: string;
}

const TokenInfo: React.FC<DataDisplayProps> = ({ token, heading }) => {

  return <div
    style={{
      display: 'inline-block',
      width: '70px',
      height: '100px',
      border: '1px solid #ccc',
      margin: '5px',
      position: 'relative',
      backgroundColor: token ? TokenTypeToColor(token.type) : '#4e4e4e',
    }}
  >
    {token && (
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px' }}>
            <b>{heading}</b>
          </div>
          <div style={{ fontSize: '10px' }}>
            <strong>Type:</strong> {token.type}
          </div>
          <div style={{ fontSize: '10px' }}>
            <strong>Value:</strong> {token.value}
          </div>
          <div style={{ fontSize: '10px' }}>
            <strong>Time:</strong> {token.time}
          </div>
          <div style={{ fontSize: '10px' }}>
            <strong>Program:</strong> {token.program}
          </div>
          <div style={{ fontSize: '10px' }}>
            <strong>Desc:</strong> {token.desc}
          </div>
        </div>
      </div>
    )}
  </div >;
};

export default TokenInfo;
