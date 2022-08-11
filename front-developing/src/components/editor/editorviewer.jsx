import React, {useEffect, useState }from "react";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import axios from "axios";

function EditorViewer(file) {

    useEffect(()=>{
        axios.get("url", {
            params: {
              schduleId: '',
            }
          })
          .then(function (response) {
               // response  
          }).catch(function (error) {
              // 오류발생시 실행
          });
          
    }, []);

 
    console.log("view      " + file.file);
    return (
    <div>
        {/* <h1> {content} </h1> */}
        <Viewer initialValue = {file.fileName}/>
    </div>
    
    );

}

export default EditorViewer;