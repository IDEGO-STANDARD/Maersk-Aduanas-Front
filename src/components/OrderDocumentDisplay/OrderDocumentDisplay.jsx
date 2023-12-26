import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import "./OrderDocumentDisplay.css";
import { UserContext } from "../../context/UserContext";
import OrderDocumentsListSelector from "../OrderDocumentsListSelector/OrderDocumentsListSelector";
import OrderDocumentDisplaySubdata from "../OrderDocumentDisplaySubdata/OrderDocumentDisplaySubdata";

const OrderDocumentDisplay = ({ docutype, documents, documentid, setDocumentid, handleChangeDocument, handleSubDocumentChange, handleSaveDocumentChanges, loading }) => {

    const { hasPermission } = useContext(UserContext)
    const createEmbedUrl = (url) => {
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True`
    }
    const document = documents ? documents[documentid] || documents[0] : {}
    const documentids = documents?.length

    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                        {docutype !== "Otros" ? (<>
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
                            <DataDisplay minwidth="30%" data={document.data} handleChangeData={handleChangeDocument} documentid={documentid} edit={hasPermission("4")} />
                            {docutype === "Bill of Landing" && <OrderDocumentDisplaySubdata subDocName={"Contenedor:"} nestedData={document?.nestedData} handleChangeData={handleSubDocumentChange} documentid={documentid} edit={hasPermission("4")} />}
                            {hasPermission("4") && <button disabled={loading} className="odocd-save-changes-button" onClick={() => handleSaveDocumentChanges(documentid, document.id)}>Guardar cambios</button>}
                        </>) : <OrderDocumentsListSelector documents={documents} documentid={documentid} setDocumentid={setDocumentid} handleChangeData={handleChangeDocument} />}
                </div>
                <div className={`od-fields-cont ${document?.isDummy && "od-fields-cont-dummy"}`}>
                    {document?.isDummy ? <span className="odocd-embed dummy-document">No hay Documento</span> :
                        /\.xls[xm]?$/.test(document.url) ? <iframe className="odocd-embed" style={{ overflow: 'hidden', border: 'none' }} src={createEmbedUrl(document.url)}></iframe> :
                            <embed className="odocd-embed" src={document.url} />
                    }
                </div>
            </div>
        </>
    )
}

export default OrderDocumentDisplay;
