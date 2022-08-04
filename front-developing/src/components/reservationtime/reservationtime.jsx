import React, { useState} from "react";
import styles from "./reservationtime.module.css";
import classNames from "classnames/bind";
import axios from "axios";

const cx = classNames.bind(styles);
const ReservationTime = (props) => {
    const [rst] = useState(props.rst);
    const [ret] = useState(props.ret);
    const [selectedTime, setSelectedTime] = useState("");

    const handleChange = (event) => {
        setSelectedTime(event.currentTarget.value);
      };

    const onSubmit = (event) => {
        event.preventDefault();
        alert(selectedTime);
        // axios 호출
        axios.post("", {
          })
          .then(function(result){
            
          }).catch(function(err){
            // 에러메세지 수정
            alert(err);
          })

    }

    const checkReserved = () => {
        if(props.selectedYear < props.today.year){
            return -1; // 과거
          }
          else if(props.selectedYear === props.today.year){
            if(props.selectedMonth < props.today.month){
              return -1; // 과거
            }
            else if(props.selectedMonth === props.today.month){
              if(props.selectedDate < props.today.date){
                return -1; // 과거
              }
              else if(props.selectedDate === props.today.date){
                return 0; // 오늘
              }
            }
          }
          return 1; // 미래
    }

     const returnTime = () => {
        // 예약 시간 설정시 30분 단위로만 설정 가능
        // reserveStartTime, reserveEndTime도 HH:00:00, HH:30:00만 가능하게 해야함
        const rstArr = rst.split(":");
        const rstH = Number(rstArr[0]);
        const rstM = Number(rstArr[1]);

        const retArr = ret.split(":");
        const retH = Number(retArr[0]);
        const retM = Number(retArr[1]);

        let timeArr = [];
        let key = 0;
        let curTime = new Date().getHours();
        let curMinute = new Date().getMinutes();
        const timeState = checkReserved();
        for(let i = rstH; i <= retH; i++){
            let checkZero = timeState === -1 || (timeState === 0 && i <= curTime);
            let checkThirty = timeState === -1 || (timeState === 0 && (i < curTime || (i === curTime && curMinute >= 30)));
            if(i === rstH && rstM === 30){
                timeArr.push(
                    <label key={key++} 
                        className={cx(
                        {time_label: true},
                        {reserved: checkThirty}
                        )}>
                    <input type="radio" name="time" value={`${i}:30`} onChange={handleChange}
                    {...(checkThirty ? {disabled : true} : {})}/>
                    <span>{i}:30</span>
                    </label>
                );
            }
            else if(i === retH && retM === 0){
                timeArr.push(
                    <label key={key++} 
                        className={cx(
                        {time_label: true},
                        {reserved: checkZero}
                        )}>
                    <input type="radio" name="time" value={`${i}:00`} onChange={handleChange}
                    {...(checkZero ? {disabled : true} : {})}/>
                    <span>{i}:00</span>
                    </label>
                );
            }
            else{
                timeArr.push(
                    <label key={key++}
                        className={cx(
                        {time_label: true},
                        {reserved: checkZero}
                        )}>
                    <input type="radio" name="time" value={`${i}:00`} onChange={handleChange}
                    {...(checkZero ? {disabled : true} : {})}/>
                    <span>{i}:00</span>
                    </label>
                );
                timeArr.push(
                    <label key={key++}
                        className={cx(
                        {time_label: true},
                        {reserved: checkThirty}
                        )}>
                    <input type="radio" name="time" value={`${i}:30`} onChange={handleChange}
                    {...(checkThirty ? {disabled : true} : {})}/>
                    <span>{i}:30</span>
                    </label>
                );
            }
        }
        return timeArr;
    };

    return(
        <div className="col-6 text-center">
            <div className={styles.time_header}>
            <h5>{props.selectedMonth+"."+props.selectedDate} 예약 시간</h5>
            </div>
            <form>
            <div className={styles.timeline}>{returnTime()}</div>
            <div><input type="submit" className={styles.rsvBtn} value="예약하기" onClick={(event) => {onSubmit(event)}}/></div>
            </form>
        </div>
    );

}

export default ReservationTime;