import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { EyeSlash, CheckCircle, XCircle } from "react-bootstrap-icons";
import greencheck from "../../assets/greencheck.svg"
import "./PasswordResetNewPass.css"
import axiosInstanceNoToken from "../../axiosInstance/axiosInstanceNoToken"

function PasswordResetNewPass() {

    let navigate = useNavigate()

    const {resetpassid} = useParams()

    const [username, setUsername] = useState("")
    const [passwords, setPasswords] = useState({password: "", confirmpassword: ""})
    const [callsuccess, setCallsuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [resetSuccess, setResetSuccess] = useState(false)

    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

    const [passFocused, setPassFocused] = useState(false)
    const [passErrorChecker, setPassErrorChecker] = useState({eight: false, space: false, special: false, lower: false, upper: false, number: false})

    const [newPassErrorMsg, setNewPassErrorMsg] = useState("")
    const [newPassErrorDisp, setNewPassErrorDisp] = useState(false)
    const [newPassErrorShaking, setNewPassErrorShaking] = useState(false)

    const [confirmPassErrorDisp, setConfirmPassErrorDisp] = useState(false)
    const [confirmPassErrorShaking, setConfirmPassErrorShaking] = useState(false)

    const submitbuttonref = useRef(null)

    useEffect(() => {
        axiosInstanceNoToken.get(`/users/password-reset/${resetpassid}`)
        .then((res) => {
            console.log(res)
            setCallsuccess(true)
            setUsername(res.data.data.username)
        })
        .catch((error) => {
            console.log(error)
            navigate("/passwordreset")
        }) 
    }, [])


    const handlePasswordChange = (e) => {
        const {name, value} = e.target
        setPasswords((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmitSetNewPass = (e) => {
        e.preventDefault()
        let flagged = false
        if(passwords.password.length < 8) {
            flagged = true
            setNewPassErrorMsg("La contraseña debe tener 8 o más caracteres")
            setNewPassErrorDisp(true)
            if(!newPassErrorShaking) {
                setNewPassErrorShaking(true)
                setTimeout(() => {
                    setNewPassErrorShaking(false)
                },1000)
            }
        }
        else if(passwords.password.includes(" ")) {
            flagged = true
            setNewPassErrorMsg('La contraseña no debe contener " "')
            setNewPassErrorDisp(true)
            if(!newPassErrorShaking) {
                setNewPassErrorShaking(true)
                setTimeout(() => {
                    setNewPassErrorShaking(false)
                },1000)
            }
        }
        else if(!(/[^a-zA-Z\d\s:]/.test(passwords.password))) {
            flagged = true
            setNewPassErrorMsg('La contraseña debe contener caracteres especiales')
            setNewPassErrorDisp(true)
            if(!newPassErrorShaking) {
                setNewPassErrorShaking(true)
                setTimeout(() => {
                    setNewPassErrorShaking(false)
                },1000)
            }
        }
        else if(!(/(?=.*?[A-Z]).*/.test(passwords.password))) {
            flagged = true
            setNewPassErrorMsg('La contraseña debe contener letras mayúsculas')
            setNewPassErrorDisp(true)
            if(!newPassErrorShaking) {
                setNewPassErrorShaking(true)
                setTimeout(() => {
                    setNewPassErrorShaking(false)
                },1000)
            }
        }
        else if(!(/\d/.test(passwords.password))) {
            flagged = true
            setNewPassErrorMsg('La contraseña debe contener números')
            setNewPassErrorDisp(true)
            if(!newPassErrorShaking) {
                setNewPassErrorShaking(true)
                setTimeout(() => {
                    setNewPassErrorShaking(false)
                },1000)
            }
        }
        else if(!(/(?=.*?[a-z]).*/.test(passwords.password))) {
            flagged = true
            setNewPassErrorMsg('La contraseña debe contener letras minúsculas')
            setNewPassErrorDisp(true)
            if(!newPassErrorShaking) {
                setNewPassErrorShaking(true)
                setTimeout(() => {
                    setNewPassErrorShaking(false)
                },1000)
            }
        }
        else {
            setNewPassErrorDisp(false)
        }
        if(passwords.confirmpassword != passwords.password) {
            flagged = true
            setConfirmPassErrorDisp(true)
            if(!confirmPassErrorShaking) {
                setConfirmPassErrorShaking(true)
                setTimeout(() => {
                    setConfirmPassErrorShaking(false)
                },1000)
            }
        }
        else {
            setConfirmPassErrorDisp(false)
        }
        if(!flagged) {
            setSubmitting(true)
            axiosInstanceNoToken.put(`/users/password-reset/${resetpassid}`, {password: passwords.password})
            .then((res) => {
                setResetSuccess(true)
            })
            .catch((error) => {
                setSubmitting(false)
                console.log(error)
                toast.error(error.response.data.message)
            })
        }
    }

    const tryPassFocused = () => {
        if(passwords.password.length > 0) {
            setPassFocused(true)
        }
        else {
            setPassFocused(false)
        }
    }

    const handleTryKey = (e) => {
        if(e.key === "Enter") {
            e.preventDefault()
            submitbuttonref.current.focus()
            submitbuttonref.current.click()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleTryKey)
        return () => {
            document.removeEventListener('keydown', handleTryKey)
        }
    }, [])

    useEffect(() => {
        if(passwords.password.length < 8) {
            setPassErrorChecker((prev) => {
                return {...prev, eight: false}
            })
        }
        else {
            setPassErrorChecker((prev) => {
                return {...prev, eight: true}
            })
        }
        if(passwords.password.includes(" ")) {
            setPassErrorChecker((prev) => {
                return {...prev, space: false}
            })
        }
        else {
            setPassErrorChecker((prev) => {
                return {...prev, space: true}
            })
        }
        if(!(/[^a-zA-Z\d\s:]/.test(passwords.password))) {
            setPassErrorChecker((prev) => {
                return {...prev, special: false}
            })
        }
        else {
            setPassErrorChecker((prev) => {
                return {...prev, special: true}
            })
        }
        if(!(/(?=.*?[A-Z]).*/.test(passwords.password))) {
            setPassErrorChecker((prev) => {
                return {...prev, upper: false}
            })
        }
        else {
            setPassErrorChecker((prev) => {
                return {...prev, upper: true}
            })
        }
        if(!(/\d/.test(passwords.password))) {
            setPassErrorChecker((prev) => {
                return {...prev, number: false}
            })
        }
        else {
            setPassErrorChecker((prev) => {
                return {...prev, number: true}
            })
        }
        if(!(/(?=.*?[a-z]).*/.test(passwords.password))) {
            setPassErrorChecker((prev) => {
                return {...prev, lower: false}
            })
        }
        else {
            setPassErrorChecker((prev) => {
                return {...prev, lower: true}
            })
        }
        tryPassFocused()
    }, [passwords.password])


    return (
        <div className="papa">
            {callsuccess && 
            <>
                <div className="new-pass-cont">
                    <div className="new-pass-title-cont">
                        <h1>Restablece tu contraseña, {username}</h1>
                    </div>
                {resetSuccess ? <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", paddingTop: "3rem"}}>
                    <h2 style={{color: "white"}}>Contraseña restablecida correctamente</h2>
                    <img src={greencheck} style={{width: "5rem", marginTop: "1.25rem", marginBottom: "1.25rem"}}/>
                    <p style={{marginBottom: "1.25rem", fontSize: "1.2rem", textAlign: "center"}}>Hemos actualizado la contraseña de su cuenta, ahora puede iniciar sesión con su nueva contraseña.</p>
                    <Link to="/login"><button style={{cursor:"pointer", backgroundColor: "#43a047", borderRadius: "5px", border: "none", padding: "10px", paddingLeft: "40px", paddingRight: "40px", fontSize: "1.1rem", color: "white"}}>Iniciar sesión</button></Link>
                </div> : <>
                    <form onSubmit={handleSubmitSetNewPass} style={{padding: "1rem"}}>
                        <div style={{display: "flex", flexWrap: "wrap"}}>
                            <div className="new-pass-input-cont">
                                <label htmlFor="newpassi" className="pr-input-label">Contraseña nueva</label>
                                <div style={{display: "flex", alignItems: "center", position: "relative"}}>
                                    <input className="new-pass-input" id="newpassi" style={{paddingRight: "30px"}} onFocus={() => {tryPassFocused()}} onBlur={() => {setPassFocused(false)}} onChange={handlePasswordChange} name="password" value={passwords.password} type={seePassword ? "text" : "password"} placeholder="Introduzca su nueva contraseña"/>
                                    <EyeSlash style={{marginLeft: "-25px", color: "gray", cursor: "pointer"}} onClick={() => {setSeePassword(prev => !prev)}}/>
                                    {
                                        passFocused ? 
                                    <div style={{position: "absolute", display: "flex", flexDirection: "column", height: "10rem", width: "24.5rem", borderRadius: "5px", border: "1px solid lightgray", backgroundColor: "#FAFAFA", top: "3.8rem", padding: "10px", justifyContent: "space-around"}}>
                                        <div style={{display: "flex", alignItems: "center", color: passErrorChecker.eight ? "limegreen" : "red"}}>Password must be 8 characters or longer {passErrorChecker.eight ? <CheckCircle style={{marginLeft: "auto", color: "limegreen"}}/> : <XCircle style={{marginLeft: "auto", color: "red"}}/>}</div>
                                        <div style={{display: "flex", alignItems: "center", color: passErrorChecker.space ? "limegreen" : "red"}}>Password may not contain " " {passErrorChecker.space ? <CheckCircle style={{marginLeft: "auto", color: "limegreen"}}/> : <XCircle style={{marginLeft: "auto", color: "red"}}/>}</div>
                                        <div style={{display: "flex", alignItems: "center", color: passErrorChecker.special ? "limegreen" : "red"}}>Password must contain special characters {passErrorChecker.special ? <CheckCircle style={{marginLeft: "auto", color: "limegreen"}}/> : <XCircle style={{marginLeft: "auto", color: "red"}}/>}</div>
                                        <div style={{display: "flex", alignItems: "center", color: passErrorChecker.lower ? "limegreen" : "red"}}>Password must contain lower case letters {passErrorChecker.lower ? <CheckCircle style={{marginLeft: "auto", color: "limegreen"}}/> : <XCircle style={{marginLeft: "auto", color: "red"}}/>}</div>
                                        <div style={{display: "flex", alignItems: "center", color: passErrorChecker.upper ? "limegreen" : "red"}}>Password must contain capital letters {passErrorChecker.upper ? <CheckCircle style={{marginLeft: "auto", color: "limegreen"}}/> : <XCircle style={{marginLeft: "auto", color: "red"}}/>}</div>
                                        <div style={{display: "flex", alignItems: "center", color: passErrorChecker.number ? "limegreen" : "red"}}>Password must contain numbers {passErrorChecker.number ? <CheckCircle style={{marginLeft: "auto", color: "limegreen"}}/> : <XCircle style={{marginLeft: "auto", color: "red"}}/>}</div>
                                    </div> : <></>
                                    }
                                </div>
                                <span className={newPassErrorShaking ? "shake-anim" : ""} style={{color: "red", opacity: newPassErrorDisp ? "1" : "0", fontWeight: "600"}}>{newPassErrorMsg}</span>
                            </div>
                            <div className="new-pass-input-cont">
                                <label htmlFor="confirmpassi" className="pr-input-label">Confirme la contraseña</label>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <input className="new-pass-input" id="confirmpassi" style={{paddingRight: "30px"}} onChange={handlePasswordChange} name="confirmpassword" value={passwords.confirmpassword} type={seeConfirmPassword ? "text" : "password"} placeholder="Confirme su nueva contraseña"/>
                                    <EyeSlash style={{marginLeft: "-25px", color: "gray", cursor: "pointer"}} onClick={() => {setSeeConfirmPassword(prev => !prev)}}/>
                                </div>
                                <span className={newPassErrorShaking || confirmPassErrorShaking ? "shake-anim" : ""} style={{color: "red", opacity: confirmPassErrorDisp ? "1" : "0", fontWeight: "600"}}>Las contraseñas no coinciden</span>
                            </div>
                        </div>
                        <button ref={submitbuttonref} disabled={submitting} className="new-pass-submit-btn">RESTABLECER CONTRASEÑA</button>
                    </form>
                </>}    
                </div>
            </>
            }
        </div>
    )
}


export default PasswordResetNewPass