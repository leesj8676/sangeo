import React, {useState} from 'react';
import axios from 'axios';
import styles from '../../pages/UserInfoChangePage.module.css';
import { useSelector } from 'react-redux';

export default function UserPwChange(){
    const id = useSelector(state => state.user.user.id); // 현재 로그인한 아이디

    const [password,setPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');


    function passwordChange(e){
        setPassword(e.target.value);
    }
    
    function newPasswordChange(e){
        setNewPassword(e.target.value);
    }

    // 비밀번호 수정
    function onClickUpdate(){
        axios.put(process.env.REACT_APP_DB_HOST+'/users/password', {
            id: id,
            password: password,
            newPassword: newPassword
        })
          .then(function(result){
            alert("비밀번호가 수정되었습니다!");
          }).catch(function(err){
            if(err.response.status === 401){
                alert("비밀번호가 틀렸습니다.");
            }
            else{
                alert(err);
            }
          });
    }


    return(
        <div className='text-center'>
            <div>
                <div>아이디</div>
                <div>
                    <input value={id ? id : ""} disabled/>
                </div>
                <div>기존 비밀번호</div>
                <div>
                    <input type="password" onChange={passwordChange} />
                </div>
                <div>새로운 비밀번호</div>
                <div><input type="password" onChange={newPasswordChange} /></div>    
            </div>
            <button className={styles.ubcBtn} onClick={onClickUpdate}>수정</button>
        </div>
    )
}