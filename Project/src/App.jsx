import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Home'
import NavBar from './component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Register from './component/Register'
import Login from './component/Login'
import { useState } from 'react'
function App() {
  const [sign,setSign]=useState(0)
  return (
    <>
      <NavBar sign={sign} setSign={setSign} />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login sign={sign} setSign={setSign}/>} />
      </Routes>
      
    </>
  )
}

export default App
