import { Link } from "react-router-dom";
import styles from './Conferences.module.css';

export default function Conference(x) {
    const { id, complete, confirmed, counselorld, counselorName, endTime, startTime, userId, userName } = x.props;
    //console.log("test",x.props);
    let date = startTime.substring(16, 0).replace('T', ' ')+" ~ "+endTime.substring(16, 0).replace('T', ' ');
    let state = complete ? "완료" : "예정";
    //승인안된 강의
    if (confirmed === false) {
        return;
    }
    //승인완료 강의
    else {
        //완료전
        if (complete === false) {
            return (
                <div className={`row ${styles.box}`}>
                    <div className={`col-1 ${styles.state} ${styles.expected}`}>
                        <p>{state}</p>
                    </div>
                    <div className={`col-11 row ${styles.scheduleInfo}`}>
                        <div className="col-6">
                        <Link to={`../counselordetail/${counselorName}`}>{counselorName} 상담사</Link>
                        <br/>
                        {date}
                        </div>
                        <div className="col-3">
                            <a href="">사전질문 연결</a>
                        </div>
                        <div className="col-3">
                            <Link to={`../conference/${counselorName}`}>상담실링크</Link>
                        </div>
                    </div>
                </div>
            );
        }
        //완료후
        else {
            return (
                <div className={`row ${styles.box}`}>
                    <div className={`col-1 ${styles.state} ${styles.completed}`}>
                        <p>{state}</p>
                    </div>
                    <div className={`col-11 row ${styles.scheduleInfo}`}>
                        <div className="col-6">
                        <Link to={`../counselordetail/${counselorName}`}>{counselorName} 상담사</Link>
                        <br/>
                        {date}
                        </div>
                        <div className="col-3">
                            <a href="">사전질문 연결</a>
                        </div>
                        <div className="col-3">
                        <Link to={`../donecounsel/${id}`}>상담결과링크</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

}
