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
        console.log("밖  "+ card.name);
        if(cunslName === card.name){
            console.log("안  "+ card.name);
            <CunslDetail card = {card} />
            console.log("카드 컴포넌트 다음 ");
            goToDetail(card);
        }
    }

    return (
        <li>
            <img src={url} alt ="profile photo" />
            <div>
                <h1>{name}</h1>
                <p>{email}</p>
                <p>{message}</p>
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