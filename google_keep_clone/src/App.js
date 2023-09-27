import React from 'react'
import Home from './pages/Home.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login.js';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
