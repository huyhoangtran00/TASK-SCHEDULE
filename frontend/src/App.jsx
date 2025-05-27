import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

  import Board from './pages/Board/Board'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
 <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
