import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../../pages/UserInfoChangePage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export default function UserBasicChange(){
    //aixos로 최초정보 받음
    //보낼 폼 sendinfo
    //아이디 중복확인버튼 해당아이디를 사용하는 사람이 있는지 확인
    //회원탈퇴시 한번더 물어보기
    const URL = '/users/me';
    const [info,setInfo] = useState('');
    const [id,setId] = useState('');
    const [newname,setName] = useState('');
    const [newphonenumber,setPhonenumber] = useState('');
    const [newprofile,setProfile] = useState('');
    const [first,setFirst] = useState(1); //최초렌더링시 입력값이 반영안되는 문제 해결

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
    axios.get(process.env.REACT_APP_DB_HOST+URL)
    .then(function (response) {
            setInfo(response.data)
            setId(info.userId)
            setName(info.name)
            setPhonenumber(info.phoneNumber)
            setProfile(info.profile)
            if (first === 1){setFirst(0)}//최초렌더링시 입력값이 반영안되는 문제 해결
    })},[first]);

    function nameChange(e){
        setName(e.target.value);
    }

    function profileChange(e){
        setProfile(e.target.value);
    }
    
    function phonenumberChange(e){
        setPhonenumber(e.target.value);
    }

    // 회원정보 수정
    function onClickUpdate(){
        axios.put(process.env.REACT_APP_DB_HOST+'/users', {
            name: newname,
            phoneNumber: newphonenumber,
            profile: newprofile,
            userId: id
        })
          .then(function(result){
            alert("정보가 수정되었습니다!");
          }).catch(function(err){
            alert(err);
          });
    }

    // 회원 탈퇴
    function onClickDelete(){
        const password = prompt("탈퇴를 위해 비밀번호를 입력해주세요.");
        if(password){
            axios.post(process.env.REACT_APP_DB_HOST+`/users/${id}`, {
                password: password
            })
            .then(function(result){
                console.log(result);
                // 비밀번호 일치 확인 후 회원 탈퇴
                axios.delete(process.env.REACT_APP_DB_HOST+`/users/${id}`)
                    .then(function(result){
                    // 로그아웃 처리
                    localStorage.removeItem("Authorization");
                    setAuthorizationToken(null);
                    dispatch({type:'LOG_OUT'});
                    alert("탈퇴되었습니다!");
                    navigate('/');
                }).catch(function(err){
                    alert(err);
                });
            }).catch(function(err){
                alert(err.response.data);
            });
        }
    }

    return(
        <div className='text-center'>
            <div>
                <div>아이디</div>
                <div>
                    <input value={id ? id : ""} disabled/>
                </div>
                <div>이름</div>
                <div>
                    <input onChange={nameChange} value={newname ? newname : ""}/>
                </div>
                <div>연락처</div>
                <div><input onChange={phonenumberChange} value={newphonenumber ? newphonenumber  : ""} /></div>    
            </div>
            <button className={styles.ubcBtn} onClick={onClickUpdate}>수정</button>
            <br/>
            <button className={styles.ubcBtn} onClick={onClickDelete}>회원탈퇴</button>
        </div>
    )
}