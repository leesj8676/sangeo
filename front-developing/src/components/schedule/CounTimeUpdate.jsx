import React, { useState } from 'react';

export default function CounTimeUpdate(data){
    console.log(data)
    const { setData } = data
    function Change(){
        setData(false)
    }
    return(
        <div>
            <div>상담가능 시간 수정</div>
            <div>월요일</div>
            <button onClick={Change}>제출</button>
            <button onClick={Change}>취소</button>
        </div>
    )
}