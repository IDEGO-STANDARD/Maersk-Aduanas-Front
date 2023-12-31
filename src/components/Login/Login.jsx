import { useState, useContext, useEffect } from "react"
import { Navigate, Link, useNavigate } from "react-router-dom"
import axiosInstanceNoToken from "../../axiosInstance/axiosInstanceNoToken"
import { UserContext } from "../../context/UserContext"
import logomaersk from "../../assets/logomaersk.png"
import { Eye } from "react-bootstrap-icons"
import toast from "react-hot-toast"
import "./Login.css"

function Login() {

    const [seePassword, setSeePassword] = useState(false)
    const [formData, setFormData] = useState({username: "", password: ""})
    const [submitting, setSubmitting] = useState(false)

    const {isLogged, userdata, handleSet} = useContext(UserContext)

    const nav = useNavigate()

    useEffect(() => {
        toast.remove()
    }, [])

    const changeFormData = (e) => {
        setFormData((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const loginSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        axiosInstanceNoToken.post('/login', formData)
        .then((res) => {
            toast.dismiss()
            toast.success("Login exitoso")
            console.log(res.data)
            handleSet({...res.data})
            console.log(res)
            localStorage.setItem('token', `${res.data.access_token}`);
        })
        .catch((error) => {
            console.log(error)
            toast.dismiss()
            toast.error("Credenciales inválidas")
            setSubmitting(false)
        })
    }

    return (
        <>
            {!isLogged ?
                <div className="login-cont">
                    <img className="login-img" src={logomaersk}/>
                    <div className="login-main">
                        <form className="login-form" onSubmit={loginSubmit}>
                            <div style={{display: "flex", flexDirection: "column", marginBottom: "30px"}}>
                                <label className="login-input-label" htmlFor="loginusername">Usuario</label>
                                <input required={true} value={formData.username} name="username" onChange={changeFormData} className="login-input" type="text" placeholder="Ingrese su username" id="loginusername"></input>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", marginBottom: "70px"}}>
                                <label className="login-input-label" htmlFor="loginpassword">Contraseña</label>
                                <div style={{display: "flex", alignItems: "center", position: "relative"}}>
                                    <input required={true} value={formData.password} name="password"onChange={changeFormData} className="login-input" type={seePassword ? "text" : "password"} placeholder="Ingrese su contraseña" id="loginpassword"></input>
                                    <Eye style={{position: "absolute", right: "10px", color: "gray", cursor: "pointer"}} onClick={() => {setSeePassword(prev => !prev)}}/>
                                </div>
                            </div>
                            <button className="login-button" disabled={submitting ? true : false} style={{marginBottom: "20px"}}>Iniciar sesión</button>
                        </form>
                        <Link className="login-passwordreset-link" to="/passwordreset">Reinicia tu contraseña</Link>
                    </div>
                </div>
                :
                <>
                    <Navigate to="/" />
                </>
            }
        </>
    )
}

export default Login