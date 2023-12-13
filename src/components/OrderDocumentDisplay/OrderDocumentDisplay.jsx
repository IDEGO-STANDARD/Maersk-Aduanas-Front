import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import "./OrderDocumentDisplay.css";
import { UserContext } from "../../context/UserContext";

const OrderDocumentDisplay = ({ document, handleChangeDocument, handleSaveDocumentChanges, loading }) => {

    const { hasPermission } = useContext(UserContext)
    const createEmbedUrl = (url) => {
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True`
    }

    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                    <DataDisplay minwidth="30%" data={document.data} handleChangeData={handleChangeDocument} edit={hasPermission("4")} />
                    {hasPermission("4") && <button disabled={loading} className="odocd-save-changes-button" onClick={handleSaveDocumentChanges}>Guardar cambios</button>}
                </div>
                <div className="od-fields-cont">
                    {/\.xls[xm]?$/.test(document.url) ? (
                        <iframe className="odocd-embed" style={{overflow: 'hidden', border: 'none'}}  src={createEmbedUrl(document.url)}></iframe>
                    ) : (
                        <embed className="odocd-embed" src={document.url} />
                    )}
                </div>
            </div>
        </>
    )
}

export default OrderDocumentDisplay;
