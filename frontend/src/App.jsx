import React from 'react'
import Login from './Pages/login'
import ForgetPassword from './Pages/ForgetPassword'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from './Pages/RegisterPage';

const App = () => {
  return (
    <div>
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>



    </div>
  )
}

export default App
