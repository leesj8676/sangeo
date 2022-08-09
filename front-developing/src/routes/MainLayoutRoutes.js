
// 리액트
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterCounselorPage from '../pages/RegisterCounselorPage';
import CounListPage from '../pages/CounListPage';
import CounDetailPage from '../pages/CounDetailPage';
import UserInfoChangePage from '../pages/UserInfoChangePage';
import UserMyPage from '../pages/UserMyPage'
import DoneCounselPage from '../pages/DoneCounselPage';
import ManageDoneCounselPage from '../pages/ManageDoneCounselPage';

// 컴포넌트
import NavigationBar from '../components/header/Navbar';


function MainLayoutRoutes({ authService }) {
    return (
        <div>
            <React.Fragment />
            <NavigationBar authService={authService} />
            <Routes>
                <Route path="/" element={<HomePage />} />

                {/* 상담사 경로 */}
                <Route path="/counselordetail/:id" element={<CounDetailPage />} />
                <Route path="/counselorlist" element={<CounListPage authService={authService} />} />

                {/* 회원관리 경로 */}
                <Route path="/sign_in" element={<LoginPage authService={authService} />} />
                <Route path="/sign_up" element={<RegisterPage />} />
                <Route path="/sign_up/counselor" element={<RegisterCounselorPage />} />
                <Route path="/mypage/:id" element={<UserMyPage authService={authService} />} />
                <Route path="/mypage/:id/change" element={<UserInfoChangePage authService={authService} />} />

                {/* 상담관리 */}
                <Route path="/donecounsel/:scheduleNo" element={<DoneCounselPage authService={authService} />} />
                <Route path="/managedonecounsel" element={<ManageDoneCounselPage authService={authService} />} />

            </Routes>
            <React.Fragment />
        </div>
    )
}

export default MainLayoutRoutes;