import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn.js';
import SignUp from './pages/Signup.js'
import Home from './pages/Home.js';
import React from 'react'
import Main from "./pages/Main.js";
import { useTheme } from '@emotion/react';
import Forget from "./pages/Forget.js";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Main />} />
          <Route path='/Signin' element={<SignIn />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Forget' element={<Forget />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
