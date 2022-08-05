import React, { useEffect, useState } from 'react';
import StarScore from "../starscore/starscore";
import ReviewContent from '../reviewcontent/reviewcontent';
import axios from "axios";


function ReviewWrite() {
    const [review, setReview] = useState();
    const [star, setStar] = useState();
    const [entire, setEntire] = useState({review: '', star: 3});

    const onSetData = (data) => {
        setReview(data);

        axios.post('http://localhost:8080/api/v1/reviews', {
            score : star,
            content: review,
          })
          .then(function(result){
            alert(result.data.message);
    
          }).catch(function(err){
            alert(err);
          })
    }

    const onStarData = (data) => {
        setStar(data);
    }


  return (
    <div>
        <h1>리뷰작성 컴포넌트</h1>

        <StarScore onStarData = {onStarData}  />
        <ReviewContent onSetData={onSetData}/>
        <p> 후기 : <b>{star}  </b> <b>{review}</b></p>

  </div>
  );
}

export default ReviewWrite;

