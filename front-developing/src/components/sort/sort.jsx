import React from 'react';
import CounselorCard from '../counselorcard/counselorcard';
import SortPrice from './sortPrice';
import SortScore from './sortScore';
import styles from './sort.module.css';


const Sort = ({cards}) => {

    return (
    <section className={styles.sortContainer}>
        <p>정렬하기</p>
        <ul>
        <button className={styles.sort}><SortPrice /></button>
        <button className={styles.sort}><SortScore /></button>
        </ul>
        
    </section>
    )
};

export default Sort;