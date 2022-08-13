import {React, useState} from 'react';
import CounProfile from '../components/profile/CounProfile';
import CounSchedulebox from '../components/schedule/CounSchedulebox'
import CounTime from '../components/schedule/CounTime'
import CounTimeUpdate from '../components/schedule/CounTimeUpdate'
import CounRequest from '../components/schedule/CounRequestbox'

function CounMyPage (){
    const [data,setData] = useState(false) //상담시간, 상담시간수정 토글
    const [confirm,setConfirm] = useState("상담목록") //승인된 상담 승인되지 않은 상담

    function changeConfirm1(){
        setConfirm("상담목록")
    }
    function changeConfirm2(){
        setConfirm("상담요청")
    }
    return (
      <div>
        <h1>마이페이지</h1>
        <CounProfile />
        <div>
            { data===false ? <CounTime setData={setData}/> : <CounTimeUpdate setData={setData}/>}
        </div>
        <button onClick={changeConfirm1}>상담목록</button>
        <button onClick={changeConfirm2}>상담요청</button>
        <div>
            { confirm==="상담목록" ? <CounSchedulebox/> : <CounRequest/>}
        </div>
        
      </div>
    )
    }
  export default CounMyPage