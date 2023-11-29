
import "./ConfirmationPopup.css"


function ConfirmationPopup({cancelfunc, acceptfunc, text, submitting}) {

    const handleClose = (e) => {
        if(e.target.id === "outside-cont-confirm") {
            cancelfunc()
        }
    }


    return (
        <div className="confirmation-outside-cont"  id="outside-cont-confirm" onClick={handleClose}>
            <div className="confirmation-main-cont">
                <span className="confirmation-text">{text}</span>
                <div className="confirmation-buttons-cont">
                    <button className="confirmation-cancel" disabled={submitting} id="outside-cont-confirm" onClick={handleClose}>Cancelar{/* <XCircleFill /> */}</button>
                    <button className="confirmation-accept" disabled={submitting} onClick={acceptfunc}>Aceptar{/* <CheckCircleFill /> */}</button>
                </div>
            </div>
            
        </div>
    )
}


export default ConfirmationPopup