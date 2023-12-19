import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import "./OrderDocumentDisplay.css";
import { UserContext } from "../../context/UserContext";

const OrderDocumentDisplay = ({ documents, documentid, setDocumentid, handleChangeDocument, handleSaveDocumentChanges, loading }) => {

    const { hasPermission } = useContext(UserContext)
    const createEmbedUrl = (url) => {
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True`
    }
    const document = documents[documentid] || documents[0]
    const documentids = documents.length
    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                    <div className="od-buttons-cont">
                        {documentids > 1 &&
                            documents.map((_, index) => (
                                <button
                                    key={index}
                                    className={`od-button ${index === documentid ? 'od-button-active' : ''}`}
                                    onClick={() => setDocumentid(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                    </div>
                    <DataDisplay minwidth="30%" data={document.data} handleChangeData={handleChangeDocument} edit={hasPermission("4")} documentid={documentid} />
                    {hasPermission("4") && <button disabled={loading} className="odocd-save-changes-button" onClick={() => handleSaveDocumentChanges(documentid, document.id)}>Guardar cambios</button>}
                </div>
                <div className="od-fields-cont">
                    {/\.xls[xm]?$/.test(document.url) ? (
                        <iframe className="odocd-embed" style={{ overflow: 'hidden', border: 'none' }} src={createEmbedUrl(document.url)}></iframe>
                    ) : (
                        <embed className="odocd-embed" src={document.url} />
                    )}
                </div>
            </div>
        </>
    )
}

export default OrderDocumentDisplay;
