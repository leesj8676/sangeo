import React from 'react';
import styles from './CounListPage.module.css';
import Footer from  '../components/footer/footer';
import CounselorList from '../components/counselorlist/counselorlist';




import CounselorDetail  from './CounDetailPage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';




const CounListPage = () => {

    const [cards, setCards] = useState([
        {
            cardId: '1',
            name: '이성진',
            email: 'l010l@email.com',
            shortIntroduction : '20년간 상담했습니다.',
            llongIntroduction: '20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.',
            tel : '010-1111-1111',
            contactStartTime : 9,
            contactEndTime: 18,
            reserveStartTime : 10,
            reserveEndTime: 18,
            consultTarget: 30,
            price: 30000,
            holiday: 0, //요일 숫자형
            score: 3.0,
            theme : 'light',
            fileName : 'profile1',
            fileURL:'/images/profile_S.jpg',


        },

        {
            cardId: '2',
            name: '김준기',
            email: 'jk@email.com',
            shortIntroduction : '다양한 시각에서 분석해드려요',
            longIntroduction: '20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.',
            tel : '010-2020-2020',
            contactStartTime : 13,
            contactEndTime: 24,
            reserveStartTime : 13,
            reserveEndTime: 24,
            consultTarget: 10,
            price: 100000,
            holiday: 1, //요일 숫자형
            score: 3.0,
            theme : 'dark',
            fileName : 'profile2',
            fileURL:'/images/profile_J.jpg',

        },
        {
            cardId: '3',
            name: '인예자',
            email: 'jjja@email.com',
            shortIntroduction : '다 맞춰요',
            longIntroduction: '20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.',
            tel : '010-3333-3333',
            contactStartTime : 14,
            contactEndTime: 15,
            reserveStartTime : 14,
            reserveEndTime: 15,
            consultTarget: 20,
            price: 50000,
            holiday: 1, //요일 숫자형
            score: 4.0,
            theme : 'light',
            fileName : 'profile3',
            fileURL:'../images/profile_Y.jpg',

        },
        {
            cardId: '4',
            name: '정순지',
            email: 'sunsun@email.com',
            shortIntroduction : '그림전공입니다.',
            longIntroduction: '20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.20년간 상담했습니다.',
            tel : '010-2020-2020',
            contactStartTime : 24,
            contactEndTime: 6,
            reserveStartTime : 24,
            reserveEndTime: 6,
            consultTarget: 30,
            price: 50000,
            holiday: 1, //요일 숫자형
            score: 10.0,
            theme : 'colorful',
            fileName : 'profile4',
            fileURL:'/images/profile_M.jpg',

        },
    ]);

    
    const [sortPrice, setsortPrice] = useState();
    const onSortPrice = () => {
        const sortPrice = [...cards];
        setCards(cards=> sortPrice.sort((a,b) => {
            return a.price - b.price;
    }))}

    const [sortScore, setsortScore] = useState();
    const onSortScore = () => {
        const sortScore = [...cards];
        setCards(cards=> sortScore.sort((a,b) => {
            return a.score - b.score;
    }))}
    

    useEffect( ()=> {}, [setsortPrice]);
    useEffect( ()=> {}, [setsortScore]);

    
  
    return (
        <section className={styles.list}>
            
            <div className={styles.container} >
            <button onClick={onSortPrice}> 가격순</button>
            <button onClick={onSortScore}> 평점순</button>
            <CounselorList cards={cards}/>
            
            </div>

            <Footer />

        </section>
    )
}

export default CounListPage;