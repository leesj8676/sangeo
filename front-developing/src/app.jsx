// 리액트
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// 페이지
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCounselorPage from './pages/RegisterCounselorPage';

// 컴포넌트
import CounselorList from './components/counselorlist/counselorlist';
import NavigationBar from './components/header/Navbar';
import Maker from './components/maker/maker';
import CunslDetail from './components/counselordetail/counselordetail';

// CSS
import './app.css';
//import styles from './app.module.css';


function App({authService}) {
  return (
    <div >
      <BrowserRouter>
        <NavigationBar authService={authService}/>
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
