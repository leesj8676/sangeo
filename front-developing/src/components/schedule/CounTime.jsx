import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function CounTime(data){

    const { setData, id } = data
    const [info,setInfo] = useState()
    const URL = `https://i7e207.p.ssafy.io:8080/api/v1/counselors/${id}`
    useEffect(()=>{
        axios.get(URL)
        .then(function(response){
        console.log(response.data,'dddd')
        setInfo(response.data)
    })
    },[])
    
    useEffect(()=>{
    },[info])

    function Change(){
        setData(true)
    }
    return(
        <div>
            <div>상담가능 시간 : {info ? `${info.reserveStartTime.slice(0,5)}~${info.reserveEndTime.slice(0,5)}` : null}</div>
            <div>휴식시간 : {info ? `${info}`:null}</div>
            <div>상담요일</div>
            <button onClick={Change}>수정</button>
        </div>
    )
}