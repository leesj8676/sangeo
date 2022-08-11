import React, { useEffect, useState } from 'react';
import EditorBox2 from '../components/editor/editorbox2';
import axios from 'axios';
import styles from './ManageDoneCounselPage.module.css';

// 상담사가 완료된 상담에 메세지를 남기고 이미지 업로드 하는 페이지
function ManageDoneCounselPage({imageUploader}) {
    // scheduleId -> 상담사 마이페이지 구현된 후 수정, 일단은 임의로
    const scheduleId = 8;

    // // 사진 업로드 경로
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
           <h2 className='mb-3'>{counselResult.registeredResult ? "상담 결과 분석을 수정해보세요!" : "상담 결과 분석을 작성해보세요!"}</h2>
           <EditorBox2 imageUploader={imageUploader} scheduleId={scheduleId} registeredResult={counselResult.registeredResult} setCounselResult={setCounselResult}/>
            <div>
                { counselResult.registeredResult ? 
                (
                <div className = {`border border-3 mt-5 ${styles.resultBox}`}>
                    <h3 className='text-center mt-3'>상담 결과 분석</h3>
                    <img className = {styles.resultImg} src={counselResult.resultImg} alt="profile photo" /> 
                    <textarea className = {styles.text} placeholder={counselResult.resultContent} disabled/>
                </div>
                )
                : 
                (<div></div>) 
                }
            </div>
     

        </div>
    );
}

export default ManageDoneCounselPage;
