import React, { useState } from 'react';
import ReactSlider from 'react-slider';

interface SingleValueSliderProps {
  onValueChange: (newValue: number) => void;
  initialValue: number;
  limits: number[];
}

const SingleValueSlider: React.FC<SingleValueSliderProps> = ({ onValueChange, initialValue, limits }) => {
  const [value, setValue] = useState(initialValue);

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
        min={limits[0]}
        max={limits[1]}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default SingleValueSlider;
