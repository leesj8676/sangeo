import React from 'react';
import styles from './CounListPage.module.css';
import Footer from  '../components/footer/footer';
import Card from '../components/counselorcard/counselorcard'
import axios from 'axios';
import { useEffect, useState } from 'react';

const CounListPage = () => {
   
    const [cards, setCards] = useState([]); //카드목록
    const [cardList, setCardList] = useState([]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+"/counselors")
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
        if(cards.length > 0){setCardList(cards.map((card)=><Card card={card}/>))}}
        ,[cards])
    

    // 가격 오름차순 정렬    
    const onSortPrice = () => {
        const sortPrice = [...cards];
        setCards(sortPrice.sort((a,b) => {
            return a.price - b.price;
    }))}

    // 후기 오름차순 정렬    
    const onSortScore = () => {
        const sortScore = [...cards];
        setCards(sortScore.sort((a,b) => {
            return a.avgScore - b.avgScore;
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