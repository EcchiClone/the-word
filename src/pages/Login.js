import React, { useState } from 'react';
import Button from '../components/Button';
import './Login.css';

const Login = ({ onPageChange, onUsernameChange }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleInputSubmit = () => {
    const trimmedInput = input.trim();
    if (trimmedInput === '') {
      alert('올바른 이름을 적어주세요');
    } else {
      onUsernameChange(trimmedInput);
      onPageChange('main-menu');
      alert(`${trimmedInput}님, 환영합니다!`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <div className="container">
      <h2>로그인</h2>
      <input type="text" value={input} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="이름을 입력하세요" maxLength="12" />
      <Button onClick={handleInputSubmit}>확인</Button>
    </div>
  );
};

export default Login;
