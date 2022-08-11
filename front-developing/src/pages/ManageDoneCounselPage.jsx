import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import EditorBox from '../components/editor/editorbox';
import EditorViewer from '../components/editor/editorviewer';
import EditorBox2 from '../components/editor/editorbox2';
import axios from 'axios';
import styles from './ManageDoneCounselPage.module.css';

// 상담사가 완료된 상담에 메세지를 남기고 이미지 업로드 하는 페이지
function ManageDoneCounselPage({imageUploader, FileInput, EditorboxRepository}) {


    const navigate = useNavigate();

    // // true 일 때는 editor 화면, false일 때는 viewor화면
    const [ post, setPost] = useState(true);

    // // 사진 업로드 경로
    const [ file, setFile] = useState({
        scheduleId: '', 
        fileName:'', 
        fileURL:'',
        content: '' 
        });
    
    const {scheduleId, fileName, fileURL, content} = file;

    
    const onFileChange =  (data) => {
        console.log("!!!!!!!!!!!", data);
        setFile({
            scheduleId: data.scheduleId,
            fileName: data.name,
            fileURL: data.url,
            content: data.content,
        });  
        
    }

    const onPost = () => {
        axios.post("url", {
            scheduleId: "",
            fileName: "",
            fileURL: "",
            content: "",
        })
        .then(function (response) {
             alert("저장 완료");
        }).catch(function (error) {
            // 오류발생시 실행
        });
        setPost(false);
    }

  
    
    return (
        <div>
           분석 등록 페이지
            <div>
                {/* <EditorBox2 imageUploader={imageUploader} EditorboxRepository= {EditorboxRepository } onFileChange = {onFileChange} onPost = {onPost} /> */}
                { post ? <EditorBox2 imageUploader={imageUploader} EditorboxRepository= {EditorboxRepository } onFileChange = {onFileChange} onPost = {onPost} /> 
                : <div> <img src={'http://res.cloudinary.com/daomkhvu8/image/upload/v1660159387/usgonfwysaxnmetbozph.jpg'} alt="profile photo" /> <textarea className = {styles.text} placeholder={content} disabled/> <div></div> </div>}
            </div>
     

        </div>
    );
}

export default ManageDoneCounselPage;
