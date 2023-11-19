import React, { useState } from 'react';
import ReactSlider from 'react-slider';

interface RangeSliderProps {
  onRangeChange: (newValues: number[]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ onRangeChange }) => {
  const [values, setValues] = useState([21, 109]);

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setValues(newValues);
      onRangeChange(newValues);
    }
  };

  return (
    <div style={{ width: '300px', height: '40px' }}>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={values}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={10}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default RangeSlider;
