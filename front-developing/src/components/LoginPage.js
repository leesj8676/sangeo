import React, { useState } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import * as auth from "../auth";
import axios from "axios";

function LoginPage() {
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  let sessionStorage = window.sessionStorage;
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  const onUserIdHandler = (event) => {
    console.log("1뭐함?");
    setUserId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    console.log("2뭐함?");
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
      </form>
    </div>
  );
}

export default LoginPage;
