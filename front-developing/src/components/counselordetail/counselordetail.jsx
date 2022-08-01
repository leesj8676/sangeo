import React from 'react';
import styles from './counselordetail.module.css';


const CunslDetail = ({card}) => {
   
console.log("디테일 들어앋!!");
return (
    <section className={styles.card}>
        console.log("디테일 들어옴");
        <h1>{card.name}</h1>
        <h5>{card.message}</h5>
        <h5>{card.email}</h5>


    </section>);
};

export default CunslDetail;