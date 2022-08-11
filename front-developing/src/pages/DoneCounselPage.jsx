
import {useParams} from 'react-router-dom'
import React, {useEffect, useState }from 'react';

import ReviewWrite from '../components/reviewWrite/reviewWrite';
import EditorViewer from '../components/editor/editorviewer';
import axios from 'axios';

// 회원이 상담완료 후, 코멘트와 그림을 다시 확인하고 리뷰를 작성하는 페이지
function DoneCounselPage() {

  const [analysis, setAnalysis] = useState();

  useEffect(()=>{
    axios.get("url")
      .then(function (response) {
           console.log(response);
           setAnalysis();
      }).catch(function (error) {
          // 오류발생시 실행
      });
      
}, []);




  return (
    <div>
      <EditorViewer content = {analysis} />
      {/* 리뷰작성 */}
      <ReviewWrite scheduleId = {useParams().scheduleNo}/>  
   </div>
  );
}

export default DoneCounselPage;
