import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import Conferences from './Conferences'
import axios from 'axios';
import Pagination from 'react-js-pagination';

export default function ScheduleBox (){
    //본인인경우 아니면 오류페이지로
 
    const [conference,setConference] = useState([])
    const [onoff,setOnoff] = useState("오래된")
    const [list,setList] = useState([])
    const [page, setPage] = useState(1);

    const URL = `schedules/users/${useParams().id}`
    
    const [first,setFirst] = useState(1)//최초렌더링시 입력값이 반영안되는 문제 해결

    useEffect(()=>{
    //console.log(process.env.REACT_APP_DB_HOST//+URL)
    axios.get("http://localhost:8080/api/v1/"+URL)
    .then(function (response) {
            console.log(response.data)
            setConference(conference=>response.data)
            setList(list=>conference)
            if (first === 1){setFirst(0)}//최초렌더링시 입력값이 반영안되는 문제 해결
    });    
    },[first])
    let conferenceList = list.map((x)=>(<Conferences className="conference" complete={x.complete} name={x.counselorName} date={x.startTime}/>))
    function clickButton(){
        console.log("버튼")
        setList(list.reverse())
        if (onoff === "최신순"){setOnoff(onoff=>"오래된")}
        else {setOnoff(onoff=>"최신순")}
        conferenceList = list.map((x)=>(<Conferences complete={x.complete} name={x.counselorName} date={x.startTime}/>))
    }
    function changeSee(e){
        console.log(e.target.value)
        setPage(page=>1)
        setList(list=>conference)
        if (e.target.value==="모두"){setList(list=>conference); console.log("모두", list)}
        else if (e.target.value==="완료"){setList(list=>list.filter(c => c.complete===false)); console.log("완료", list)}
        else {setList(list=>list.filter(c => c.complete===true)); console.log("예정", list)}
        console.log(list)
        conferenceList = list.map((x)=>(<Conferences complete={x.complete} name={x.counselorName} date={x.startTime}/>))
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
            <div>{conferenceList.slice((page-1)*10,(page-1)*10+10)}</div>
            <div>총 {conferenceList.length} 개</div>
        </div>
        <div>
        <Pagination
            activePage={page}//현재 페이지
            itemsCountPerPage={parseInt((conferenceList.length-1)/10)+1}
            totalItemsCount={conferenceList.length}//전체 아이템 개수
            pageRangeDisplayed={parseInt((conferenceList.length-1)/10)+1}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
            />
        </div>
      </div>
    )
    }