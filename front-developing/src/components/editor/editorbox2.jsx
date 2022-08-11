import React,  { useState, useRef } from "react";
import ImageFileInput from "../image_file_input/image_file_input";
import styles from "./editorbox2.module.css";


const EditorBox2 = ({imageUploader,EditorboxRepository, onFileChange, onPost}) => {
    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");
    const[ textValue, setTextValue] = useState("");
    const [ imgName, setImgName] = useState("");
    const [ imgURL, setImgURL] = useState("");



  // 파일 저장
    const saveFileImage = async (event) => {
        
        setFileImage(URL.createObjectURL(event.target.files[0]));
        const uploaded = await imageUploader.upload(event.target.files[0]);

        console.log("zzzzzzzg ", uploaded);

        await setImgName(uploaded.original_filename);
        await setImgURL(uploaded.url);
        await console.log("gggg ", imgURL);

    };

  // 파일 삭제
    const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    };


    const inputRef = useRef();


    // 이미지 업로드 버튼
    const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }

    // 텍스트 영역 
    const handleSetValue = async (event) => {
        await setTextValue(event.target.value);
    }

    // 글 등록 메소드
    const onData = () => {
        onFileChange({
            schduleId: 1,
            fileName: imgName,
            fileURL: imgURL,
            content: textValue,
        });


        onPost();
    }



    return (
    <>
        <div>  
                  <input
                    ref = {inputRef}
                    className = {styles.input} 
                    name="imgUpload"
                    type="file"
                    accept="image/*"
                    onChange={saveFileImage}
                  />
                  <button className={styles.button} onClick={onButtonClick}> 이미지 업로드 </button>

                  <button onClick={() => deleteFileImage()}>삭제</button>

                  <div>
                  {fileImage && (<img alt="sample" src={fileImage} className = {styles.imgframe} />)}
                  </div>

                  <textarea
                    placeholder="입력해주세요"
                    value={textValue}
                    className= {styles.textarea}
                    onChange={(event) => handleSetValue(event)}
                  ></textarea>

                  <button onClick = {onData}> 글 등록하기 </button>
                </div>
    </>
  );
}

export default EditorBox2;