import React, { useRef } from 'react';  // useRef 훅을 import 합니다.
import html2canvas from 'html2canvas';  // html2canvas 라이브러리를 import 합니다.
import Button from '../components/Button';
import './Result.css';

const Result = ({ onPageChange, name, targetWord, difficulty, turn }) => {
    const resultCardRef = useRef();  // 결과 컨테이너를 참조하기 위한 ref를 생성합니다.

    const handleSave = () => {
        html2canvas(resultCardRef.current).then(canvas => {
            const link = document.createElement('a');
            link.download = 'result.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    const handleShare = () => {
        window.alert('업데이트 준비중입니다');  // 경고창을 띄웁니다.
    };

    const handleRetry = () => {
        onPageChange('main-menu');
    };

    return (
        <div className="container">
            <h2>결과</h2>
            <div id="result-container" className="result-container" ref={resultCardRef}>  {/* 이 부분을 추가하세요 */}
                <div className="result-item">
                    <h3>목표 단어</h3>
                    <p>{targetWord}</p>
                </div>
                <div className="result-item">
                    <h3>난이도</h3>
                    <p>{difficulty}단계</p>
                </div>
                <div className="result-item">
                    <h3>소요 턴 수</h3>
                    <p>{turn}회</p>
                </div>
                <div className="result-item">
                    <h3>이름</h3>
                    <p>{name}</p>
                </div>
            </div>
            <div className="result-buttons">
                <Button onClick={handleSave}>저장</Button>
                <Button onClick={handleShare}>공유</Button>
                <Button onClick={() => onPageChange('main-menu')}>다시하기</Button>
            </div>
        </div>
    );
};

export default Result;
