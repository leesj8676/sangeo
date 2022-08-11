import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConferencePage from './pages/ConferencePage';
import MainLayoutRoutes from './routes/MainLayoutRoutes';
import HomePage from './pages/HomePage';
import CounDetailPage from './pages/CounDetailPage';
import CounListPage from './pages/CounListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCounselorPage from './pages/RegisterCounselorPage';
import UserMyPage from './pages/UserMyPage';
import UserInfoChangePage from './pages/UserInfoChangePage';
import DoneCounselPage from './pages/DoneCounselPage';
import ManageDoneCounselPage from './pages/ManageDoneCounselPage';


import './app.css';


function App({FileInput, authService,  EditorboxRepository , imageUploader}) {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* 컨퍼런스(내비게이션바 X) */}
          <Route path="/conference/:id" element={<ConferencePage />} />
          <Route path="*" element={<MainLayoutRoutes authService={authService} />} />
          <Route path="/" element = {<HomePage/>}/>
          
        
        {/* 상담사 경로 */}
          <Route path="/counselordetail/:id" element = {<CounDetailPage/>}/>
          <Route path="/counselorlist" element = {<CounListPage />}/>
        
        
        {/* 회원관리 경로 */}
          <Route path="/sign_in" element={<LoginPage />} />
          <Route path="/sign_up" element={<RegisterPage />} />
          <Route path="/sign_up/counselor" element={<RegisterCounselorPage />} />
          <Route path="/mypage/:id" element={<UserMyPage />} />
          <Route path="/mypage/:id/change" element={<UserInfoChangePage />} />
        
 
        
        {/* 상담관리 */}
        <Route path="/donecounsel" element={<DoneCounselPage authService={authService}/>} />
        {/* 상담사가 상담완료 후 분석 글 올려주는 페이지 */}
        <Route path="/managedonecounsel" element={<ManageDoneCounselPage imageUploader= {imageUploader} FileInput= {FileInput} authService={authService} EditorboxRepository= {EditorboxRepository}/>} />
        {/* 고객이 상담완료 후 분석글 확인하고 리뷰 작성하는 페이지  */}
        <Route path="/donecounsel" element={<DoneCounselPage authService={authService} EditorboxRepository= {EditorboxRepository}/>} />
       

        {/* 컨퍼런스 */}
        {/* 세션 아이디와 입장자, authService 확인 */}
        <Route path="/conference/:id" element={<ConferencePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;
