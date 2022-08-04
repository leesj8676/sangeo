import React, { useState } from "react";
import Calendar from "../components/calendar/calendar";
import ReservationTime from "../components/reservationtime/reservationtime";
import "./Reservation.css";

function ReservationPage() {
  const [today] = useState({
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  });

  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const [selectedDate, setSelectedDate] = useState(today.date); //현재 선택된 일

    return (
      <div className="board">
        <div className="row bar"></div>
        <div className="row body">
        {/* 테스트용으로 holiday, rst, ret 임시로 설정 -> 실제로는 상담사 상세페이지에서 받아옴 */}
        <Calendar selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedMonth={selectedMonth} 
        setSelectedMonth={setSelectedMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate}
        today={today}
        holiday="0/6"/> {/* 받을 때 일 -> 0, 토 -> 6 이런 식으로 받도록 */}
        <ReservationTime rst="08:30:00" ret="17:00:00" counselorId="inyeja"
        selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDate={selectedDate} today={today}/>
        </div>
      </div>
    );
  }
  
  export default ReservationPage;
  