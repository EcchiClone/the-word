import React from 'react';
import './Word.css';

const Word = ({ children, onClick }) => (
  <button className="word" onClick={onClick}>
    {children}
  </button>
);

export default Word;
