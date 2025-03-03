import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginPage';
import ForgetPassword from './Pages/ForgetPassword';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/dashboardpage';
import ProfilePage from './Pages/profilepage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
