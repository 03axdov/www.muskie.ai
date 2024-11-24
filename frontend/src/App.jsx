import react from "react"
import { Routes, Route, Navigate, useNavigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Landing from "./pages/Landing"
import ProtectedRoute from "./components/ProctedRoute"
import "./styles/main.css"
import "./styles/root.css"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  const navigate = useNavigate()

  return (
    <div id="main">
      <nav id="toolbar">
        <img id="toolbar-logo" src="images/logoToolbar.jpg" onClick={() => navigate("/")}/>
        <p className="toolbar-text" onClick={() => navigate("/")}>Solutions</p>
        <p className="toolbar-text" onClick={() => navigate("/home")}>Home</p>

        <p className="toolbar-text toolbar-right" onClick={() => navigate("/login")}>Sign in</p>
        <button className="toolbar-button toolbar-register" onClick={() => navigate("/register")}>Register</button>
      </nav>

      <div id="app">
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route 
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/register" element={<RegisterAndLogout />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </div>
      

    </div>
    
  )
}

export default App
