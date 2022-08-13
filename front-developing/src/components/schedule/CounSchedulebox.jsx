import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import CounSchedule from './CounSchedule'
import axios from 'axios';
import Pagination from 'react-js-pagination';

export default function ScheduleBox (props){
    //본인인경우 아니면 오류페이지로
    const user = useSelector(state => state.user.user);
    const [conference,setConference] = useState([]) //리스트들
    const [onoff,setOnoff] = useState("오래된")
    const [list,setList] = useState() //컨퍼런스 복사한 리스트
    const [page, setPage] = useState(1);
    const URL = `https://i7e207.p.ssafy.io:8080/api/v1/schedules/counselors/${user.id}`
    
    useEffect(()=>{
    //console.log(process.env.REACT_APP_DB_HOST//+URL)
        axios.get(URL)
        .then(function (response) {
            console.log(response.data,'data')
            setConference(response.data.filter(x=>x.confirmed===true))
            }
        )},[])
    
    useEffect(()=>{
        //console.log(process.env.REACT_APP_DB_HOST//+URL)
        setList(conference.map((x)=>(<CounSchedule props={x}/>))
        );},[conference])  
    


    function clickButton(){
        console.log("버튼")
        setList(list.reverse())
        if (onoff === "최신순"){setOnoff("오래된")}
        else {setOnoff("최신순")}
            }
    
    function changeSee(e){
        console.log(e.target.value)
        setPage(page=>1)
        if (e.target.value==="모두"){setList(conference.map((x)=>(<CounSchedule props={x}/>))); console.log("모두", list)}
        else if (e.target.value==="완료"){setList(conference.filter(c=>c.complete===true).map((x)=>(<CounSchedule props={x}/>))); console.log("완료", list)}
        else {setList(conference.filter(c=>c.complete===false).map((x)=>(<CounSchedule props={x}/>))); console.log("예정", list)}
        console.log(list)    
    } 

    const handlePageChange = page => {
        setPage(page);
        console.log(page)
      };
      

    return (
      <div>
        <label>
            <select onChange={changeSee}>
                <option value="모두">모두</option>
                <option value="완료">완료</option>
                <option value="예정">예정</option>
            </select>
        </label>
        <div>
            <button className="button" onClick={clickButton}>{onoff}</button>
            <div>{list ? list.slice((page-1)*10,(page-1)*10+10) : null }</div>
        </div>
        <div>
            {list ? <Pagination
                activePage={page}//현재 페이지
                itemsCountPerPage={parseInt((list.length-1)/10)+1}
                totalItemsCount={list.length}//전체 아이템 개수
                pageRangeDisplayed={parseInt((list.length-1)/10)+1}
                prevPageText="‹"
                nextPageText="›"
                onChange={handlePageChange}
                /> : null}
        </div>
      </div>
    )
    }