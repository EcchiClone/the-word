import React, { useRef } from 'react';  // useRef 훅을 import 합니다.
import html2canvas from 'html2canvas';  // html2canvas 라이브러리를 import 합니다.
import Button from '../components/Button';
import './Result.css';

const Result = ({ onPageChange, name, targetWord, difficulty, turn }) => {
    const resultCardRef = useRef();  // 결과 컨테이너를 참조하기 위한 ref를 생성합니다.

    const handleSave = () => {
        const padding = {top: 100, left: 70, right: 70, bottom: 70};
        const cornerRadius = 10;
    
        html2canvas(resultCardRef.current).then(originalCanvas => {
            const originalWidth = originalCanvas.width;
            const originalHeight = originalCanvas.height;
    
            // Create a new canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            // Set the dimensions of the new canvas
            canvas.width = originalWidth + padding.left + padding.right;
            canvas.height = originalHeight + padding.top + padding.bottom;
    
            // Draw the background image onto the new canvas
            const image = new Image();
            image.onload = () => {
                // Calculate the scale for the image to fill the canvas while maintaining aspect ratio
                const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
                const x = (canvas.width - image.width * scale) / 2;
                const y = (canvas.height - image.height * scale) / 2;
    
                // Draw the image onto the canvas
                ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    
                // Set the opacity for the result content box
                ctx.globalAlpha = 0.7;
    
                // Draw a larger rectangle with rounded corners for the result content
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(padding.left - 20 + cornerRadius, padding.top - 20);
                ctx.lineTo(padding.left - 20 + originalWidth + 40 - cornerRadius, padding.top - 20);
                ctx.quadraticCurveTo(padding.left - 20 + originalWidth + 40, padding.top - 20, padding.left - 20 + originalWidth + 40, padding.top - 20 + cornerRadius);
                ctx.lineTo(padding.left - 20 + originalWidth + 40, padding.top - 20 + originalHeight + 40 - cornerRadius);
                ctx.quadraticCurveTo(padding.left - 20 + originalWidth + 40, padding.top - 20 + originalHeight + 40, padding.left - 20 + originalWidth + 40 - cornerRadius, padding.top - 20 + originalHeight + 40);
                ctx.lineTo(padding.left - 20 + cornerRadius, padding.top - 20 + originalHeight + 40);
                ctx.quadraticCurveTo(padding.left - 20, padding.top - 20 + originalHeight + 40, padding.left - 20, padding.top - 20 + originalHeight + 40 - cornerRadius);
                ctx.lineTo(padding.left - 20, padding.top - 20 + cornerRadius);
                ctx.quadraticCurveTo(padding.left - 20, padding.top - 20, padding.left - 20 + cornerRadius, padding.top - 20);
                ctx.closePath();
                ctx.fill();
    
                // Set the opacity back to 1 for the original canvas and the text
                ctx.globalAlpha = 1.0;
    
                // Draw the original canvas onto the new canvas
                ctx.drawImage(originalCanvas, padding.left, padding.top);
    
                // Draw the text onto the new canvas
                ctx.font = 'bold 28px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'black';
                ctx.fillText('결과', canvas.width / 2, 60);
    
                const link = document.createElement('a');
                link.download = 'result.png';
                link.href = canvas.toDataURL();
                link.click();
            };
            image.src = '/background.png';
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
            <div className="kakao-ad">
                <ins class="kakao_ad_area" style={{display:"none"}}
                    data-ad-unit="DAN-Z9n1dd3BJfyJWaL7"
                    data-ad-width="320"
                    data-ad-height="100"></ins>
                <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
            </div>
        </div>
    );
};

export default Result;
