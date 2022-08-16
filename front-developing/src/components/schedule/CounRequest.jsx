import {React, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import styles from './Conferences.module.css';

export default function Request(x) {
    const { id, complete, confirmed, counselorId, counselorName, endTime, startTime, userId, userName, userPhoneNumber } = x.props
    console.log("test",x.props);
    let date = startTime.substring(16, 0)
    const [show,setShow] = useState({display: ''})
    

    function Approve(){
        const URL = process.env.REACT_APP_DB_HOST+'/schedules/confirm'
        axios.put(URL,{
            "counselorId": `${counselorId}`,
            "startTime": `${date}`
          }
          )
          setShow({display: 'none'})
    }
    function Refuse(){
        const URL = process.env.REACT_APP_DB_HOST+`/schedules/${counselorId}/${date}`
        axios.delete(URL)
        setShow({display: 'none'})
    }

    return (
        <div style={show} className={`row ${styles.box}`}>
            <Link to={`../counselordetail/${userName}`}>{userName} 님 요청</Link>
            <span>{date}</span>
            <span> 연락처 : { userPhoneNumber} </span>
            <button onClick={Approve}>수락</button>
            <button onClick={Refuse}>거절</button>
        </div>
    )

}
