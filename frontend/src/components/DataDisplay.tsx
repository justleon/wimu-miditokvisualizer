import React from 'react';
import { Token, NestedList } from '../interfaces/ApiResponse';
import PianoRollBlock from './PianoRollBlock';

interface DataDisplayProps {
  data: NestedList<Token>;
  sample: number;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, sample }) => {
  const renderNestedList = <T extends Token>(
    list: NestedList<T>,
    n: number,
    level: number,
    parentIndex: number[]
  ): React.ReactNode => {
    const slicedList = list.slice(0, n);
  
    return (
      <>
        {slicedList.map((item, index) => {
          const currentIndex = [...parentIndex, index + 1];
          const heading = currentIndex.join('.');
  
          return (
            <div key={index} style={{ display: 'flex', marginRight: '10px' }}>
            {Array.isArray(item) ? (
              <>
                <div>{heading}</div>
                {renderNestedList(item, n, level + 1, currentIndex)}
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

  return <div>{renderNestedList(data, sample, 0, [])}</div>;
};

export default DataDisplay;
