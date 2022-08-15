import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import styles from '../../pages/UserInfoChangePage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export default function CounBasicChange({imageUploader}){
    //aixos로 최초정보 받음
    //보낼 폼 sendinfo
    //아이디 중복확인버튼 해당아이디를 사용하는 사람이 있는지 확인
    //회원탈퇴시 한번더 물어보기
    const URL = '/counselors/me';
    const [info,setInfo] = useState('');
    const [id,setId] = useState('');
    const [newname,setName] = useState('');
    const [newphonenumber,setPhonenumber] = useState('');
    const [newprofile,setProfile] = useState('');
    const [shortIntroduction,setShort] = useState()
    const [longIntroduction,setLong] = useState()
    const [price,setPrice] = useState()
    const [consultTarget,setConsultTarget] = useState([])
    const target = ['아동','청소년','성인(여)','성인(남)']
    const [targetbox,setTargetBox] = useState()


    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");
    const[ textValue, setTextValue] = useState("");
    const [ imgName, setImgName] = useState("");
    // 서버에서 받아온 이미지 경로
    const [ imgURL, setImgURL] = useState("");

    // 버튼 이미지 바꾸기
    const [imgbtn, setImgbtn ] = useState(true);
    const [targetimg, setTargetImg] = useState("");
    const [profileImg, setProfileImg] = useState(false);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef();
    const reader = new FileReader();

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+URL)
        .then(function (response) {
            setInfo(response.data);
        })
        .catch(function (error){
            if(error.response.status===401){ // 토큰 만료
                alert("다시 로그인해주세요.");
                // 로그아웃 처리
                localStorage.removeItem("Authorization");
                setAuthorizationToken(null);
                dispatch({type:'LOG_OUT'});
                // 로그인 페이지로 이동
                navigate('/sign_in');
            }
            else if(error.response.status===403){
                alert("로그인 후 접근 가능한 페이지입니다.");
                // 로그인 페이지로 이동
                navigate('/sign_in');
            }
            else{
                alert(error);
            }}
        )
        },[])



    useEffect(()=>{
        if(info){
            // setConsultTarget(info.consultTarget.split('/'))
            setId(info.counselorId);
            setName(info.name);
            setPhonenumber(info.phoneNumber);
            setProfile(info.profile);
            setShort(info.shortIntroduction)
            setLong(info.longIntroduction)
            setPrice(info.price)
            setTargetBox(target.map((t)=><div>{t}<input checked={consultTarget.includes(t)} onChange={TargetChange} type="checkbox" value={t}/></div>))
 
        }
    },[info])

    useEffect(()=>{
        setTargetBox(target.map((t)=><div>{t}<input checked={consultTarget.includes(t)} onChange={TargetChange} type="checkbox" value={t}/></div>))
    },[consultTarget])


    function nameChange(e){
        setName(e.target.value);
    }

    function profileChange(e){
        setProfile(e.target.value);
    }
    
    function phonenumberChange(e){
        setPhonenumber(e.target.value);
    }
    function ShortChange(e){
        setShort(e.target.value)
    }
    function PriceChange(e){
        setPrice(e.target.value)
    }
    function LongChange(e){
        setLong(e.target.value)
    }
    function TargetChange(e){
        let newtarget = consultTarget
        if (newtarget.includes(e.target.value)){
           newtarget = newtarget.filter((x) => x !== e.target.value)
        }
        else{
            newtarget.push(e.target.value)
        }
        setConsultTarget(newtarget)
        console.log(consultTarget)
        setTargetBox(target.map((t)=><div>{t}<input checked={consultTarget.includes(t)} onChange={TargetChange} type="checkbox" value={t}/></div>))
    }

    // 회원정보 수정
    function onClickUpdate(){
        let newinfo = info
        newinfo.name = newname
        newinfo.phoneNumber = newphonenumber
        newinfo.shortIntroduction = shortIntroduction
        newinfo.price = price
        newinfo.consultTarget = consultTarget.join('/')
        newinfo.longIntroduction = longIntroduction
        newinfo.profile = profileImg
        delete newinfo.password
        console.log("수정했다 ",newinfo);
        updateBasic(newinfo)

    }

    async function updateBasic(newinfo){
        await axios.put(process.env.REACT_APP_DB_HOST+'/counelors', newinfo)
        .then(function(result){
            console.log("상담사 수정 보냈어!!! ", newinfo);
            alert("정보가 수정되었습니다!");
          }).catch(function(err){
            alert(err);
          });
    }

    // 회원 탈퇴
    function onClickDelete(){
        const password = prompt("탈퇴를 위해 비밀번호를 입력해주세요.");
        if(password){
            axios.post(process.env.REACT_APP_DB_HOST+`/counselors/${id}`, {
                password: password
            })
            .then(function(result){
                console.log(result);
                // 비밀번호 일치 확인 후 회원 탈퇴
                axios.delete(process.env.REACT_APP_DB_HOST+`/counselors/${id}`)
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
     const onButtonClick = async (event) => {
        event.preventDefault();
        inputRef.current.click();

    }



    // 이미지 등록 버튼
    const onButtonPost = async (event) => {
        const uploaded = await imageUploader.upload(targetimg);
        setProfile(uploaded.url);
    }

    // 파일 저장
    const saveFileImage = async (event) => {
        if(event.target.files[0]){
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
                <div>소개</div>
                <div>
                    <input onChange={ShortChange} value={shortIntroduction ? shortIntroduction : ""}/>
                </div>
                <div>상담비용</div>
                <div>
                    <input onChange={PriceChange} value={price ? price : ""}/>
                </div>
                <div>상담대상</div>
                <div>
                    {targetbox} 
                </div>
                <div>상세자기소개</div>
                <div>
                    <input onChange={LongChange} value={longIntroduction ? longIntroduction : ""}/>
                </div>
            </div>
            <button className={styles.ubcBtn} onClick={onClickUpdate}>수정</button>
            <br/>
            <button className={styles.ubcBtn} onClick={onClickDelete}>회원탈퇴</button>
        </div>
    )
}