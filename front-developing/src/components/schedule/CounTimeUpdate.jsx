import React, { useState,useEffect } from 'react';
import axios from 'axios';


export default function CounTimeUpdate(data){
    const month1 = ('0' + (new Date().getMonth()+1)).slice(-2)
    const month2 = ('0' + (new Date().getMonth()+2)).slice(-2)
    const year = new Date().getFullYear()   
    const { setData, id } = data
    const [info,setInfo] = useState()
    const datable = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
    const [holiday,setHoliday] = useState([false,false,false,false,false,false,false]) //일하는 요일
    const [holidays1,setHolidays1] = useState() //이번달 쉬는날
    const [holidays2,setHolidays2] = useState() //다음달 쉬는날
    const [dayoption,setDayoption] = useState(holiday.map((day,idx)=><div>
                                                                        <span>{datable[idx]}</span>
                                                                        <input onChange={changeCheck} type="checkbox" value={idx}/>
                                                                    </div>))
    const [start,setStart] = useState() // 예약 시작시간
    const [end,setEnd] = useState() // 예약 종료시간



    const URL = `https://i7e207.p.ssafy.io:8080/api/v1/counselors/${id}` //강사정보
    const URLT = `https://i7e207.p.ssafy.io:8080/api/v1/schedules/counselors/holidays/${id}/${year}-${month1}` //휴일정보 이번달
    const URLN = `https://i7e207.p.ssafy.io:8080/api/v1/schedules/counselors/holidays/${id}/${year}-${month2}` //휴일정보 다음달
    
    useEffect(()=>{
        axios.get(URL)
        .then(function(response){
        setInfo(response.data)
        axios.get(URLT)
        .then(function(response){
            console.log(response.data,'8월')
            setHolidays1(response.data.map((x)=><button value={x.holiday} onClick={holidayDelete}>{x.holiday}일 X</button>))
        })
        axios.get(URLN)
        .then(function(response){
            console.log(response.data,'9월')
            setHolidays2(response.data.map((x)=>x.holiday))
        })
    })
    },[])

    useEffect(()=>{
        if (info){
        setStart(info.reserveStartTime)
        setEnd(info.reserveEndTime)
        let a = [false,false,false,false,false,false,false]
        for (let i=0; i<7; i++){
            if(info.holiday.includes(`${i}`)){a[i]=false}
            else{
                a[i]=true}
                }
        setHoliday(a)
        console.log(holiday,'할리데이1')
        }        
        
    },[info])

    useEffect(()=>{
        setDayoption(datable.map((day,idx)=><div>
                                            <span>{datable[idx]}</span>
                                            { holiday[idx] ?
                                            <input onChange={changeCheck} type="checkbox" checked value={idx}/>
                                            : <input onChange={changeCheck} type="checkbox" value={idx}/>
                                            }
                                            </div>))
    },[holiday])

    useEffect(()=>{
        }
    ,[holidays1,holidays2])


    const timetable = []
    for (let i=0; i<49; i++){timetable[i]=`${('0'+parseInt(i/2)).slice(-2)}:${i%2 ? '30':'00'}`}

    
    const timestartoption = timetable.map((time)=><option value={time}>{time}</option>) 

    function Change(){
        setData(false)
    }

    function changeStart(e){
        setStart(e.target.value)
    }
    function changeEnd(e){
        setEnd(e.target.value)
    }
    function changeCheck(e){
        console.log(e.target.value)
        let tmp = holiday
        tmp[e.target.value] = !holiday[e.target.value]
        setHoliday(tmp)
        setDayoption(datable.map((day,idx)=><div>
                                            <span>{datable[idx]}</span>
                                            { holiday[idx] ?
                                            <input onChange={changeCheck} type="checkbox" checked value={idx}/>
                                            : <input onChange={changeCheck} type="checkbox" value={idx}/>
                                            }
                                            </div>))
    }

    function holidayDelete(e){
        console.log(e.target,'eeeeee')
        let tmp = holidays1
        
        setHolidays1(holidays1.delete(e.target))
    }


    function Submit(){
        console.log(start)
        console.log(end)
        console.log(holiday)
        let hol=''
        for (let i =0; i<7; i++){ 
            if (holiday[i] === false){hol+=`${i}/`}
        } 
        console.log(hol)
        console.log(holidays1.map((holiday)=>holiday.props.value))
        console.log(holidays2.map((holiday)=>holiday.props.value))
        axios.put()

    }


    return (
        <div>
            <div>일정 수정</div>
            <div>
                <div>상담가능시간</div>
                <label>
                    <select onChange={changeStart}>
                        {timestartoption}
                    </select>
                    <span>~</span>
                    <select onChange={changeEnd}>
                        {timestartoption}
                    </select>
                </label>
            </div>           
            <div>상담가능요일</div>
            <div>               
                {dayoption}
            </div>
            <div>휴일</div>
            <div>{month1}월 : {holidays1}</div>
            <div>{month2}월 : {holidays2}</div>
            <button onClick={Submit}>제출</button>
            <button onClick={Change}>취소</button>
        </div>
    )
}