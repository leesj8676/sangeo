import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Tel, setTel] = useState("");
  const [disable, setDisable] = React.useState(false);
  const [ style, setStyle ] = useState({display: 'none'})

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onTelHandler = (event) => {
    setTel(event.currentTarget.value);
  };

  function checkInput(){
    if(!name || !userId || !password || !confirmPassword || !Tel){
      alert("모든 값을 입력해주세요.");
      return false;
    }
    return true;
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(!checkInput())
      return;

    console.log(password+" "+confirmPassword);

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }

    const url = 'users'
    axios.post(url, {
      userId : userId,
      password : password,
      name: name,
      phoneNumber: Tel,
      profile: "basic.png"
    })
    .then(function(result){
      alert(result.data.userId+"님 가입을 축하드립니다.");
      // 로그인 페이지로 이동하게 수정
      
    }).catch(function(err){
      if(err.response.status===401){
        alert("이미 가입된 사용자입니다.");
      }
      else{
        alert(err);
      }
    })
  };

  const navigate = useNavigate();

  function onClickCounselor(event){ // 상담사 회원가입을 위해 페이지 이동
    event.preventDefault();

    if(!checkInput())
      return;

    navigate('counselor',{
      state:{
        counselorId: userId,
        password: password,
        name: name,
        phoneNumber: Tel,
        profile: "basic.png"
      }
    });
  }

   function onClickCertification(event) {
     event.preventDefault();

     /* 1. 가맹점 식별하기 */
     const { IMP } = window;
     IMP.init('imp27086612') // 발급한 가맹점 식별번호 (인예림)
     //IMP.init('imp10391932') // 오픈 github에서 가져온 가맹점 식별번호
     console.log("본인 인증")
     /* 2. 본인인증 데이터 정의하기 */
     const data = {
       merchant_uid : 'merchant_' + new Date().getTime(),
       name: name,
       phone:Tel
     }
     /* 4. 본인인증 창 호출하기 */
     IMP.certification(data, callback);
     console.log("호출");
   }
   
   /* 3. 콜백 함수 정의하기 */
   function callback(response) {
     const {
       success,
       error_msg,
     } = response
     console.log(response);
     if (success) {
       console.log(response.imp_uid);
       alert('본인인증 성공');
       setDisable(true);
       setStyle({display: 'block'}); // 회원가입 버튼 생성
     } else {
       alert(`본인인증 실패: ${error_msg}`);
     }
    }
   
  return (
    <div className="loginregister">
      <form>
        <div>
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={onNameHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="userId"
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={onUserIdHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="name"
            type="tel"
            placeholder="전화번호"
            value={Tel}
            onChange={onTelHandler}
            className="loginregister__input"
          />
        </div>
        <div>        
          <button 
          type="submit"
          disabled={disable} 
          onClick={onClickCertification} 
          className="loginregister__button">
          본인인증하기
          </button></div>
        <div>
          <button
            type="submit"
            disabled={!disable}
            style={style}
            onClick={onSubmit}
            className="loginregister__button"
          >
            유저 계정 생성하기
          </button>
          </div>
          <div>
          <button
            type="submit"
            disabled={!disable}
            style={style}
            onClick={onClickCounselor}
            className="loginregister__button"
          >상담사 계정 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;
