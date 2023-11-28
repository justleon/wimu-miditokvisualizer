import React from 'react';
import { Token, NestedList } from '../interfaces/ApiResponse';

interface DataDisplayProps {
  data: NestedList<Token>;
  sample: number;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, sample}) => {
  interface Column {
    key: keyof Token;
    label: string;
  }

  const renderNestedList = <T extends Token>(list: NestedList<T>, n: number, level: number, parentIndex: number[]): React.ReactNode => {

    const slicedList = list.slice(0, n);
    const columns: Column[] = [
        { key: 'type', label: 'Type' },
        { key: 'value', label: 'Value' },
        { key: 'time', label: 'Time' },
        { key: 'program', label: 'Program' },
        { key: 'desc', label: 'Desc' },
      ];

    return (
      <div>
        {slicedList.map((item, index) => {
          const currentIndex = [...parentIndex, index + 1];
          const heading = currentIndex.join('.');

          return (
            <div key={index}>
              <strong>{heading}</strong>
              {Array.isArray(item) ? (
                renderNestedList(item, n, level + 1, currentIndex)
              ) : (
                <div>
                  {columns
                    .filter((column) => item[column.key] !== null && item[column.key] !== undefined)
                    .map((column, columnIndex, arr) => (
                      <span key={columnIndex}>
                        <strong>{column.label}:</strong> {item[column.key]}
                        {columnIndex < arr.length - 1 && ', '}
                      </span>
                    ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (!Array.isArray(data)) {
    return <div>Invalid data</div>;
  }

  return <div>{renderNestedList(data, sample, 0, [])}</div>;
};

export default DataDisplay;
