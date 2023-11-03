import { useNavigate } from "react-router-dom";
import axiosInstanceNoToken from "../../axiosInstance/axiosInstanceNoToken"
import { useState, useRef, useEffect } from "react"
import toast from 'react-hot-toast';
import "./PasswordResetCode.css"


function PasswordResetCode({prEmail, handlePrGoBack}) {

    let navigate = useNavigate()

    const [prCode, setPrCode] = useState(["", "", "", "", "", ""])
    const [submitting, setSubmitting] = useState(false)
    const [allowCtrlZ, setAllowCtrlZ] = useState(true)

    useEffect(() => {
        if(!allowCtrlZ) {
            document.addEventListener('keydown', handleTryKey)
            return () => {
                document.removeEventListener('keydown', handleTryKey)
            }
        }
    }, [allowCtrlZ])

    const handleTryKey = (e) => {
        if(e.ctrlKey && e.keyCode === 90) {
            e.preventDefault()
            toast.dismiss()
            toast("El evento de deshacer fue desactivado porque previamente pegaste un código en la caja de entrada de código.", {
                icon: "⚠️"
            })
        }
    }

    console.log(prCode)

    const inputRefs = useRef([])

    const handlePaste = (e) => {
        e.preventDefault()
        setAllowCtrlZ(false)
        const pastedValue = e.clipboardData.getData("text/plain").slice(0, 6)
        for(let i = 0; i < 6; i++) {
            if(pastedValue[i] === " ") {
                toast.dismiss()
                toast.error("No se pueden pegar cadenas que incluyan espacios vacíos.")
                return;
            }
        }
        setPrCode(prCode.map((prevchar, i) => {
            if(pastedValue[i]) {
                return pastedValue[i]
            }
            else {
                return prevchar
            }
        }))
        inputRefs.current[pastedValue.length - 1].focus()
    }

    const handleChangeCode = (e,i) => {
        const newval = e.target.value
        if(newval === " ") {
            return;
        }
        setPrCode((prev) => {
            const newarr = [...prev]
            newarr[i] = e.target.value
            return newarr
        })
        if(inputRefs.current[i+1] && e.target.value != "") {
            inputRefs.current[i+1].focus()
        }
    }

    const handleKeyDown = (e, i) => {
        if(e.key === "Backspace" && e.target.value === "") {
            if(inputRefs.current[i-1]) {
                inputRefs.current[i-1].focus()
            } 
        }
    }

    const handleInputClick = (i) => {
        const inputel = inputRefs.current[i]
        setTimeout(() => {inputel.setSelectionRange(inputel.value.length, inputel.value.length)}, 0);
    }

    const handleCodeSubmit = (e) => {
        e.preventDefault()
        const code = prCode.join("")
        console.log(code.length)
        if(code.length < 6 ) {
            toast.dismiss()
            toast.error("Introduzca un código válido")
        }
        else {
            setSubmitting(true)
            axiosInstanceNoToken.post("/users/password-reset/create-route", {code: code, email: prEmail})
            .then((res) => {
                console.log(res.data)
                navigate(`/passwordreset/${res.data.data.route}`)
            })
            .catch((error) => {
                console.log(error)
                setSubmitting(false)
                toast.dismiss()
                toast.error(error.response.data.message)
            })
        }
    }

    return (
        <>  
            <div className="pr-c-infobox">
                <span>Si el correo electrónico <b>{prEmail}</b> está asociado a una cuenta, deberías haber recibido un correo electrónico con un código de 6 dígitos. Introduzca el código a continuación.</span>
            </div>
            <span className="pr-code-change-email" onClick={handlePrGoBack}>¿Dirección de correo electrónico equivocada?</span>
            <form onSubmit={handleCodeSubmit}>
                <div className="pr-code-input-cont">
                    {Array(6).fill().map((char, i) => {
                        return <input className="pr-code-input" spellCheck="false" autoComplete="off" key={i} ref={(element) => inputRefs.current.push(element)} name={i} value={prCode[i]} maxLength="1" type="text" onChange={(e) => handleChangeCode(e,i)} onKeyDown={(e) => handleKeyDown(e,i)} onPaste={handlePaste} onClick={() => {handleInputClick(i)}} style={{marginRight: i === 5 ? "none" : "5px" }}></input>
                    })}
                </div>
                <button className="pr-code-submit-button" disabled={submitting}>ENVIAR CÓDIGO</button>
            </form>
        </>
    )
}

export default PasswordResetCode 