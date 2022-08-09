import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

export default function UserInfoChange(){
    //aixos로 최초정보 받음
    //보낼 폼 sendinfo
    //아이디 중복확인버튼 해당아이디를 사용하는 사람이 있는지 확인
    //회원탈퇴시 한번더 물어보기
    const URL = 'users/kimssafy'
    const [info,setInfo] = useState('')
    const [newid,setId] = useState('')
    const [newname,setName] = useState('')
    const [newphonenumber,setPhonenumber] = useState('')
    const [newprofile,setProfile] = useState('')
    const [first,setFirst] = useState(1)//최초렌더링시 입력값이 반영안되는 문제 해결
    const [cert,setCert] = useState(false) // 아이디중복 확인 
    const [msg,setMsg] = useState('') 
    const [send,setSend] = useState('')

    useEffect(()=>{
    //console.log(process.env.REACT_APP_DB_HOST//+URL)
    axios.get(process.env.REACT_APP_DB_HOST+URL)
    .then(function (response) {
            setInfo(response.data)
            setId(info.userId)
            setName(info.name)
            setPhonenumber(info.phoneNumber)
            setProfile(info.profile)
            if (first === 1){setFirst(0)}//최초렌더링시 입력값이 반영안되는 문제 해결
    })},[first])
    
    //post로 보낼 정보
    useEffect(()=>{
        setSend({//put시에 password 항목 수정 필요
            "name": `${newname}`,
            "phoneNumber": `${newphonenumber}`,
            "profile": `${newprofile}`,
            "userId": `${newid}`,
          })
          //정보변경감지
    }
    ,[newid,newname,newphonenumber,newprofile])


    //변경이 생기면 수정
    function idChange(e){
        console.log(e.target.value)
        setId(e.target.value)
        setCert(false)
    }

    function nameChange(e){
        console.log(e.target.value)
        setName(e.target.value)
        console.log(newname)
    }
    function profileChange(e){
        console.log(e.target.value)
        setProfile(e.target.value)
    }
    
    function phonenumberChange(e){
        console.log(e.target.value)
        setPhonenumber(e.target.value)
    }

    //id체크 버튼 누를시 조회
    function idCheck(){
        console.log("아이디 중복확인")
        console.log(newid)
        axios.get(process.env.REACT_APP_DB_HOST+`/${newid}`)
        .then((response)=>{console.log("있음")
                            setMsg('이미 존재하는 아이디 입니다')},
                (error)=>{
                            console.log(error.response.status)
                            if (error.response.status === 500){ //에러코드 맞나 확인 필요
                                console.log("아이디 없음")
                                setCert(true)
                                setMsg('사용 가능한 아이디 입니다')
                            }}
        )
        
    }
    //보내기
    function submitInfo(){
        if (cert===false){
            setMsg("아이디 중복확인이 필요합니다")
        }
        else { console.log("전송") }
        
    }
    return(
        <div>
            <div>회원정보 수정 페이지</div>
            <div >
                <div>
                    <div>이름</div>
                    <div>
                        <input onChange={nameChange} value={newname}/>
                    </div>
                    <div>아이디</div>
                    <div>
                        <input onChange={idChange} value={newid}/>
                        <button onClick={idCheck}>중복확인</button> 
                        <span>{msg}</span>
                    </div>
                    <div>연락처</div>
                    <div><input onChange={phonenumberChange} value={newphonenumber} /></div>    
                </div>
                <div>
                    <Link to = "">비밀번호 변경</Link>
                </div>
                <button onClick={submitInfo}>수정</button>
                <button>회원탈퇴</button>
            </div>
            
        </div>
    )
}