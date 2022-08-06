import React, {useState} from 'react';
import {useParams} from 'react-router-dom'
import Conferences from '../components/schedule/Conferences'
import './MyPage.css'
import axios from 'axios';
import UserProfile from '../components/profile/UserProfile';
import Schedulebox from '../components/schedule/Schedulebox'

function UserMyPage (){
    return (
      <div>
        <h1>마이페이지</h1>
        <h2>{useParams().id}의 페이지</h2>
        <UserProfile/>
        <Schedulebox/>
      </div>
    )
    }
  export default UserMyPage