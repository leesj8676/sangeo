
import React from 'react';
import styles from './review.module.css';

const Review = ({userId}) => {

  const id = userId;

  const reviewlist = [
    {
        reviewId: 1,
        counselorId: 1,
        counselorName: '이성진',
        customerId: 5,
        customerName: '동식',
        reviewContent : '마음이 평화로워짐.',
        starscore: 5.0,

    },

      {
        reviewId:  2,
        counselorId: 1,
        counselorName: '이성진',
        customerId: 6,
        customerName: '이케마',
        reviewContent : '굳굳ㄱ두',
        starscore: 4.0,
        
      },
      {
        reviewId: 3,
        counselorId: 3,
        counselorName: '인예자',
        customerId: 5,
        customerName: '동식',
        reviewContent : '편안함',
        starscore: 5.0,
        
      },
    {
      reviewId: 4,
      counselorId:2,
      counselorName: '김준기',
      customerId: 7,
      customerName: '선팡기',
      reviewContent : '시원하네요',
      starscore: 3.5,
      
    },
]

let content = [];
const rc = reviewlist.filter(function(view){
  return (id == view.counselorId) && (content.push(view.reviewContent));
});



  return (
    <div>
      <h1> 여기는 리뷰 컴포넌트입니다.</h1>

      {content.map(c => {
        return (<li className={styles.review}> {c} </li> )
      })}

      
  </div>
  );
}

export default Review;
