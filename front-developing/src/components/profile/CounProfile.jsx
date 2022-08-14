import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { style } from "@mui/system";

export default function CounProfile(){
     const URL = process.env.REACT_APP_DB_HOST+"/counselors/me";
     const [info,setInfo] = useState("");

     const[ Id, setId] = useState();

     useEffect(()=>{
        async function fetchData(){
            try{
                const result = await axios.get(URL);
                setInfo(result.data);
                setId(result.data.counselorId);

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
            {/* <div className= {styles.profileImg}>
                <img src={ info.profile ? `http://localhost:3000/${info.profile}` : "http://localhost:3000/basic.png"} alt="profile"/>
            </div> */}
            <div className= {styles.info}>
                <div>{info.name} 고객님</div>
                <div>{info.userId}</div>
            </div>
            <div className={styles.btn}><button><Link to = "./change" state ={{counselorId: Id}}>수정</Link></button></div>
        </div>

    )
}