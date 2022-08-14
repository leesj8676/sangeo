import {React, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
export default function Request(x) {
    const { id, complete, confirmed, counselorId, counselorName, endTime, startTime, userId, userName } = x.props
    console.log("test",x.props);
    let date = startTime.substring(16, 0)
    const [show,setShow] = useState({display: ''})
    

    function Approve(){
        const URL = 'https://i7e207.p.ssafy.io:8080/api/v1/schedules/confirm'
        axios.put(URL,{
            "counselorId": `${counselorId}`,
            "startTime": `${date}`
          }
          )
          setShow({display: 'none'})
    }
    function Refuse(){
        const URL = `https://i7e207.p.ssafy.io:8080/api/v1/schedules/${counselorId}/${date}`
        axios.delete(URL)
        setShow({display: 'none'})
    }

    return (
        <div style={show} className="box">
            <Link to={`../counselordetail/${userName}`}>{userName} 님 요청</Link>
            <span>{date}</span>
            <button onClick={Approve}>수락</button>
            <button onClick={Refuse}>거절</button>
        </div>
    )

}
