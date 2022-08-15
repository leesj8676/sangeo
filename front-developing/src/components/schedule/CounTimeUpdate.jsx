import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CounHolidayChange from './CounHolidayChange';
import CounHolidayChange2 from './CounHolidayChange2';

export default function CounTimeUpdate(data){  
    const { setData, id } = data
    const user = useSelector(state => state.user.user);
    const [info,setInfo] = useState()
    const datable = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
    const [holiday,setHoliday] = useState([false,false,false,false,false,false,false]) //일하는 요일
    const [dayoption,setDayoption] = useState(holiday.map((day,idx)=><div>
                                                                        <span>{datable[idx]}</span>
                                                                        <input onChange={changeCheck} type="checkbox" value={idx}/>
                                                                    </div>))
    const [start,setStart] = useState() // 예약 시작시간
    const [end,setEnd] = useState() // 예약 종료시간



    const URL = process.env.REACT_APP_DB_HOST+`/counselors/${user.id}` //강사정보
    
    useEffect(()=>{
        axios.get(URL)
        .then(function(response){
        setInfo(response.data)})

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

    function Submit(){
        console.log(start)
        console.log(end)
        console.log(holiday)
        let hol=''
        for (let i =0; i<7; i++){ 
            if (holiday[i] === false){hol+=`${i}/`}
        } 
        if (hol.length>1){hol=hol.slice(0,-1)}
        console.log(hol)

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
            <div>
                <CounHolidayChange/>
            </div>
            <div>
                <CounHolidayChange2/>
            </div>
            <button onClick={Submit}>제출</button>
            <button onClick={Change}>취소</button>
        </div>
    )
}