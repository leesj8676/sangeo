import React, {useRef, useState} from 'react';
import styles from './certification.module.css';
import axios from 'axios';


function Certification({imageUploader}) {
    
    const inputRef = useRef();
    const reader = new FileReader();

    const [targetimg, setTargetImg] = useState("");
    const [fileImage, setFileImage] = useState("");
    const [ imgURL, setImgURL] = useState("");
    const[ textValue, setTextValue] = useState("");


     // 이미지 업로드 버튼
     const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }


    // 파일 저장
    const saveFileImage = async (event) => {
        if(event.target.files[0]){
            console.log("bbbbb  ",event.target.files[0]);
            setTargetImg(event.target.files[0]);
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;

            if(previewImgUrl){
                setFileImage(previewImgUrl);
            }
        }
    };

    const onChange = (event) => {
        setTextValue(event.target.value);
    }

    // 이미지 & 자격증명 업로드 
    const onSubmit = async () => {
        const uploaded = await imageUploader.upload(targetimg);
        setImgURL(uploaded.url);


        // 이미지 URL값 왜.... 안 읽힐까....
        console.log("gggg ", imgURL);
        console.log("gggg  ", textValue);

        axios.post("url", {
            counselorId: "",
            CertificationImg: uploaded.url,
            CertificationName: textValue,

        })
        .then(function (response) {
             alert("저장 완료");
        }).catch(function (error) {
            // 오류발생시 실행
        });

    }


    return (
        <div>
        <div> 자격증 등록하기</div>
        <div>
        {fileImage? (<img alt="sample" src={fileImage} className = {styles.imgframe} />)
        : (<button className={styles.authbtn} onClick={onButtonClick}> 자격증 사진 올리기</button>)}
            <div> <span>자격증명 </span> 
            <input type="text" placeholder ="자격증명을 입력해주세요. "className={styles.authName} onChange = {onChange}/>
            </div>
        </div>
       
        
        <button className={styles.button} onClick={onSubmit}> 인증하기</button>
        
        <input
        ref = {inputRef}
        className = {styles.input} 
        name="imgUpload"
        type="file"
        accept="image/*"
        onChange={saveFileImage}/>
    
    
    </div>
 
   );
  
            
           



}

export default Certification;
