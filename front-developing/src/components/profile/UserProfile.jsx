import React, {useState} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"

export default function UserProfile(){
    // const URL = `http://localhost:8080/api/v1/users/${useParams().id}`
    // //이후에 users/me로 수정
    // const [info,setInfo] = useState("확인")
    // axios.get(URL)
    // .then(function (response) {
    //         setInfo(info=>response)
    //         console.log(info)
    // });
    const info = {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      }

    return(
        <div>
            <div>{info.name}</div>
            <div>{info.phoneNumber}</div>
            <img src={info.profile}/>
            <Link to = "./change">수정</Link>
        </div>

    )
}