import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { style } from "@mui/system";

export default function UserProfile(){
     const URL = process.env.REACT_APP_DB_HOST+"/users/me";
     const [info,setInfo] = useState("");

     useEffect(()=>{
        async function fetchData(){
            try{
                console.log("fetch Data");
                const result = await axios.get(URL);
                setInfo(result.data);
                setTimeout(5000);
            }
            catch(error){
                alert(error);
            }
        };    
        fetchData();
    },[]);

    return(
        <div className={styles.profile}>
            <div className= {styles.profileImg}>
                <img src={ info.profile ? `${info.profile}` : "basic.png"} alt="profile"/>
            </div>
            <div className= {styles.info}>
                <div>{info.name} 고객님</div>
                <div>{info.userId}</div>
            </div>
            <div className={styles.btn}><button><Link to = "./change">수정</Link></button></div>
        </div>

    )
}