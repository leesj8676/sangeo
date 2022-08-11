
const CounselorDetailInfo = ({card}) => {
    const returnHoliday = () => {
        if(card.holiday === null){
            return "X";
        }

        let holidayList = card.holiday.split("/");
        let holidayStr = "";
        for(let i = 0; i < holidayList.length; i++){
            let holiday = Number(holidayList[i]);
            if(holiday === 1){holidayStr += "월";}
            else if(holiday === 2){holidayStr += "화";}
            else if(holiday === 3){holidayStr += "수";}
            else if(holiday === 4){holidayStr += "목";}
            else if(holiday === 5){holidayStr += "금";}
            else if(holiday === 6){holidayStr += "토";}
            else{holidayStr += "일";}

            if(i !== holidayList.length-1){holidayStr += "/";}
        }
        return holidayStr;
    }
    
    return (
     <div className="container">
        {/* 미등록 부분은 if로 처리할 것인지 */}
        <p className="mb-1">자격증 : 추후 구현</p>
        <p className="mb-1">경력 : {card.career}년</p>
        <p className="mb-1">상담 대상 : {card.consultTarget}</p>
        <p className="mb-1">상세 자기소개 : {card.longIntroduction}</p>
        <p className="mb-1">연락 가능 시간 : {card.contactStartTime} ~ {card.contactEndTime}</p>
        <p className="mb-1">예약 가능 시간 : {card.reserveStartTime} ~ {card.reserveEndTime}</p>
        <p>휴일 : {returnHoliday()}</p>
      </div>
    );
}

export default CounselorDetailInfo;