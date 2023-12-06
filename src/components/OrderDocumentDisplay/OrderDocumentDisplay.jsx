import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import "./OrderDocumentDisplay.css";
import { UserContext } from "../../context/UserContext";

const OrderDocumentDisplay = ({ document, handleChangeDocument, handleSaveDocumentChanges, loading}) => {

    const {userdata} = useContext(UserContext)

    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                    <DataDisplay minwidth="30%" data={document.data} handleChangeData={handleChangeDocument} edit={userdata.permisos.includes("4")} />
                    {userdata.permisos.includes("4") && <button disabled={loading} className="odocd-save-changes-button" onClick={handleSaveDocumentChanges}>Guardar cambios</button>}
                </div>
                <div className="od-fields-cont">
                    <embed className="odocd-embed" src={document.url} />
                </div>
            </div>
        </>
    )
}

export default OrderDocumentDisplay;
