import React from 'react';
import { Link } from 'react-router-dom';
import styles from './counselorcard.module.css';
import StarRatings from 'react-star-ratings';
import { FaRegSadCry } from 'react-icons/fa'


const DEFAULT_IMAGE = '/images/default_logo.png';
const CounselorCard = ({card}) => {
    const {counselorId, name, shortIntroduction, price, avgScore, profile} = card;
    const url = profile || DEFAULT_IMAGE;
    console.log("상담자 디테일 페이지 url  ", url);

    return (
        <li className={styles.card}>
            <Link to= {`/counselordetail/${counselorId}`} 
            state = {{card}}>
            <img className={styles.avatar} src={url} alt ="profile photo" />
            </Link>
            <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <div className={styles.details}>
                <p className={styles.detail}>소개 : {shortIntroduction}</p>
                <p className={styles.detail}>상담비용 : {price}</p> 
                </div>
                <div className={styles.score}>
                {   avgScore ?
                    (
                    <StarRatings
                    rating={avgScore}
                    starRatedColor="hotpink"
                    numberOfStars={5}
                    name='rating'
                    starDimension='1.5rem'
                    starSpacing='2px'
                    />
                    )
                    :
                    (<div>등록된 후기가 없어요 <FaRegSadCry/></div>)
                }
                </div>
            </div>
        </li>
        
    )

};

export default CounselorCard;