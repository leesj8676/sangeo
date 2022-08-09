import { Link } from "react-router-dom"
import './Conferences.css'
export default function Conference(x) {
    const { id, complete, confirmed, counselorld, counselorName, endTime, startTime, userId, userName } = x.props
    console.log("test",x.props);
    let date = startTime.substring(16, 0).replace('T', ' ')
    let state
    //승인안된 강의
    if (confirmed === false) {
        return
    }
    //승인완료 강의
    else {
        //완료전
        if (complete === false) {
            return (
                <div className="box">
                    <nav>
                        <div className="state">{state}</div>
                        <Link to={`../counselordetail/${counselorName}`}>{counselorName} 상담사</Link>
                        <span>{date}</span>
                        <a href="">사전질문 연결</a>
                        <Link to={`../conference/${counselorName}`}>상담실링크</Link>
                    </nav>
                </div>
            )
        }
        //완료후
        else {
            return (
                <div className="box">
                    <nav>
                        <div className="state">{state}</div>
                        <Link to={`../counselordetail/${counselorName}`}>{counselorName} 상담사</Link>
                        <span>{date}</span>
                        <a href="">사전질문 연결</a>
                        <Link to={`../donecounsel/${id}`}>상담결과링크</Link>
                    </nav>
                </div>
            )
        }
    }

}
