import React, { useState } from 'react';
import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
import DifficultySelection from './pages/DifficultySelection';
import Game from './pages/Game';
import Result from './pages/Result';
import './App.css';

const App = () => {
  const [page, setPage] = useState('login');
  const [difficulty, setDifficulty] = useState(1);
  const [username, setUsername] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [turn, setTurn] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };

  const appStyle = {  // Add this
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: `url(${process.env.PUBLIC_URL}/background.png) no-repeat center center fixed`,
    backgroundSize: 'cover'
  };

  return (
    <div className="App" style={appStyle}> 
      {page === 'login' && <Login onPageChange={handlePageChange} onUsernameChange={handleUsernameChange} />}
      {page === 'main-menu' && <MainMenu onPageChange={handlePageChange} username={username} />}
      {page === 'difficulty-selection' && <DifficultySelection onPageChange={handlePageChange} onDifficultyChange={handleDifficultyChange} />}
      {page === 'game' && <Game difficulty={difficulty} onPageChange={handlePageChange} onTargetWordChange={setTargetWord} onTurnChange={setTurn} />}
      {page === 'result' && <Result onPageChange={handlePageChange} name={username} targetWord={targetWord} difficulty={difficulty} turn={turn} />}
    </div>
  );
};

export default App;  // 이 부분을 추가해주세요.
