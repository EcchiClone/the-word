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

export default MainMenu;
