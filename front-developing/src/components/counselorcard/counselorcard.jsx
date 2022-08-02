import React from 'react';
import { useNavigate } from 'react-router-dom';
import CunslDetail from '../counselordetail/counselordetail';
import styles from './counselorcard.module.css';


const DEFAULT_IMAGE = '/images/default_logo.png';
const CounselorCard = ({card}) => {
    const navigate = useNavigate();
    const {id, name, email, message, theme, fileName, fileURL} = card;

    const url = fileURL || DEFAULT_IMAGE;

    const goToDetail = (card) => {

        navigate('/cunsldetail');
    }

    const onDetail = (event) => {
        const cunslName = event.currentTarget.textContent;
        if(cunslName === card.name){
            <CunslDetail card = {card} />

            goToDetail(card);
        }
    }


    return (
        <li className={`${styles.card}`} >
            <img className={styles.avatar} src={url} alt ="profile photo" />
            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.email}>{email}</p>
                <p className={styles.message}>{message}</p>
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