import React from 'react';
import { ApiResponse } from '../interfaces/ApiResponse';

const DataDisplay: React.FC<{ data: ApiResponse }> = ({ data }) => {
  const { sequences } = data;

  return (
    <div>
      {sequences.map((sequence, sequenceIndex) => (
        <div key={sequenceIndex}>
          <h2>Sequence {sequenceIndex + 1}</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
                <th>Time</th>
                <th>Program</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {sequence.tokens.map((token, tokenIndex) => (
                <tr key={tokenIndex}>
                  <td>{token.type}</td>
                  <td>{token.value}</td>
                  <td>{token.time}</td>
                  <td>{token.program}</td>
                  <td>{token.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
