import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ConferencePage from './pages/ConferencePage';
import ScreenSharePage from './pages/ScreenSharePage';
import MainLayoutRoutes from './routes/MainLayoutRoutes';
import './app.css';


function App({ authService }) {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* 컨퍼런스(내비게이션바 X) */}
          <Route path="/conference/:id" element={<ConferencePage />} />
          {/* 화면공유 테스트(내비게이션바 X) */}
          <Route path="/screenshare/:id" element={<ScreenSharePage />} />
          <Route path="*" element={<MainLayoutRoutes authService={authService} />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;
