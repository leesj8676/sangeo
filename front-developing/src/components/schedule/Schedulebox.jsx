import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import Conferences from './Conferences'
import axios from 'axios';
import Pagination from 'react-js-pagination';

export default function ScheduleBox (){
    //본인인경우 아니면 오류페이지로
 
    const [conference,setConference] = useState([]) //리스트들
    const [onoff,setOnoff] = useState("오래된")
    const [list,setList] = useState([]) //컨퍼런스 복사한 리스트
    const [page, setPage] = useState(1);

    const URL = `https://i7e207.p.ssafy.io:8080/api/v1/schedules/users/${useParams().id}`
    

    useEffect(()=>{
    //console.log(process.env.REACT_APP_DB_HOST//+URL)
    axios.get(URL)
    .then(function (response) {
            console.log(response.data,'data')
            setConference(response.data)
    });    
    },[])
    
    useEffect(()=>{
        //console.log(process.env.REACT_APP_DB_HOST//+URL)
        axios.get(URL)
        .then(function (response) {
            console.log(conference,'con')
            if (conference.length>0){setList(conference.map((x)=>(<Conferences props={x}/>)))}}
        );},[conference])  
    


    function clickButton(){
        console.log("버튼")
        setList(list.reverse())
        if (onoff === "최신순"){setOnoff(onoff=>"오래된")}
        else {setOnoff(onoff=>"최신순")}
        if (conference.length>0){setList(conference.map((x)=>(<Conferences props={x}/>)))}
            }
    
    function changeSee(e){
        console.log(e.target.value)
        setPage(page=>1)
        setList(list=>conference)
        if (e.target.value==="모두"){setList(list=>conference); console.log("모두", list)}
        else if (e.target.value==="완료"){setList(list=>list.filter(c => c.complete===false)); console.log("완료", list)}
        else {setList(list=>list.filter(c => c.complete===true)); console.log("예정", list)}
        console.log(list)
        if (conference.length>0){setList(conference.map((x)=>(<Conferences props={x}/>)))}        
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
            <div>{list.slice((page-1)*10,(page-1)*10+10)}</div>
            <div>총 {list.length} 개</div>
        </div>
        <div>
        <Pagination
            activePage={page}//현재 페이지
            itemsCountPerPage={parseInt((list.length-1)/10)+1}
            totalItemsCount={list.length}//전체 아이템 개수
            pageRangeDisplayed={parseInt((list.length-1)/10)+1}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
            />
        </div>
      </div>
    )
    }