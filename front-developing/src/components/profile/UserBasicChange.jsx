import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import styles from '../../pages/UserInfoChangePage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import setAuthorizationToken from "../../utils/setAuthorizationToken";

function UserBasicChange({imageUploader}){
    //aixos로 최초정보 받음
    //보낼 폼 sendinfo
    //아이디 중복확인버튼 해당아이디를 사용하는 사람이 있는지 확인
    //회원탈퇴시 한번더 물어보기
    const URL = '/users/me';
    const [info,setInfo] = useState('');
    const [id,setId] = useState('');
    const [newname,setName] = useState('');
    const [newphonenumber,setPhonenumber] = useState('');
    const [newprofile,setProfile] = useState('');
    const [first,setFirst] = useState(1); //최초렌더링시 입력값이 반영안되는 문제 해결


    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");
    const[ textValue, setTextValue] = useState("");
    const [ imgName, setImgName] = useState("");
    // 서버에서 받아온 이미지 경로
    const [ imgURL, setImgURL] = useState("");

    // 버튼 이미지 바꾸기
    const [imgbtn, setImgbtn ] = useState(true);
    const [targetimg, setTargetImg] = useState("");
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef();
    const reader = new FileReader();

    useEffect(()=>{
    axios.get(process.env.REACT_APP_DB_HOST+URL)
    .then(function (response) {
            setInfo(response.data)
            setId(info.userId)
            setName(info.name)
            setPhonenumber(info.phoneNumber)
            setProfile(info.profile)
            if (first === 1){setFirst(0)}//최초렌더링시 입력값이 반영안되는 문제 해결
    })
    .catch(function(err){
        if(err.response.status===401){ // 토큰 만료
            alert("다시 로그인해주세요.");
            // 로그아웃 처리
            localStorage.removeItem("Authorization");
            setAuthorizationToken(null);
            dispatch({type:'LOG_OUT'});
            // 로그인 페이지로 이동
            navigate('/sign_in');
          }
          else{
            alert(err);
          }
    })}
    ,[first]);

    function nameChange(e){
        setName(e.target.value);
    }

    function profileChange(e){
        setProfile(e.target.value);
    }
    
    function phonenumberChange(e){
        setPhonenumber(e.target.value);
    }

    // 회원정보 수정
    function onClickUpdate(){
        axios.put(process.env.REACT_APP_DB_HOST+'/users', {
            name: newname,
            phoneNumber: newphonenumber,
            profile: newprofile,
            userId: id,
        })
          .then(function(result){
            alert("정보가 수정되었습니다!");
          }).catch(function(err){
            alert(err);
          });
    }

    // 회원 탈퇴
    function onClickDelete(){
        const password = prompt("탈퇴를 위해 비밀번호를 입력해주세요.");
        if(password){
            axios.post(process.env.REACT_APP_DB_HOST+`/users/${id}`, {
                password: password
            })
            .then(function(result){
                console.log(result);
                // 비밀번호 일치 확인 후 회원 탈퇴
                axios.delete(process.env.REACT_APP_DB_HOST+`/users/${id}`)
                    .then(function(result){
                    // 로그아웃 처리
                    localStorage.removeItem("Authorization");
                    setAuthorizationToken(null);
                    dispatch({type:'LOG_OUT'});
                    alert("탈퇴되었습니다!");
                    navigate('/');
                }).catch(function(err){
                    alert(err);
                });
            }).catch(function(err){
                alert(err.response.data);
            });
        }
    }

     // 이미지 업로드 버튼
     const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }



    // 이미지 등록 버튼
    const onButtonPost = async (event) => {
        const uploaded = await imageUploader.upload(targetimg);
        // await setImgName(uploaded.original_filename);
        await setProfile(uploaded.url);
        // await console.log("gggg ", imgURL);
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

        setImgbtn(false);
    };


    return(
        <div className='text-center'>
            <div>
                <div>프로필</div>

                <div>
                  <div>{newprofile && (<img alt="sample" src={newprofile} className = {styles.imgframe} />)}</div>
                  <input
                    ref = {inputRef}
                    className = {styles.input} 
                    name="imgUpload"
                    type="file"
                    accept="image/*"
                    onChange={saveFileImage}
                  />
                    {imgbtn ?  <button className={styles.button} onClick={onButtonClick}> 이미지 업로드 </button> :  <button className={styles.button} onClick={onButtonPost}> 등록하기 </button>}
                 
                  </div> 
               
                <div>아이디</div>
                <div>
                    <input value={id ? id : ""} disabled/>
                </div>
                <div>이름</div>
                <div>
                    <input onChange={nameChange} value={newname ? newname : ""}/>
                </div>
                <div>연락처</div>
                <div><input onChange={phonenumberChange} value={newphonenumber ? newphonenumber  : ""} /></div>    
            </div>
            <button className={styles.ubcBtn} onClick={onClickUpdate}>수정</button>
            <br/>
            <button className={styles.ubcBtn} onClick={onClickDelete}>회원탈퇴</button>
        </div>
    )
}

export default UserBasicChange;