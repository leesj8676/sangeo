import React, { Component } from "react";
import Review from "../review/review";
import Reservation from "../reservation/reservation";
import { useState } from "react";
import {Nav, TabContent} from 'react-bootstrap';
import styles from './tabcounselordetail.module.css';


const Tabcounselordetail = () => {

  const[tab, setTab] = useState(0);
 
  function TabContent(props) {
    if(props.tab === 0){
      return <div> 저 상담 진짜 잘해요</div>
    }else if(props.tab === 1) {
      return <div><Reservation/></div>
    }else if(props.tab === 2){
      return <div><Review /></div>
    }
  }

  
    return(
      <>
      <Nav className="mt-3 mb-3 " variant ="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=> setTab(0)}>상담소개 </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=> setTab(1)}>예약하기 </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=> setTab(2)}>리뷰 </Nav.Link>
        </Nav.Item>

      </Nav>
      <TabContent className={styles.tabcontent} tab={tab}/>
      </>
    )
    
}


export default Tabcounselordetail;