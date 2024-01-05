import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import "./OrderDocumentFullscreenView.css"; // Create a separate CSS file for styling

const OrderDocumentFullscreenView = ({ children, onClose, isFullscreen, order }) => {

    const { docutype } = useParams()

    const [docuType, setdocuType] = useState(docutype)
    const [docuid, setdocuid] = useState(0)
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const docuToDisplay = order.documents.find((docu) => docu.type === docuType)

    const docu = docuToDisplay?.documents ? docuToDisplay?.documents[docuid] || docuToDisplay?.documents[0] : {}

    const createEmbedUrl = (url) => {
        const isExcel = /\.(xlsx?|xlsm)$/i.test(url);
        const isWord = /\.(docx?|docm)$/i.test(url);

        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True` +
            (isExcel ? '' : (isWord ? '&wdWord=1' : ''));
    }

    const dropdownRef = useRef();

    useEffect(() => {
        if (dropdownRef.current) {
            document.documentElement.style.setProperty('--docu-dropdown-height', dropdownRef.current.offsetHeight + 'px');
        }
    }, [dropdownVisible]);

    return (
        <div className={`fullscreen-view ${isFullscreen ? "active" : ""}`}>
            <div className="fullscreen-popup">
                <button className="fullscreen-close-button" onClick={onClose}>
                    Cerrar Vista Maximizada
                </button>
                <div className="content">
                    {/* {children} */}
                    <div className="document-dropdown" ref={dropdownRef}>
                        {dropdownVisible && order.documents.map((docType) => (
                            !docType.documents[0]?.isDummy && (
                                <div key={docType.type} className="doc-type">
                                    <div
                                        onClick={() => {
                                            setdocuType(docType.type)
                                            setdocuid(0)
                                        }}
                                    >
                                        {docType.type} ({docType.documents.length})
                                    </div>
                                    {docType.type === docuType && (
                                        <ul className="doc-list">
                                            {docType.documents?.map(
                                                (doc, index) =>
                                                    doc.isDummy === false && (
                                                        <li
                                                            key={doc.id}
                                                            onClick={() => {
                                                                setdocuType(docType.type)
                                                                setdocuid(index)
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
                            {dropdownVisible ? "Esconder Documentos" : "Mostrar Documentos"}
                        </button>
                    </div>
                    <div className={`od-fields-cont od-fields-cont-embed`} >
                        {docu?.isDummy ? <span className="odocd-embed dummy-docu">No hay documentos</span> :
                            /\.(xlsx?|docx?)$/i.test(docu.url)
                                ? <iframe className="odocd-embed" style={{ overflow: 'hidden', border: 'none' }} src={createEmbedUrl(docu.url)}></iframe>
                                : <embed className="odocd-embed" src={docu.url} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDocumentFullscreenView;
