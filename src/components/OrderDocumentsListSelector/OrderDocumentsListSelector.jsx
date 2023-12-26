import { useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import "./OrderDocumentsListSelector.css";

const OrderDocumentsListSelector = ({ documents, documentid, setDocumentid }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredDocuments = documents.filter(doc => doc.name?.toLowerCase().includes(searchTerm.toLowerCase()))

    console.log(filteredDocuments)

    return (
        <>
            <div id="list-selector" className="list-selector-main-cont">
                <div className="list-selector-search-bar-container">
                    <input type="text" className="list-selector-search-bar" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="list-selector-list-container">
                    {filteredDocuments.length > 0 ? filteredDocuments.map((doc, index) => (
                        <button key={index} className={`list-selector-tab-cont ${index === documentid ? 'list-selector-tab-cont-active' : ''}`} onClick={() => setDocumentid(index)}>
                            {doc.name}
                        </button>
                    )) : <span>No hay documentos</span>}
                </div>
            </div>
        </>
    )
}

export default OrderDocumentsListSelector;
