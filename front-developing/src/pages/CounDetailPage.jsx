import React, {useState ,useEffect} from 'react';
import styles from './CounDetailPage.module.css';
import './CounDetailPage.module.css';
import { useLocation} from "react-router-dom";
import Tabcounselordetail from '../components/tabcounselordetail/tabcounselordetail';

const CounDetailPage = ({card}) => {

    const location = useLocation();
    useEffect(() => {
    //console.log(location);
    }, [ location ])
    const Councard = location.state.card;

// ========================================================
   
    return (
        <section >
            <div className={styles.card}>
                <img className={styles.avatar} src={Councard.fileURL} alt ="profile photo" />
                
               
            <div className={styles.info}>
                        <h1 className={styles.name}>{Councard.name}</h1>
                        <p className={styles.email}>{Councard.email}</p>
                        <p className={styles.message}>{Councard.message}</p>
                        <button className={styles.wbtn}>문의하기</button>
                </div>
            </div>
            <div className={styles.tab}>
                <Tabcounselordetail card={Councard} />
            </div>
            
        </section>
        
        
        );


};

export default CounDetailPage;