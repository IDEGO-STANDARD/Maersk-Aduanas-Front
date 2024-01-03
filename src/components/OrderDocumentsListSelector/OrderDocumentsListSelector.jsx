import { useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { Trash, ArrowReturnLeft } from 'react-bootstrap-icons';
import "./OrderDocumentsListSelector.css";

const OrderDocumentsListSelector = ({ documents, documentid, setDocumentid, order }) => {
    const [searchTerm, setSearchTerm] = useState('')
   
    const [showComponent, setShowComponent] = useState(null)
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [selectedReclassification, setSelectedReclassification] = useState(null)

    const clearDocumentSelection = () => {
        setSelectedDocument(null)
        setShowComponent(null)
        setSelectedReclassification(null)
    }

    const handleDelete = (index) => {
        console.log(documents[index])
        clearDocumentSelection()
        if (showComponent !== 'delete' || documents[index] !== selectedDocument) {
            setSelectedDocument(documents[index]);
            setShowComponent('delete');
        }
    }

    const handleReclassify = (index) => {
        clearDocumentSelection()
        if (showComponent !== 'reclassify' || documents[index] !== selectedDocument) {
            setSelectedDocument(documents[index])
            setShowComponent('reclassify')
        }
    }

    const handleConfirmAction = () => {
        console.log(selectedDocument)
        if (showComponent === 'delete') {
            if (selectedDocument && selectedDocument.confirmedToDelete) {
                console.log(`Deleting document: ${selectedDocument.name}`);
            } else {
                console.log("Deletion not confirmed");
            }
        } else if (showComponent === 'reclassify') {
            console.log(`Reclassifying document to: ${selectedReclassification}`);
        }
        clearDocumentSelection();
    }
    
    const TrashIcon = <Trash />
    const ReclassifyIcon = <ArrowReturnLeft />
    const filteredDocuments = documents.filter(doc => doc.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    return (
        <>
            {showComponent && (
            <div className={showComponent === 'delete' ? 'delete-confirmation' : 'reclassify-options'}>
                {showComponent === 'delete' ? (
                    <>
                        <p>¿Eliminar el documento "{selectedDocument.name}"?</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedDocument?.confirmedToDelete || false}
                                onChange={() => setSelectedDocument({
                                    ...selectedDocument,
                                    confirmedToDelete: !selectedDocument?.confirmedToDelete
                                })}
                            />
                            Confirmar
                        </label>
                    </>
                ) : (
                    <>
                        <p>Seleccione la nueva clasificación de "{selectedDocument.name}":</p>
                        {/* Dropdown list for reclassification options */}
                        <select value={selectedReclassification} onChange={(e) => setSelectedReclassification(e.target.value)}>
                            <option value="">Seleccione una opción</option>
                            {/* Render your reclassification options dynamically based on your data */}
                            { order.documents.map((docutype, index) => (
                                <option key={index} value={docutype.type}>{docutype.type}</option>
                            ))}
                        </select>
                    </>
                )}
                <div className="button-container">
                    <button onClick={handleConfirmAction}>Confirmar</button>
                    <button onClick={clearDocumentSelection}>Cerrar</button>
                </div>
            </div>
        )}
            {/* Changes: Either delete or Reclassify components */}
            <div id="list-selector" className="list-selector-main-cont">
                <div className="list-selector-search-bar-container">
                    <input type="text" className="list-selector-search-bar" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="list-selector-list-container">
                    {filteredDocuments.length > 0 ? filteredDocuments.map((doc, index) => (
                        <div key={index} className={`list-selector-tab-cont ${index === documentid ? 'list-selector-tab-cont-active' : ''}`} onClick={() => setDocumentid(index)}>
                            {doc.name}
                            <div className="sub-buttons">
                                <button className="sub-button" onClick={() => handleDelete(index)}>
                                    {TrashIcon}
                                </button>
                                <button className="sub-button" onClick={() => handleReclassify(index)}>
                                    {ReclassifyIcon}
                                </button>
                            </div>
                        </div>
                    )) : <span>No hay documentos</span>}
                </div>
            </div>
        </>
    )
}

export default OrderDocumentsListSelector;
