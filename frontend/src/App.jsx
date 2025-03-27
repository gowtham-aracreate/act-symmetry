import React, { use } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginPage';
import ForgetPassword from './Pages/ForgetPassword';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/dashboardpage';
import ProfilePage from './Pages/profilepage';
import DevicePage from './Pages/DevicePage';
import Reports from './Pages/Reports';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/device-management" element={<DevicePage />} />
          <Route path='/reports' element={<Reports />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;