import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from './pages/SignIn.js';
import SignUp from './pages/Signup.js'
import Home from './pages/Home.js';
import React from 'react'
import Main from "./pages/Main.js";
import Forget from "./pages/Forget.js";
import NotFound404 from "./pages/NotFound404.js";
import Dashboard from "./pages/Dashboard.js";
import AdminLogin from "./pages/AdminLogin.js";
import ResetPassword from "./pages/ResetPassword.js";

export default function App() {

  return (
    <div>
      <Router>
        <Routes >
          <Route path='/' element={<Main />} />
          <Route path='/Signin' element={<SignIn />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Forget' element={<Forget />} />
          <Route path='/Reset' element={<ResetPassword />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </Router>
    </div>
  )
}
