import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Conference(x, state) {
    const navigate = useNavigate()
    const { id, complete, confirmed, counselorId, counselorName, endTime, startTime, userId, userName, formPath
    } = x.props
    console.log("test", x.props);
    let date = startTime.substring(16, 0)
    const now = new Date
    const time = new Date(startTime)
    const URL = process.env.REACT_APP_DB_HOST + `/schedules/complete`

    // 모달 관련
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // 모달에서 받을 설문 주소
    const [path, setPath] = useState(formPath);

    function putPath() {
        handleClose();
        const path = document.getElementById("path");
        // console.warn("putpath", path.value);

        axios.put(process.env.REACT_APP_DB_HOST + `/schedules/form`, {
            scheduleId: id,
            formPath: path.value,
        })
            .then(function ({ data }) {
                console.warn("등록 성공 ", data);
                alert("등록에 성공했습니다");
                setPath(path);
            }).catch(function (err) {
                console.warn("등록 실패 ", err);
            })
    };

    function IsComplete() {
        console.log(date)
        axios.put(URL,
            {
                "counselorId": `${counselorId}`,
                "startTime": `${date}`
            })
            .then(navigate(`/managedonecounsel/${id}`))
        //네이게이트로 상담완료로
    }
    //예정
    if (complete === false) {
        return (
            <div className="box">
                <nav>
                    <div className="state">예정</div>
                    <Link to={`../counselordetail/${userName}`}>{userName}님 상담</Link>
                    <span>{date}</span>
                    {path ? (<a href={path} className="text-primary" target="_blank"
                        rel="noopener noreferrer">사전질문 연결</a>) :
                        <button onClick={handleShow}>사전 질문 링크 등록</button>}
                    <Link to={`../conference/${id}`}>상담실링크</Link>
                    {time < now ? <button onClick={IsComplete}>상담완료</button> : null}
                </nav>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>사전 질문 링크를 등록하세요</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text-center'>
                        <input type="text" id="path" className="text-center" placeholder='주소'></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={putPath}>
                            등록하기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    //완료후
    else {
        return (
            <div className="box">
                <nav>
                    <div className="state">완료</div>
                    <Link to={`../counselordetail/${userName}`}>{userName}님 상담</Link>
                    <span>{date}</span>
                    {path ? (<a href={path} className="text-primary" target="_blank"
                        rel="noopener noreferrer">사전질문 연결</a>) : null
                        }
                    <Link to={`../managedonecounsel/${id}`}>상담결과링크</Link>
                </nav>
            </div>
        )
    }

}
