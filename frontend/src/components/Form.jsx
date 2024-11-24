import {useState} from "react"
import api from "../api"
import {useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import "../styles/main.css"
import "../styles/Form.scss"

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

    const triggerList = Array(400).fill(0)
    const vrLayerList = Array(20).fill(0)

    return <div className="form-page">
        <div className="form-image-container">
            <div className="container">
                {triggerList.map((_ , i) => <div className="trigger" key={i}></div>)}
                <div className="monitor">
                    <div className="camera o-x">
                        <div className="camera o-y">
                            <div className="camera o-z">
                                <div className="vr">
                                    {vrLayerList.map((_, i) => (
                                        <div className="vr_layer" key={i}>
                                            <div className="vr_layer_item" key={i}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            {method == "login" ? <div>Don't have an account? Click <span className="form-link" onClick={() => navigate("/register")}>here</span> to create one.</div> : ""}
            {method == "register" ? <div>Already have an account? Click <span className="form-link" onClick={() => {navigate("/login")}}>here</span> in order to sign in.</div> : ""}
        </div>
    </div>
        
}


export default Form