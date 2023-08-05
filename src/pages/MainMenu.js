import React from 'react';
import Button from '../components/Button';
import './MainMenu.css';

const MainMenu = ({ onPageChange }) => {
  const handleRankCheck = () => {
    alert('업데이트 준비중입니다');
  };

  return (
    <div className="container">
      <h2>메인 메뉴</h2>
      <Button onClick={() => onPageChange('difficulty-selection')}>시작하기</Button>
      <Button onClick={handleRankCheck}>순위확인</Button>
      <Button onClick={() => onPageChange('login')}>돌아가기</Button>
    </div>
  );
};

export default MainMenu;
