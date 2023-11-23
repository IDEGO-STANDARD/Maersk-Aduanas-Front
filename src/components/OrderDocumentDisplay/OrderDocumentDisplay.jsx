import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import "./OrderDocumentDisplay.css";

const OrderDocumentDisplay = ({ document, handleChangeDocument, handleSaveDocumentChanges, loading}) => {

    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                    <DataDisplay minwidth="30%" data={document.data} handleChangeData={handleChangeDocument}/>
                    <button disabled={loading} className="odocd-save-changes-button" onClick={handleSaveDocumentChanges}>Guardar cambios</button>
                </div>
                <div className="od-fields-cont">
                    <embed className="odocd-embed" src={document.url} />
                </div>
            </div>
        </>
    )
}

export default OrderDocumentDisplay;
