import React from 'react';
import { useNavigate , Link} from 'react-router-dom';
import styles from './counselorcard.module.css';


const DEFAULT_IMAGE = '/images/default_logo.png';
const CounselorCard = ({card}) => {
    console.log(card,'card')
    const {counselorId, name, email, shortIntroduction, price, avgScore, profile} = card;
    const url = profile || DEFAULT_IMAGE;
    const navigate = useNavigate();


    return (
        
        <li className={`${styles.card}`}>
            <Link to= {`/counselordetail/${counselorId}`} 
            state = {{card}}>
            <img className={styles.avatar} src={url} alt ="profile photo" />
            </Link>
            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.email}>{email}</p>
                <p className={styles.email}>가격 : {price}</p>
                <p className={styles.email}>평점 : {avgScore ? avgScore : "후기 없음"}</p>
                <p className={styles.message}>{shortIntroduction}</p>
            </div>
  
            
        </li>
        
    )

};

function getStyles(theme){
    switch(theme) {
        case 'dark':
            return styles.dark;
        case 'light':
            return styles.light;
        case 'colorful':
            return styles.colorful;
            default:
            throw new Error(`unknown theme: ${theme}`);
    }
}

export default CounselorCard;