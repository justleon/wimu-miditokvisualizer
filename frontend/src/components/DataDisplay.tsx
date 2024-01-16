import React from 'react';
import { Token, NestedList } from '../interfaces/ApiResponse';
import PianoRollBlock from './PianoRollBlock';

interface DataDisplayProps {
  data: NestedList<Token>;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
  const renderNestedList = <T extends Token>(
    list: NestedList<T>,
    level: number,
    parentIndex: number[]
  ): React.ReactNode => {  
    return (
      <>
        {list.map((item, index) => {
          const currentIndex = [...parentIndex, index + 1];
          const heading = currentIndex.join('.');
  
          return (
            <div key={index} style={{ display: 'flex', marginRight: '10px' }}>
            {Array.isArray(item) ? (
              <>
                <div style={{marginRight: '5px'}}>{heading}</div>
                {renderNestedList(item, level + 1, currentIndex)}
              </>
            ) : (
              <PianoRollBlock key={index} item={item as Token} heading={heading} />
            )}
          </div>
          );
        })}
        <br />
      </>
    );
  };  

  if (!Array.isArray(data)) {
    return <div>Invalid data</div>;
  }

  return <div>{renderNestedList(data, 0, [])}</div>;
};

export default DataDisplay;
