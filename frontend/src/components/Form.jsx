import {useState} from "react"
import api from "../api"
import {useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import "../styles/main.css"

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Sign in" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        
        try {
            const res = await api.post(route, {username, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)

                navigate("/home")
            } else {
                navigate("/login")
            }

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <div className="form-page">
        <div className="form-image-container">
            <img src="images/logo.jpg" className="form-image"/>
        </div>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <p className="form-title">{name}</p>
                <input 
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input 
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className="form-button" type="submit">{name}</button>

            </form>
        </div>
    </div>
        
}


export default Form