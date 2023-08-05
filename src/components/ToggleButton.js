import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ children, onClick, active }) => (
  <button className={`toggle-button ${active ? 'active' : ''}`} onClick={onClick}>
    {children}
  </button>
);

export default ToggleButton;
