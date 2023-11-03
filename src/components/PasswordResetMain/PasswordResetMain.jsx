import { useState } from "react"
import axiosInstanceNoToken from "../../axiosInstance/axiosInstanceNoToken"
import logomaersk from "../../assets/logomaersk.png"
import PasswordResetInput from "../PasswordResetInput/PasswordResetInput"
import PasswordResetCode from "../PasswordResetCode/PasswordResetCode"
import "./PasswordResetMain.css"
import { toast } from "react-hot-toast"

function PasswordResetMain() {

    const [prStage, setPrStage] = useState(false)
    const [prEmail, setPrEmail] = useState("")

    const handleChangePrEmail = (e) => {
        setPrEmail(e.target.value)
    }
    
    const handlePrGoBack = () => {
        setPrStage(false)
        toast.dismiss()

    }

    const handlePrSubmit = (e) => {
        e.preventDefault()
        if(prEmail.length > 1) {
            setPrStage(true)
            toast.dismiss()
            axiosInstanceNoToken.post("/users/password-reset/create-user-code", {email: prEmail})
        }
        else {
            toast.error("Introduzca su dirección de correo electrónico")
        }
    }

    return (
        <div className="pr-main-cont">
            <div className="pr-main">
                <img className="pr-img" src={logomaersk} loading="lazy"/>
                <span className="pr-i-title">Cambio de contraseña</span>
                {!prStage ? <PasswordResetInput handleChangePrEmail={handleChangePrEmail} prEmail={prEmail} handlePrSubmit={handlePrSubmit} /> : <PasswordResetCode handlePrGoBack={handlePrGoBack} prEmail={prEmail}/>}
            </div>
        </div>
    )
}


export default PasswordResetMain