import React, { useState } from 'react';
import ReactSlider from 'react-slider';

interface SingleValueSliderProps {
  onValueChange: (newValue: number) => void;
}

const SingleValueSlider: React.FC<SingleValueSliderProps> = ({ onValueChange }) => {
  const [value, setValue] = useState(32);

  const handleSliderChange = (newValue: number) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div style={{ width: '300px', height: '40px' }}>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={value}
        ariaLabel="Slider thumb"
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        min={0}
        max={100}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default SingleValueSlider;
