
import {useParams} from 'react-router-dom'
import React, {useEffect, useState }from 'react';

import ReviewWrite from '../components/reviewWrite/reviewWrite';
import axios from 'axios';

// 회원이 상담완료 후, 코멘트와 그림을 다시 확인하고 리뷰를 작성하는 페이지
function DoneCounselPage() {

  const scheduleId = useParams().scheduleNo;

  const [ counselResult, setCounselResult] = useState({
    scheduleId: '', 
    registeredResult: '',
    resultImg:'',
    resultContent: '' 
});

useEffect(() => {
    // 상담 결과 있는지 확인
    axios.get(process.env.REACT_APP_DB_HOST+`/schedules/result/${scheduleId}`)
    .then(function(result){
      console.log(result);
      setCounselResult(result.data);
    }).catch(function(err){
      console.log(err);
    });
  }, []);




  return (
    <div>
      {/* 리뷰작성 */}
      <ReviewWrite scheduleId = {scheduleId}/>  
      {/* 상담 결과 분석 조회 */}
      <div>
        { counselResult.registeredResult ? 
        (
        <div style={{width: '80%', marginLeft:'10%'}} className = {`border border-3 mt-5 `}>
            <h2 className='text-center mt-3'>상담 결과 분석</h2>
            <img style={{width: '60%', marginLeft:'20%'}} className='mt-3' src={counselResult.resultImg} alt="profile photo" /> 
            <textarea style={{width: '80%', marginLeft:'10%', resize: 'none'}} className='mt-3' placeholder={counselResult.resultContent} disabled/>
        </div>
        )
        : 
        (<div></div>) 
        }
      </div>
   </div>
  );
}

export default DoneCounselPage;
