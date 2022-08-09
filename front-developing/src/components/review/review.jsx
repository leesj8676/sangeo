
import React, {useState, useEffect} from 'react';
import styles from './review.module.css';
import axios from 'axios';

const Review = ({counselorId}) => {
  const [reviewList, setreviewList] = useState("");

  useEffect(() => {
    console.log("useEffect()");
    async function fetchData() {
        try{
            const result = await axios.get(process.env.REACT_APP_DB_HOST+`/reviews/counselor/${counselorId}`);
            console.log(result.data);
            setreviewList(result.data);
        }
        catch(error){
            alert(error);
        }
    };
    fetchData();
},[]);

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
      <h1> 여기는 리뷰 컴포넌트입니다.</h1>
      {returnContent()}
      
  </div>
  );
}

export default Review;
