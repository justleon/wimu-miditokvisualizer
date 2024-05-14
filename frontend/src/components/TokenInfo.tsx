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
      width: '140px',
      height: '200px',
      border: '1px solid #ccc',
      margin: '5px',
      position: 'sticky',
      top: '0',
      backgroundColor: token ? TokenTypeToColor(token.type) : '#4e4e4e',
      boxSizing: 'border-box',
      paddingTop: '20px'
    }}
  >
    {token && (
      <div>
        <div style={{ fontSize: '16px', marginBottom: '5px' }}>
          <b>{heading}</b>
        </div>
        <div style={{ fontSize: '14px' }}>
          <strong>Type:</strong> {token.type}
        </div>
        <div style={{ fontSize: '14px' }}>
          <strong>Value:</strong> {token.value}
        </div>
        <div style={{ fontSize: '14px' }}>
          <strong>Time:</strong> {token.time}
        </div>
        <div style={{ fontSize: '14px' }}>
          <strong>Program:</strong> {token.program}
        </div>
        <div style={{ fontSize: '14px' }}>
          <strong>Desc:</strong> {token.desc}
        </div>
      </div>
    )}
  </div >;
};

export default TokenInfo;
