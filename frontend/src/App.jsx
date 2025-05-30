import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
  import Board from './pages/Board/Board'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
 <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/home" element={<Home />} />
        <Route path="/board/:boardId" element={<Board />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
