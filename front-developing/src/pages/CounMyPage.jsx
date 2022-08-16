import {React, useState} from 'react';
import CounProfile from '../components/profile/CounProfile';
import CounSchedulebox from '../components/schedule/CounSchedulebox'
import CounTime from '../components/schedule/CounTime'
import CounTimeUpdate from '../components/schedule/CounTimeUpdate'

function CounMyPage ({imageUploader}){
    const [data,setData] = useState(false) //상담시간, 상담시간수정 토글

    return (
      <div>
        <h2 className='text-center'>마이페이지</h2>
        <CounProfile imageUploader={imageUploader} />
        {/* <div>
            { data===false ? <CounTime setData={setData}/> : <CounTimeUpdate setData={setData}/>}
        </div> */}
        <div>
            {  <CounSchedulebox/> }
        </div>
        
      </div>
    )
    }
  export default CounMyPage