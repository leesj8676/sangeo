import React from 'react';
import { useNavigate , Link} from 'react-router-dom';
import CounselorDetail from '../../pages/CounDetailPage';
import styles from './counselorcard.module.css';


const DEFAULT_IMAGE = '/images/default_logo.png';
const CounselorCard = ({card}) => {
    
    const {cardId, name, email, shortIntroduction, price, score, theme, fileName, fileURL} = card;
    const url = fileURL || DEFAULT_IMAGE;
    const navigate = useNavigate();


    return (
        
        <li className={`${styles.card}`}>
            <Link to= {`/counselordetail/${name}`} 
            state = {{card}}>
            <img className={styles.avatar} src={url} alt ="profile photo" />
            </Link>
            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.email}>{email}</p>
                <p className={styles.email}>가격 : {price}</p>
                <p className={styles.email}>평점 : {score}</p>
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