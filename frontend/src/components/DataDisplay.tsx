import React, { useState } from 'react';
import { Token, NestedList, Note } from '../interfaces/ApiResponse';
import TokenBlock from './TokenBlock';
import TokenInfo from './TokenInfo';

interface DataDisplayProps {
  data: NestedList<Token>;
  hoveredNote: Note | null;
  selectedNote: Note | null;
  onTokenHover: (token: Token | null) => void;
  onTokenSelect: (token: Token | null) => void;
  hoveredToken: Token | null;
  selectedToken: Token | null;
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
  onSelect: (t: Token | null) => void;
  list: NestedList<Token>;
  level: number;
  parentIndex: number[];
  hoveredNote: Note | null;
  selectedNote: Note | null;
  hoveredToken: Token | null;
  selectedToken: Token | null;
}> = ({ onHover, onSelect, list, level, parentIndex, hoveredNote, selectedNote, hoveredToken, selectedToken }) => {
  return (
    <>
      {list.map((item, index) => {
        const currentIndex = [...parentIndex, index + 1];
        const heading = currentIndex.join('.');

        if (Array.isArray(item)) {
          if (isTokenArray(item)) {
            // Render tokens in chunks
            const chunkedTokens = chunkTokens(item, 12);
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                {chunkedTokens.map((chunk, chunkIndex) => (
                  <div key={chunkIndex} style={{ display: 'flex', flexDirection: 'row' }}>
                    {chunk.map((token, tokenIndex) => (
                      <TokenBlock
                        key={tokenIndex}
                        item={token}
                        onHover={onHover}
                        onSelect={onSelect}
                        heading={heading}
                        highlight={
                          (hoveredNote && token.note_id === hoveredNote.start + ':' + hoveredNote.pitch) ||
                          (hoveredToken && hoveredToken.note_id !== null && token.note_id === hoveredToken.note_id)
                        }
                        selected={
                          (selectedNote && token.note_id === selectedNote.start + ':' + selectedNote.pitch) ||
                          (selectedToken && token.note_id === selectedToken.note_id)
                        }
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
                  onSelect={onSelect}
                  list={item}
                  level={level + 1}
                  parentIndex={currentIndex}
                  hoveredNote={hoveredNote}
                  selectedNote={selectedNote}
                  hoveredToken={hoveredToken}
                  selectedToken={selectedToken}
                />
              </div>
            );
          }
        } else {
          // Handle the case when item is a single Token (if ever, depending on your data structure)
          return (
            <TokenBlock
              key={index}
              item={item as Token}
              onHover={onHover}
              onSelect={onSelect}
              heading={heading}
              highlight={
                (hoveredNote && item.note_id === hoveredNote.start + ':' + hoveredNote.pitch) ||
                (hoveredToken && hoveredToken.note_id !== null && item.note_id === hoveredToken.note_id)
              }
              selected={
                (selectedNote && item.note_id === selectedNote.start + ':' + selectedNote.pitch) ||
                (selectedToken && item.note_id === selectedToken.note_id)
              }
            />
          );
        }
      })}
      <br />
    </>
  );
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, hoveredNote, selectedNote, hoveredToken, selectedToken, onTokenHover, onTokenSelect }) => {
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
          onHover={(token, heading) => {
            onTokenHover(token);
            updateTokenInfo(token, heading);
          }}
          onSelect={onTokenSelect}
          list={data}
          level={0}
          parentIndex={[]}
          hoveredNote={hoveredNote}
          selectedNote={selectedNote}
          hoveredToken={hoveredToken}
          selectedToken={selectedToken}/>
      </div>
    </div>
  );  
};

export default DataDisplay;
