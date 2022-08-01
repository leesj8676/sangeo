import React from 'react';
import styles from './counselorlist.module.css';
import CounselorCard from '../counselorcard/counselorcard';

const CounselorList = ({cards}) => (
    <section className={styles.CounselorList}>
        <h1 className={styles.title}>상담사 목록</h1>
        <ul>
        {cards.map(card => (
                <CounselorCard card={card} />
        ))}
        </ul>
    </section>
);

export default CounselorList;