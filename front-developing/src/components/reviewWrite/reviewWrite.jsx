import React, { useEffect, useState } from 'react';
import StarScore from "../starscore/starscore";
import ReviewContent from '../reviewcontent/reviewcontent';
import axios from "axios";


function ReviewWrite({scheduleId}) {
    const [review, setReview] = useState();
    const [star, setStar] = useState();

    const onSetData = (data) => {
        setReview(data);
    }

    const onStarData = (data) => {
        setStar(data);
    }

    const onSubmit = () => {
        console.log(scheduleId+" "+star+" "+review);
        axios.post('/reviews', {
            scheduleId : scheduleId,
            score : star,
            content: review,
          })
          .then(function(result){
            console.log(result);
            alert("후기가 작성되었습니다!");
          }).catch(function(err){
            alert(err);
          })
      }

  return (
    <div>
        <h1>리뷰작성 컴포넌트</h1>

        <StarScore onStarData = {onStarData}  />
        <ReviewContent onSetData={onSetData}/>
        <button onClick = {onSubmit}> 작성완료 </button>
        <p> 후기 : <b>{star}  </b> <b>{review}</b></p>

  </div>
  );
}

export default ReviewWrite;

