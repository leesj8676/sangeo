import React, {useState ,useEffect} from 'react';
import styles from './CounDetailPage.module.css';
import { useLocation} from "react-router-dom";
import Tab_counselordetail from '../components/tab_counselordetail/tab_counselordetail';

const CounDetailPage = ({card}) => {
 
    const location = useLocation();
    useEffect(() => {
    console.log(location);
    }, [ location ])
    const Councard = location.state.card;

// ========================================================
   
    return (
        <section className={styles.card}>
            <img src={Councard.fileURL} alt ="profile photo" />
            <div>
                    <h1>{Councard.name}</h1>
                    <p>{Councard.email}</p>
                    <p>{Councard.message}</p>
            </div>
     
            {/* <Tab_counselordetail/> */}
        </section>
        
        
        );


};

export default CounDetailPage;