import { Link } from "react-router-dom"
import './Conferences.css'
import axios from "axios";


export default function Conference(x,state) {
    const { id, complete, confirmed, counselorId, counselorName, endTime, startTime, userId, userName } = x.props
    console.log("test",x.props);
    let date = startTime.substring(16, 0)
    const now = new Date
    const time = new Date(startTime)
    const URL = `https://i7e207.p.ssafy.io:8080/api/v1/schedules/complete`

    function IsComplete(){
        console.log(date)
        axios.put(URL,
        {
            "counselorId": `${counselorId}`,
            "startTime": `${date}`
          })
    }
    //예정
    if (complete === false) {
        return (
            <div className="box">
                <nav>
                    <div className="state">예정</div>
                    <Link to={`../counselordetail/${userName}`}>{userName}님 상담</Link>
                    <span>{date}</span>
                    <a href="">사전질문</a>
                    <Link to={`../conference/${counselorName}`}>상담실링크</Link>
                    {time < now ? <button onClick={IsComplete}>상담완료</button> : null}
                </nav>
            </div>
        )
    }
    //완료후
    else {
        return (
            <div className="box">
                <nav>
                    <div className="state">완료</div>
                    <Link to={`../counselordetail/${userName}`}>{userName}님 상담</Link>
                    <span>{date}</span>
                    <a href="">사전질문</a>
                    <Link to={`../donecounsel/${id}`}>상담결과링크</Link>
                </nav>
            </div>
        )
    }

}
