import React from 'react';
import './WordButton.css';

const WordButton = ({ children, onClick }) => (
  <button className="word-button" onClick={onClick}>
    {children}
  </button>
);

export default WordButton;
