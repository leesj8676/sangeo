import React, { Component } from "react";
// import './style.css';
import Review from "../review/review";
import Reservation from "../reservation/reservation";
const menuList = {
  0: <Review />,
  1: <Reservation />,
};

const Tab_counselordetail = () => {

  const changeMenu = (menuIndex) =>{
    this.setState({menu : menuIndex});
  }

  
    return(
      <div className="wrap">
        <div className="menuBar">
          <ul className="tabs">
            <li className={`${this.state.menu === 0? 'active': ''}`} onClick={() => this.changeMenu(0)}>상담소개</li>
            <li className={`${this.state.menu === 1? 'active': ''}`} onClick={() => this.changeMenu(1)}>예약하기</li>
            <li className={`${this.state.menu === 1? 'active': ''}`} onClick={() => this.changeMenu(2)}>리뷰</li>
          </ul>
        </div>
        <div className="contentArea">
          {menuList[this.state.menu]}
        </div>
      </div>
    )

}


export default Tab_counselordetail;