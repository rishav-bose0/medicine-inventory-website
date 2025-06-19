import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import NonAdminHomePage from "./pages/NonAdminHomePage";
import LandingPage from "./pages/LandingPage";
import AdminHomePage from "./pages/AdminHomePage";
import {AuthProvider} from "./pages/context/AuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import AdminProtectedRoutes from "./pages/AdminProtectedRoutes";
import AdminLandingPage from "./pages/AdminLandingPage";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/adminLogin" element={<AdminLandingPage />} />
                  {/*<Route path="home" element={<NonAdminHomePage/>} />*/}
                  {/*<Route path="admin" element={<AdminHomePage/>} />*/}

                  <Route element={<ProtectedRoutes />}>
                      <Route element={<AdminProtectedRoutes />}>
                        <Route path="/admin" element={<AdminHomePage />} />
                      </Route>
                      <Route path="/home" element={<NonAdminHomePage />} />
                  </Route>
              </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
