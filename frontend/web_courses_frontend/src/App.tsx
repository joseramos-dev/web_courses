import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./app/Login"
import Register from "./app/Register"
import Profile from "./app/Profile"
import ComponentNavBar from "./components/ComponentNavBar"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <BrowserRouter>
      <ComponentNavBar />
      <Toaster position="bottom-center" reverseOrder={false} />
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
