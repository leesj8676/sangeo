import React from "react";
import axios from "axios";
import { Link } from "react-router-dom"

export default function UserProfile(props){
    const URL = `http://localhost:8080/api/v1/user/${props.id}`
    let info
    axios.get(URL)
    .then(function (response) {
            console.log(response)
            info = response
    });
    info = 
    {
        "id": 0,
        "name": "kimssafy",
        "password": "23580293",
        "phoneNumber": "010-xxxx-xxxx",
        "profile": "string",
        "userId": "string"
      }
    return(
        <div>
            <div>{info.name}</div>
            <div>{info.phoneNumber}</div>
            <div>{info.userId}</div>
            <Link to = "./change">수정</Link>
        </div>

    )
}