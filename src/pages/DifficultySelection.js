import React from 'react';
import Button from '../components/Button';
import './DifficultySelection.css';

const DifficultySelection = ({ onPageChange, onDifficultyChange }) => {
  const handleSelect = (difficulty) => {
    onDifficultyChange(difficulty);
    onPageChange('game');
  };

  return (
    <div className="container">
      <h2>난이도 선택</h2>
      <Button onClick={() => handleSelect(1)}>1단계</Button>
      <Button onClick={() => handleSelect(2)}>2단계</Button>
      <Button onClick={() => handleSelect(3)}>3단계</Button>
      <Button onClick={() => handleSelect(4)}>4단계</Button>
      <Button onClick={() => handleSelect(5)}>5단계</Button>
      <Button onClick={() => onPageChange('main-menu')}>돌아가기</Button>
    </div>
  );
};

export default DifficultySelection;
