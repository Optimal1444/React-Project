import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './component/Home'
import NavBar from './component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Register from './component/Register'
import Login from './component/Login'
function App() {
  
  return (
    <>
      <NavBar  />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      
    </>
  )
}

export default App
