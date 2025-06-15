import navlogo from './assets/navlogo.svg';
import './App.css';
import {Outlet, Link, BrowserRouter, Routes, Route} from "react-router-dom";

import NonAdminHomePage from "./pages/NonAdminHomePage";
import LandingPage from "./pages/LandingPage";
import AdminHomePage from "./pages/AdminHomePage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<NonAdminHomePage/>} />
          <Route path="admin" element={<AdminHomePage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
