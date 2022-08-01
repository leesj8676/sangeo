
import './app.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';
import CunslDetail from './components/counselordetail/counselordetail';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App({authService}) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
 
        <Routes>
          <Route path="/" element = {<Login authService={authService}/>}/>
          <Route path="/maker" element = {<Maker authService={authService}/>}/>
          
          <Route path="/cunsldetail" element = {<CunslDetail/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;
