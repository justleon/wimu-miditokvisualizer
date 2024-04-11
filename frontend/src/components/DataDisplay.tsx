import React, { useState } from 'react';
import { Token, NestedList } from '../interfaces/ApiResponse';
import PianoRollBlock from './PianoRollBlock';
import TokenInfo from './TokenInfo';

interface DataDisplayProps {
  data: NestedList<Token>;
}

function isTokenArray(value: NestedList<Token>): value is Token[] {
  return Array.isArray(value) && value.every(item => (item as any).type !== undefined);
}

const chunkTokens = (tokens: Token[], size: number): Token[][] => {
  let chunks: Token[][] = [];
  for (let i = 0; i < tokens.length; i += size) {
    chunks.push(tokens.slice(i, i + size))
  }
  return chunks;
}

const RNestedList: React.FC<{
  onHover: (t: Token | null, heading: string) => void;
  list: NestedList<Token>;
  level: number;
  parentIndex: number[];
}> = ({ onHover, list, level, parentIndex }) => {
  return (
    <>
      {list.map((item, index) => {
        const currentIndex = [...parentIndex, index + 1];
        const heading = currentIndex.join('.');

        if (Array.isArray(item)) {
          if (isTokenArray(item)) {
            // Render tokens in chunks
            const chunkedTokens = chunkTokens(item, 16);
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                {chunkedTokens.map((chunk, chunkIndex) => (
                  <div key={chunkIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                    {chunk.map((token, tokenIndex) => (
                      <PianoRollBlock
                        key={tokenIndex}
                        item={token}
                        onHover={onHover}
                        heading={heading}
                      />
                    ))}
                  </div>
                ))}
              </div>
            );
          } else {
            // Handle nested recursive lists
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                <div style={{ marginRight: '5px' }}>{heading}</div>
                <RNestedList
                  onHover={onHover}
                  list={item}
                  level={level + 1}
                  parentIndex={currentIndex}
                />
              </div>
            );
          }
        } else {
          // Handle the case when item is a single Token (if ever, depending on your data structure)
          return (
            <PianoRollBlock
              key={index}
              item={item as Token}
              onHover={onHover}
              heading={heading}
            />
          );
        }
      })}
      <br />
    </>
  );
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {

  const [token, setToken] = useState<Token | null>(null);
  const [heading, setHeading] = useState<string>("");

  const updateTokenInfo = (token: Token | null, heading: string) => {
    setToken(token);
    setHeading(heading);
  }

  if (!Array.isArray(data)) {
    return <div>Invalid data</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <TokenInfo token={token} heading={heading} />
      </div>
      <div style={{ flex: 3}}>
        <RNestedList
          onHover={updateTokenInfo}
          list={data} level={0} parentIndex={[]} />
      </div>
    </div>
  );  
};

export default DataDisplay;
