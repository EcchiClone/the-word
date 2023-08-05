import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Loader from '../components/Loader';
import WordButton from '../components/WordButton';
import ToggleButton from '../components/ToggleButton';
import './Game.css';

const Game = ({ difficulty, onPageChange, onTargetWordChange, onTurnChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [targetWord, setTargetWord] = useState('');  // 목표 단어
    const [turn, setTurn] = useState(1);
    const [candidateWords, setCandidateWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState('');
    const [toggle, setToggle] = useState(0);

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    function createMsg(word, num, rel) {
        let msg = "";  // 'let'을 추가하여 msg 변수를 선언합니다.

        if (rel == 0) {
            msg += `Output ${num} random two- or three-letter Korean words unrelated to '${word}'. Output separated by commas like the output template as in the example.\nExamples: 옷장, 영화, 장마철\nIt's OK even if you don't print very easy words.\nAnswer only the output.\nAlways output in the format of the Example and exclusively provide words in Korean, not in English.`;
        }
        else if (rel == 1) {
            msg += `Output ${num} random two- or three-letter Korean words that have a non-low relationship with '${word}'. Output separated by commas like the output template as in the example.\nExamples: 옷장, 영화, 장마철\nIt's OK even if you don't print very easy words.\nAnswer only the output.\nAlways output in the format of the Example and exclusively provide words in Korean, not in English.`;
        }
        else if (rel == 2) {
            msg += `Output ${num} random two- or three-letter Korean words that are highly related to '${word}'. Output separated by commas like the output template as in the example.\nExamples: 옷장, 영화, 장마철\nIt's OK even if you don't print very easy words.\nAnswer only the output.\nAlways output in the format of the Example and exclusively provide words in Korean, not in English.`;
        }
        return msg;
    }

    const fetchTargetWord = async () => {
        setIsLoading(true);

        while (true) {
            const chatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content:
                            "Output 5 random two- or three-letter Korean words separated by commas as in the example.\nExamples: 공항, 김치, 산맥, 물고기, 컴퓨터\nIt's OK even if you don't print very easy words.\nAnswer only the output.\nAlways output in the format of the Example and exclusively provide words in Korean, not in English.",
                    },
                ],
            });

            const answers = chatCompletion.data.choices[0].message.content;
            console.log(answers);
            let answersList = answers.split(", ");
            answersList = answersList.filter((word) => word.length >= 2 && word.length <= 3 && !(/[a-zA-Z]/.test(word)));

            if (answersList.length > 0) {
                const answer = answersList[Math.floor(Math.random() * answersList.length)];
                setTargetWord(answer);
                onTargetWordChange(answer);  // 목표 단어를 App.js에 전달합니다.
                break;
            }
        }

        setIsLoading(false);
    };

    const startGame = async () => {
        setIsLoading(true);

        while (true) {
            const mymsg = createMsg(targetWord, (6 - difficulty) * 3, 0);

            const chatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: mymsg,
                    },
                ],
            });

            const answers = chatCompletion.data.choices[0].message.content;
            console.log(mymsg);
            console.log(answers);
            let answersList = answers.split(", ");
            answersList = answersList.filter((word) => word.length >= 2 && word.length <= 3 && !(/[a-zA-Z]/.test(word)));

            if (answersList.length > 0) {
                setCandidateWords(answersList);
                break;
            }
        }

        setIsLoading(false);
    };


    const fetchNewWords = async (selectedWord, relationship) => {
        if (selectedWord === targetWord) {
            onPageChange('result');
            return;
        }

        let mymsg, answers, answersList;
        while (true) {  // 추가된 코드: 반복문을 사용하여 API 요청을 보냅니다.
            setIsLoading(true);
            onTurnChange(turn + 1);

            console.log(relationship);
            mymsg = createMsg(selectedWord, (6 - difficulty) * 3, relationship);

            const chatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: mymsg,
                    },
                ],
            });

            answers = chatCompletion.data.choices[0].message.content;
            console.log(mymsg);
            console.log(answers);
            answersList = answers.split(", ");
            answersList = answersList.filter((word) => word.length >= 2 && word.length <= 3 && !(/[a-zA-Z]/.test(word)));

            if (answersList.length > 0) {  // 추가된 코드: 반환된 단어가 있으면 반복문을 종료합니다.
                break;
            }
        }

        setCandidateWords(answersList);
        setTurn(turn + 1);  // 턴 수를 업데이트합니다.
        setIsLoading(false);
    };

    const handleToggle = (value) => {
        setToggle(value);
    };

    useEffect(() => {
        fetchTargetWord();
    }, []);

    return (
        <div className="container">
            <h2>게임</h2>
            <h3>목표 단어 : {targetWord}</h3>
            <h3>현재 턴 수 : {turn}</h3>
            {isLoading ? <Loader /> : (
                <>
                    {candidateWords.length === 0 ? (
                        <Button onClick={startGame}>게임 시작</Button>
                    ) : (
                        <>
                            <div className="word-buttons">
                                {candidateWords.map((word, idx) =>
                                    <WordButton key={idx} onClick={() => fetchNewWords(word, toggle)}>{word}</WordButton>
                                )}
                            </div>

                            <div className="toggle-buttons">
                                <ToggleButton onClick={() => handleToggle(0)} active={toggle === 0}>관련 없음</ToggleButton>
                                <ToggleButton onClick={() => handleToggle(1)} active={toggle === 1}>관련 있음</ToggleButton>
                                <ToggleButton onClick={() => handleToggle(2)} active={toggle === 2}>유사함</ToggleButton>
                            </div>
                        </>
                    )}
                </>
            )}
            <Button onClick={() => onPageChange('difficulty-selection')}>난이도 선택으로 돌아가기</Button>
        </div>
    );
};

export default Game;