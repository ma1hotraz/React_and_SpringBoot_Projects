import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn.js';
import SignUp from './pages/Signup.js'
import Home from './pages/Home.js';
import React from 'react'
import Main from "./pages/Main.js";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Main />} />
          <Route path='/Signin' element={<SignIn />} />
          <Route path='/Signup' element={<SignUp/>} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
