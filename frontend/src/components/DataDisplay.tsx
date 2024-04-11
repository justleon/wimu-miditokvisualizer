import React, { useState } from 'react';
import { Token, NestedList } from '../interfaces/ApiResponse';
import PianoRollBlock from './PianoRollBlock';
import TokenInfo from './TokenInfo';

interface DataDisplayProps {
  data: NestedList<Token>;
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

        return (
          <div key={index} style={{ display: 'flex', marginRight: '10px' }}>
            {Array.isArray(item) ? (
              <>
                <div style={{ marginRight: '5px' }}>{heading}</div>
                <RNestedList
                  onHover={onHover}
                  list={item} level={level + 1} parentIndex={currentIndex} />
              </>
            ) : (
              <PianoRollBlock
                onHover={onHover}
                key={index} item={item as Token} heading={heading} />
            )}
          </div>
        );
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

  return <div>
    <TokenInfo token={token} heading={heading} />
    <RNestedList
      onHover={updateTokenInfo}
      list={data} level={0} parentIndex={[]} />
  </div>;
};

export default DataDisplay;
