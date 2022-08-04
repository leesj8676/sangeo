import React, {useState} from 'react';
import axios from 'axios';

export default function UserInfoChange(){
    //aixos로 최초정보 받음
    return(
        <div>
            <div>회원정보 수정 페이지</div>
            <div>
                <form>
                    <div>아이디</div>
                    <div><input name="password" value="기존아이디"/>
                        <button>중복확인</button>
                    </div>
                    <div>비밀번호</div>
                    <div><input name="password" /></div>
                    <div>비밀번호 확인</div>
                    <div><input name="password" /></div>
                    <div>이메일</div>
                    <div><input name="password" /></div>
                    <div>연락처</div>
                    <div><input name="password" /></div>
                    <button type="submit">수정</button>
                </form>
            </div>
        </div>
    )
}