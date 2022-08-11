import React from 'react';
import styles from './CounListPage.module.css';
import Footer from  '../components/footer/footer';
import CounselorList from '../components/counselorlist/counselorlist';
import axios from 'axios';



import CounselorDetail  from './CounDetailPage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';





const CounListPage = () => {
   

    const [cards, setCards] = useState();

    const getCounList = () => {
        console.log("ccccc")
        axios.get("/counselors")
          .then((list) => {
            setCards(list.data)
          }
          ).catch(function(err){
            alert(err);
          })
      
    }

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
    useEffect(getCounList, []);
    
    useEffect(() => {
console.log("card",cards)
    }, [cards])

    
  
    return (
        <section className={styles.list}>
            
            <div className={styles.container} >
                {/* <p className={styles.p}>
                    <button className={styles.sort} onClick={onSortPrice}>가격순</button>
                    <button className={styles.sort} onClick={onSortScore}>평점순</button>

                </p>
                    <CounselorList cards={cards}/> */}

                <p className={styles.sort}>
                    <button className={styles.btn} onClick={onSortPrice}> 가격순</button>
                    <button className={styles.btn} onClick={onSortScore}> 평점순</button>
                </p>
            
            <CounselorList cards={cards}/>
            
            </div>

            <Footer />

        </section>
    )
}

export default CounListPage;