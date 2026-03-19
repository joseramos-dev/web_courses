import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./app/Login"
import Register from "./app/Register"
import Profile from "./app/Profile"
import { Component } from "react"
import ComponentNavBar from "./components/ComponentNavBar"

function App() {

  return (
    <BrowserRouter>
      <ComponentNavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
