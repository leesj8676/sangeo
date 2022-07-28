import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign_in" element={<LoginPage />} />
          <Route path="/sign_up" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
