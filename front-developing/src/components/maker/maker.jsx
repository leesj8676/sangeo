import React from 'react';
import styles from './maker.module.css';
import Header from '../header/header';
import Footer from  '../footer/footer';
import CounselorList from '../counselorlist/counselorlist';
import CounselorDetail  from '../counselordetail/counselordetail';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';




const Maker = ({authService}) => {

    const [cards, setCards] = useState([
        {
            id: '1',
            name: '이성진',
            email: 'l010l@email.com',
            message : '20년간 상담했습니다.',
            theme : 'light',
            fileName : 'profile1',
            fileURL:'/images/profile_S.jpg',

        },

        {
            id: '2',
            name: '김준기',
            email: 'jk@email.com',
            message : '다양한 시각에서 분석해드려요',
            theme : 'dark',
            fileName : 'profile2',
            fileURL:'/images/profile_J.jpg',

        },
        {
            id: '3',
            name: '인예자',
            email: 'jjja@email.com',
            message : '다 맞춰요',
            theme : 'light',
            fileName : 'profile3',
            fileURL:'../images/profile_Y.jpg',

        },
        {
            id: '4',
            name: '정순지',
            email: 'sunsun@email.com',
            message : '그림전공입니다.',
            theme : 'dark',
            fileName : 'profile4',
            fileURL:'/images/profile_M.jpg',

        },
    ]);
    const navigate = new useNavigate();
    const onLogout = () => {
        authService.logout();
    }


    useEffect(() => {
        authService
        .onAuthChange(user => {
            if(!user){
                navigate('/');
            }
        })
    })



    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container} >
                <CounselorList cards={cards}/>
            
            </div>

            <Footer />

        </section>
    )
}

export default Maker;