
import './app.css';


// 페이지
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

// 컴포넌트
import CounselorList from './components/counselorlist/counselorlist';
import NavigationBar from './components/header/Navbar';
import Maker from './components/maker/maker';
import CunslDetail from './components/counselordetail/counselordetail';



import styles from './app.module.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


import RegisterPage from './components/RegisterPage';
import RegisterCounselorPage from './components/RegisterCounselorPage';


function App({authService}) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          
        
        {/* 상담사 경로 */}
          <Route path="/cunsldetail" element = {<CunslDetail/>}/>
          <Route path ="/counselorList" element = {<CounselorList authService={authService}/>} />
          <Route path="/maker" element = {<Maker authService={authService}/>}/>
        
        
         {/* 회원관리 경로 */}
          <Route path="/sign_in" element={<LoginPage authService={authService}/>} />
          <Route path="/sign_up" element={<RegisterPage />} />
          <Route path="/sign_up/counselor" element={<RegisterCounselorPage />} />

       
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;
