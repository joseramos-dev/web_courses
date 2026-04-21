import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./app/Login"
import Register from "./app/Register"
import Profile from "./app/Profile"
import Courses from "./app/Courses"
import ComponentNavBar from "./components/ComponentNavBar"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">

        <ComponentNavBar />

        <Toaster position="bottom-center" reverseOrder={false} />

        {/* Contenido principal */}
        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/Courses" />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Courses" element={<Courses />} />
          </Routes>
        </div>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
