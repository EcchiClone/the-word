import React from 'react';
import './Toggle.css';

const Toggle = ({ options, onChange }) => (
  <div className="toggle">
    {options.map((option, index) => (
      <button key={index} onClick={() => onChange(option)}>
        {option}
      </button>
    ))}
  </div>
);

export default Toggle;
