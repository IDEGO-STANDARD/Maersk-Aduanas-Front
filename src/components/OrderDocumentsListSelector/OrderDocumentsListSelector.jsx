import { useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { Trash, Trash2, FileX, XCircle, ArrowReturnLeft, ArrowRepeat, ArrowClockwise } from 'react-bootstrap-icons';
import "./OrderDocumentsListSelector.css";

const OrderDocumentsListSelector = ({ documents, documentid, setDocumentid }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleDelete = (index) => {
        console.log(`Delete document at index ${index}`);
    }

    const handleReclassify = (index) => {
        console.log(`Reclassify document at index ${index}`);
    }
    const TrashIcon = <Trash />
    const ReclassifyIcon = <ArrowReturnLeft />
    const filteredDocuments = documents.filter(doc => doc.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    return (
        <>
            {/* Changes: Either delete or Reclassify components */}
            <div id="list-selector" className="list-selector-main-cont">
                <div className="list-selector-search-bar-container">
                    <input type="text" className="list-selector-search-bar" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="list-selector-list-container">
                    {filteredDocuments.length > 0 ? filteredDocuments.map((doc, index) => (
                        <div key={index} className={`list-selector-tab-cont ${index === documentid ? 'list-selector-tab-cont-active' : ''}`} onClick={() => setDocumentid(index)}>
                            {doc.name}
                            {/* <div className="sub-buttons">
                                <button className="sub-button" onClick={() => handleDelete(index)}>
                                    {TrashIcon}
                                </button>
                                <button className="sub-button" onClick={() => handleReclassify(index)}>
                                    {ReclassifyIcon}
                                </button>
                            </div> */}
                        </div>
                    )) : <span>No hay documentos</span>}
                </div>
            </div>
        </>
    )
}

export default OrderDocumentsListSelector;
