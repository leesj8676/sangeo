import React, {useState} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"

export default function UserProfile(){
    const URL = `https://i7e207.p.ssafy.io:8080/api/v1/users/${useParams().id}`
    //이후에 users/me로 수정
    const [info,setInfo] = useState("확인")
    axios.get(URL)
    .then(function (response) {
            setInfo(response)
            console.log(info)
    });

    return(
        <div>
            <div>{info.name}</div>
            <div>{info.phoneNumber}</div>
            <img src={info.profile}/>
            <Link to = "./change">수정</Link>
        </div>

    )
}