import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import "./OrderDocumentFullscreenView.css"; // Create a separate CSS file for styling

const OrderDocumentFullscreenView = ({ children, onClose, isFullscreen, order }) => {

    const { docutype } = useParams()

    const [documentType, setDocumentType] = useState(docutype)
    const [documentid, setDocumentid] = useState(0)
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const documentToDisplay = order.documents.find((document) => document.type === documentType)

    const document = documentToDisplay?.documents ? documentToDisplay?.documents[documentid] || documentToDisplay?.documents[0] : {}

    const createEmbedUrl = (url) => {
        const isExcel = /\.(xlsx?|xlsm)$/i.test(url);
        const isWord = /\.(docx?|docm)$/i.test(url);    
    
        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True` +
            (isExcel ? '' : (isWord ? '&wdWord=1' : ''));
    }

    return (
        <div className={`fullscreen-view ${isFullscreen ? "active" : ""}`}>
            <div className="fullscreen-popup">
                <button className="close-button" onClick={onClose}>
                    Cerrar Vista Maximizada
                </button>
                <div className="content">
                    {/* {children} */}
                    <div className="document-dropdown">
                        {dropdownVisible && order.documents.map((docType) => (
                            !docType.documents[0]?.isDummy && (
                                <div key={docType.type} className="doc-type">
                                    <div
                                        onClick={() => {
                                            setDocumentType(docType.type)
                                            setDocumentid(0)
                                        }}
                                    >
                                        {docType.type}
                                    </div>
                                    {docType.type === documentType && (
                                        <ul className="doc-list">
                                            {docType.documents?.map(
                                                (doc, index) =>
                                                    doc.isDummy === false && (
                                                        <li
                                                            key={doc.id}
                                                            onClick={() => {
                                                                setDocumentType(docType.type)
                                                                setDocumentid(index)
                                                            }}
                                                        >
                                                            {doc.name || `${docType.type} ${index + 1}`}
                                                        </li>
                                                    )
                                            )}
                                        </ul>
                                    )}
                                </div>)
                        ))}
                        <button className="toggle-dropdown-button"
                            onClick={() => setDropdownVisible((prev) => !prev)}
                        >
                            {dropdownVisible ? "Esconder documentos" : "Mostrar documentos"}
                        </button>
                    </div>
                    <div className={`od-fields-cont od-fields-cont-embed`}>
                        {document?.isDummy ? <span className="odocd-embed dummy-document">No hay Documento</span> :
                            /\.(xlsx?|docx?)$/i.test(document.url)
                                ? <iframe className="odocd-embed" style={{ overflow: 'hidden', border: 'none' }} src={createEmbedUrl(document.url)}></iframe>
                                : <embed className="odocd-embed" src={document.url} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDocumentFullscreenView;
