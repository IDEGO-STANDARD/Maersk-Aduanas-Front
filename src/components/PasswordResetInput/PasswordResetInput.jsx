import { Link } from "react-router-dom"
import "./PasswordResetInput.css"


function PasswordResetInput({handlePrSubmit, prEmail, handleChangePrEmail}) {

    return (
        <>
            <div className="pr-i-infobox">
                <span style={{marginBottom: "10px"}}>Introduzca su dirección de correo electrónico.</span>
                <span>Si la dirección de correo electrónico introducida está asociada a una cuenta, recibirá un mensaje con instrucciones sobre cómo proceder.</span>
            </div>
            <form className="pr-i-formbox" onSubmit={handlePrSubmit}>
                <label className="pr-i-i" htmlFor="pr-i">Dirección de correo electrónico</label>
                <input className="pr-e-input" id="pr-i" value={prEmail} onChange={handleChangePrEmail} type="email" placeholder="Introduzca su dirección de correo electrónico"></input>
                <button className="pr-submit-button">RESTABLECER MI CONTRASEÑA</button>
            </form>
            <Link className="pr-code-go-login" to="/login"><span>Volver a la página de inicio de sesión</span></Link>
        </>
    )
}

export default PasswordResetInput