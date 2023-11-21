import React from 'react';
import { ApiResponse } from '../interfaces/ApiResponse';

const DataDisplay: React.FC<{ data: ApiResponse }> = ({ data }) => {
  const { sequences } = data;

  if (sequences && Array.isArray(sequences)) {
    return (
      <div>
        {sequences.map((sequence, sequenceIndex) => (
          <div key={sequenceIndex}>
            <h2>Sequence {sequenceIndex + 1}</h2>
            {sequence.tokens && Array.isArray(sequence.tokens) ? (
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
            ) : (
              <div>Invalid tokens</div>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Invalid sequences</div>;
  }
};

export default DataDisplay;
