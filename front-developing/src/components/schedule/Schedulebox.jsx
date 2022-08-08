import React, {useState} from 'react';
import {useParams} from 'react-router-dom'
import Conferences from './Conferences'
import axios from 'axios';
import Pagination from 'react-js-pagination';
export default function ScheduleBox (){
    //본인인경우 아니면 오류페이지로
    let conference = [{
      "id": 1,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T08:30:00.000+00:00",
      "endTime": "2022-07-27T09:30:00.000+00:00",
      "holiday": false,
      "complete": true
    },
    {
      "id": 2,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T08:30:00.000+00:00",
      "endTime": "2022-07-27T09:30:00.000+00:00",
      "holiday": false,
      "complete": false
    },
    {
      "id": 3,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T09:30:00.000+00:00",
      "endTime": "2022-07-27T10:30:00.000+00:00",
      "holiday": false,
      "complete": false
    },
    {
      "id": 4,
      "counselor": {
        "id": 1,
        "counselorId": "parkcs",
        "name": "박상담",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
        "contactStartTime": "10:00:00",
        "contactEndTime": "09:00:00",
        "career": 0,
        "longIntroduction": null,
        "reserveStartTime": null,
        "reserveEndTime": null,
        "consultTarget": null,
        "price": 0,
        "consultNumber": 0,
        "holiday": null,
        "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
        "hibernateLazyInitializer": {}
      },
      "user": {
        "id": 1,
        "userId": "kimssafy",
        "name": "김싸피",
        "phoneNumber": "010-1234-5678",
        "profile": "이미지 경로",
        "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
      },
      "startTime": "2022-07-27T11:30:00.000+00:00",
      "endTime": "2022-07-27T12:30:00.000+00:00",
      "holiday": false,
      "complete": false
    },
    {
        "id": 4,
        "counselor": {
          "id": 1,
          "counselorId": "parkcs",
          "name": "박상담",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
          "contactStartTime": "10:00:00",
          "contactEndTime": "09:00:00",
          "career": 0,
          "longIntroduction": null,
          "reserveStartTime": null,
          "reserveEndTime": null,
          "consultTarget": null,
          "price": 0,
          "consultNumber": 0,
          "holiday": null,
          "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
          "hibernateLazyInitializer": {}
        },
        "user": {
          "id": 1,
          "userId": "kimssafy",
          "name": "김싸피",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
        },
        "startTime": "2022-07-27T11:30:00.000+00:00",
        "endTime": "2022-07-27T12:30:00.000+00:00",
        "holiday": false,
        "complete": false
      },
      {
        "id": 4,
        "counselor": {
          "id": 1,
          "counselorId": "parkcs",
          "name": "박상담",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
          "contactStartTime": "10:00:00",
          "contactEndTime": "09:00:00",
          "career": 0,
          "longIntroduction": null,
          "reserveStartTime": null,
          "reserveEndTime": null,
          "consultTarget": null,
          "price": 0,
          "consultNumber": 0,
          "holiday": null,
          "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
          "hibernateLazyInitializer": {}
        },
        "user": {
          "id": 1,
          "userId": "kimssafy",
          "name": "김싸피",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
        },
        "startTime": "2022-07-27T11:30:00.000+00:00",
        "endTime": "2022-07-27T12:30:00.000+00:00",
        "holiday": false,
        "complete": false
      },
      {
        "id": 4,
        "counselor": {
          "id": 1,
          "counselorId": "parkcs",
          "name": "박상담",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
          "contactStartTime": "10:00:00",
          "contactEndTime": "09:00:00",
          "career": 0,
          "longIntroduction": null,
          "reserveStartTime": null,
          "reserveEndTime": null,
          "consultTarget": null,
          "price": 0,
          "consultNumber": 0,
          "holiday": null,
          "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
          "hibernateLazyInitializer": {}
        },
        "user": {
          "id": 1,
          "userId": "kimssafy",
          "name": "김싸피",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
        },
        "startTime": "2022-07-27T11:30:00.000+00:00",
        "endTime": "2022-07-27T12:30:00.000+00:00",
        "holiday": false,
        "complete": false
      },
      {
        "id": 4,
        "counselor": {
          "id": 1,
          "counselorId": "parkcs",
          "name": "박상담",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
          "contactStartTime": "10:00:00",
          "contactEndTime": "09:00:00",
          "career": 0,
          "longIntroduction": null,
          "reserveStartTime": null,
          "reserveEndTime": null,
          "consultTarget": null,
          "price": 0,
          "consultNumber": 0,
          "holiday": null,
          "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
          "hibernateLazyInitializer": {}
        },
        "user": {
          "id": 1,
          "userId": "kimssafy",
          "name": "김싸피",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
        },
        "startTime": "2022-07-27T11:30:00.000+00:00",
        "endTime": "2022-07-27T12:30:00.000+00:00",
        "holiday": false,
        "complete": false
      }
    ,{
        "id": 4,
        "counselor": {
          "id": 1,
          "counselorId": "parkcs",
          "name": "박상담",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
          "contactStartTime": "10:00:00",
          "contactEndTime": "09:00:00",
          "career": 0,
          "longIntroduction": null,
          "reserveStartTime": null,
          "reserveEndTime": null,
          "consultTarget": null,
          "price": 0,
          "consultNumber": 0,
          "holiday": null,
          "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
          "hibernateLazyInitializer": {}
        },
        "user": {
          "id": 1,
          "userId": "kimssafy",
          "name": "김싸피",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
        },
        "startTime": "2022-07-27T11:30:00.000+00:00",
        "endTime": "2022-07-27T12:30:00.000+00:00",
        "holiday": false,
        "complete": false
      },
      {
        "id": 4,
        "counselor": {
          "id": 1,
          "counselorId": "parkcs",
          "name": "박상담",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
          "contactStartTime": "10:00:00",
          "contactEndTime": "09:00:00",
          "career": 0,
          "longIntroduction": null,
          "reserveStartTime": null,
          "reserveEndTime": null,
          "consultTarget": null,
          "price": 0,
          "consultNumber": 0,
          "holiday": null,
          "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
          "hibernateLazyInitializer": {}
        },
        "user": {
          "id": 1,
          "userId": "kimssafy",
          "name": "김싸피",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
        },
        "startTime": "2022-07-27T11:30:00.000+00:00",
        "endTime": "2022-07-27T12:30:00.000+00:00",
        "holiday": false,
        "complete": false
      },
      {
        "id": 4,
        "counselor": {
          "id": 1,
          "counselorId": "parkcs",
          "name": "박상담",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "shortIntroduction": "안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.",
          "contactStartTime": "10:00:00",
          "contactEndTime": "09:00:00",
          "career": 0,
          "longIntroduction": null,
          "reserveStartTime": null,
          "reserveEndTime": null,
          "consultTarget": null,
          "price": 0,
          "consultNumber": 0,
          "holiday": null,
          "password": "$2a$10$zVVxm6pf5nWHgyAo5dhumuw27fsecKb5jHyQBK27aNBlFhIKgjxC6",
          "hibernateLazyInitializer": {}
        },
        "user": {
          "id": 1,
          "userId": "kimssafy",
          "name": "김싸피",
          "phoneNumber": "010-1234-5678",
          "profile": "이미지 경로",
          "password": "$2a$10$qhChJeLvkaxYqu0veloXy.uH1uxlv5h.YmQsyPFukzygTSrA3.r2m"
        },
        "startTime": "2022-07-27T11:30:00.000+00:00",
        "endTime": "2022-07-27T12:30:00.000+00:00",
        "holiday": false,
        "complete": false
      }]
    // const URL = `http://localhost:8080/api/v1/schedules/users/${useParams().id}`
    // axios.get(URL)
    // .then(function (response) {
    //         console.log(response)
    //         conference = response
    // }); 
    const [onoff,setOnoff] = useState("오래된")
    const [list,setList] = useState(conference)
    const [page, setPage] = useState(1);

    let conferenceList = list.map((x)=>(<Conferences className="conference" complete={x.complete} name={x.counselor.name} date={x.startTime}/>))
    function clickButton(){
        console.log("버튼")
        setList(list.reverse())
        if (onoff === "최신순"){setOnoff(onoff=>"오래된")}
        else {setOnoff(onoff=>"최신순")}
        conferenceList = list.map((x)=>(<Conferences complete={x.complete} name={x.counselor.name} date={x.startTime}/>))
    }
    function changeSee(e){
        console.log(e.target.value)
        setPage(page=>1)
        setList(list=>conference)
        if (e.target.value==="모두"){setList(list=>conference); console.log("모두", list)}
        else if (e.target.value==="완료"){setList(list=>list.filter(c => c.complete===false)); console.log("완료", list)}
        else {setList(list=>list.filter(c => c.complete===true)); console.log("예정", list)}
        console.log(list)
        conferenceList = list.map((x)=>(<Conferences complete={x.complete} name={x.counselor.name} date={x.startTime}/>))
    }                    
    const handlePageChange = page => {
        setPage(page);
        console.log(page)
      };
      
      

    return (
      <div>
        <label>
            <select onChange={changeSee}>
                <option value="모두">모두</option>
                <option value="완료">완료</option>
                <option value="예정">예정</option>
            </select>
        </label>
        <div>
            <button className="button" onClick={clickButton}>{onoff}</button>
            <div>{conferenceList.slice((page-1)*10,(page-1)*10+10)}</div>
            <div>총 {conferenceList.length} 개</div>
        </div>
        <div>
        <Pagination
            activePage={page}//현재 페이지
            itemsCountPerPage={parseInt((conferenceList.length-1)/10)+1}
            totalItemsCount={conferenceList.length}//전체 아이템 개수
            pageRangeDisplayed={parseInt((conferenceList.length-1)/10)+1}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
            />
        </div>
      </div>
    )
    }