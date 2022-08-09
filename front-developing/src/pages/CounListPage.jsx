import React from 'react';
import styles from './CounListPage.module.css';
import Footer from  '../components/footer/footer';
import CounselorList from '../components/counselorlist/counselorlist';
import Card from '../components/counselorcard/counselorcard'
import axios from 'axios';
import CounselorDetail  from './CounDetailPage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';





const CounListPage = () => {
   

    const [cards, setCards] = useState([]); //카드목록
    const [cardList, setCardList] = useState([]);
    const [sortPrice, setsortPrice] = useState(); //가격으로 정
    const [sortScore, setsortScore] = useState();

    useEffect(()=>{
        axios.get("https://i7e207.p.ssafy.io:8080/api/v1/counselors")
        .then(function (response){
            console.log(response.data,'데이터')
            setCards(response.data)} //카드에 받아온 값 넣음           
        )
        .catch(function(err){
            alert(err);
            })                  
        },[])

    useEffect(()=> {
        console.log(cards,"카드변경")
        if(cards.length > 0){setCardList(cards.map((card)=><Card props={card}/>))}}
        ,[cards])
    


    const onSortPrice = () => {
        const sortPrice = [...cards];
        setCards(sortPrice.sort((a,b) => {
            return a.price - b.price;
    }))}

    
    const onSortScore = () => {
        const sortScore = [...cards];
        setCards(sortScore.sort((a,b) => {
            return a.score - b.score;
    }))}


    return (
        <section className={styles.list}>
            
            <div className={styles.container} >
                {/* { cards ? {cardssss} : null} */}
                {/* <p className={styles.p}>
                    <button className={styles.sort} onClick={onSortPrice}>가격순</button>
                    <button className={styles.sort} onClick={onSortScore}>평점순</button>

                </p>
                    <CounselorList cards={cards}/> */}

                <p className={styles.sort}>
                    <button className={styles.btn} onClick={onSortPrice}> 가격순</button>
                    <button className={styles.btn} onClick={onSortScore}> 평점순</button>
                </p>
                {cardList}
            
            </div>

            <Footer />

        </section>
    )
}

export default CounListPage;