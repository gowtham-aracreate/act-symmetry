import React from 'react'
import Login from './Pages/LoginPage'
import ForgetPassword from './Pages/ForgetPassword'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/dashboardpage';
import ProfilePage from './Pages/profilepage';
// import CreateCard from './Components/CreateCard'

const App = () => {
  return (
    <div>
      {/* <CreateCard/> */}
      {/* < ProfilePage /> */}
      {/* < DashboardPage /> */}
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      {/* < Table /> */}



    </div>
  )
}

export default App
