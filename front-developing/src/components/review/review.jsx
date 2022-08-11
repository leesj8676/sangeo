
import React, {useState, useEffect} from 'react';
import styles from './review.module.css';
import axios from 'axios';

const Review = ({counselorId}) => {
  console.log(counselorId);
  const [reviewList, setreviewList] = useState("");

  useEffect(() => {
    console.log("useEffect()");
    async function fetchData() {
        try{
            const result = await axios.get(`/reviews/counselor/${counselorId}`);
            console.log(result.data);
            setreviewList(result.data);
        }
        catch(error){
            alert(error);
        }
    };
    fetchData();
},[]);

//   const reviewlist = [
//     {
//         reviewId: 1,
//         counselorId: 1,
//         counselorName: '이성진',
//         customerId: 5,
//         customerName: '동식',
//         reviewContent : '마음이 평화로워짐.',
//         starscore: 5.0,

//     },

//       {
//         reviewId:  2,
//         counselorId: 1,
//         counselorName: '이성진',
//         customerId: 6,
//         customerName: '이케마',
//         reviewContent : '굳굳ㄱ두',
//         starscore: 4.0,
        
//       },
//       {
//         reviewId: 3,
//         counselorId: 3,
//         counselorName: '인예자',
//         customerId: 5,
//         customerName: '동식',
//         reviewContent : '편안함',
//         starscore: 5.0,
        
//       },
//     {
//       reviewId: 4,
//       counselorId:4,
//       counselorName: '김준기',
//       customerId: 7,
//       customerName: '선팡기',
//       reviewContent : '시원하네요',
//       starscore: 3.5,
      
//     },
// ]

/*
let content = [];
const rc = reviewList.filter(function(view){
  return (id == view.counselorId) && (content.push(view.reviewContent));
});*/

  const returnContent = () => {
    let content = [];
    for(let i = 0; i < reviewList.length; i++){
      content.push(
        <li className={styles.review}> 
        <p>{reviewList[i].schedule.user.name}</p> 
        <p>{reviewList[i].score}</p> 
        <p>{reviewList[i].content}</p> 
        </li>
      )
    };
    return content;
  }



  return (
    <div>
      {returnContent()}
      
  </div>
  );
}

export default Review;
