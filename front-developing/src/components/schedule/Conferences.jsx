import { Link } from "react-router-dom"
import './Conferences.css'
export default function Conference(props) {
    let state = "완료"
    if (props.complete===false){
      state = "예정"
    }
    let date = props.date.substring(16,0).replace('T',' ')
    return (
      <div className = "box">
        <nav>
            <div className="state">{state}</div>
            <Link to={`../counselordetail/${props.name}`}>{props.name} 상담사</Link>
            <span>{date}</span>
            <a href="">사전질문 연결</a>
            <Link to="/conference:id">상담실링크</Link>
        </nav>
      </div>
    );
  }
