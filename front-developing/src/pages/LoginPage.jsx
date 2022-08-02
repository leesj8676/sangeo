import React, { useState, useEffect } from "react";
import "../components/LoginRegister.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({authService}) =>{
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //let sessionStorage = window.sessionStorage;
  //let isAuthorized = sessionStorage.getItem("isAuthorized");
  const goToCunslList = (userId) => {
    navigate({
      pathname: '/maker',
      state: {id: userId},
  });
}

  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = 'auth/login'

    axios.post(url, {
      id : userid,
      password : password
    })
    .then(function(result){
      alert(result);
    }).catch(function(err){
      alert(err);
    })

  };

  const onLogin =(event) => {
    event.preventDefault();
    authService//
    .login(event.currentTarget.textContent)
    //.then(console.log("ezzzzzzzz"));
   .then(data => goToCunslList(data.user.uid));
}

useEffect(() => {
  authService
  .onAuthChange(user => {
      user && goToCunslList(user.uid);
  })
})

  return (
    <div className="loginregister">
      <form>
        <div>
          <input
            name="userid"
            type="email"
            placeholder="아이디"
            value={userid}
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
          <button
            type="submit"
            onClick={onSubmit}
            className="loginregister__button"
          >
            로그인
          </button>
        </div>
        <div>
          <button onClick={onLogin} className="loginregister__button">
            Google
          </button>
        </div>
        <div>
          <button onClick={onLogin} className="loginregister__button">
           Github
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
