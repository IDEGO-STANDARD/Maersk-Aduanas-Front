import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Select from 'react-select';
import DataDisplay from "../DataDisplay/DataDisplay";
import "./OrderDocumentDisplay.css";
import { UserContext } from "../../context/UserContext";
import OrderDocumentsListSelector from "../OrderDocumentsListSelector/OrderDocumentsListSelector";
import OrderDocumentDisplaySubdata from "../OrderDocumentDisplaySubdata/OrderDocumentDisplaySubdata";

const OrderDocumentDisplay = ({ docutype, documents, documentid, setDocumentid, handleChangeDocument, handleSubDocumentChange, handleSaveDocumentChanges, loading, order, refreshData }) => {

    const { hasPermission } = useContext(UserContext)
    const createEmbedUrl = (url) => {
        const isExcel = /\.(xlsx?|xlsm)$/i.test(url);
        const isWord = /\.(docx?|docm)$/i.test(url);

        return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True` +
            (isExcel ? '' : (isWord ? '&wdWord=1' : ''));
    }

    const document = documents ? documents[documentid] || documents[0] : {}
    const documentids = documents?.length
    const documentOptions = documents.map((_, index) => ({ value: index, label: `${docutype} ${index + 1}` }));
    const customDropdownStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#3498db',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
                backgroundColor: '#2980b9',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#fff',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#27ae60' : provided.backgroundColor,
        }),
    }
    return (
        <>
            <div className="od-split-div">
                <div className={`od-fields-cont ${docutype === "Otros" ? "od-fields-cont-dummy" : ""}`}>
                    {docutype !== "Otros" ? (<>
                        <div className="od-buttons-cont">
                            {documentids > 5 ? (
                                <Select
                                    value={documentOptions.find(option => option.value === documentid)}
                                    onChange={selectedOption => setDocumentid(selectedOption.value)}
                                    options={documentOptions}
                                    styles={customDropdownStyles}
                                />
                            ) : (
                                documentids > 1 &&
                                documents.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`od-button ${index === documentid ? 'od-button-active' : ''}`}
                                        onClick={() => setDocumentid(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))
                            )}
                        </div>
                        <DataDisplay minwidth="30%" data={document.data} handleChangeData={handleChangeDocument} documentid={documentid} edit={hasPermission("4")} />
                        {docutype === "Bill of Landing" && <OrderDocumentDisplaySubdata subDocName={"Contenedor:"} nestedData={document?.nestedData} handleChangeData={handleSubDocumentChange} documentid={documentid} edit={hasPermission("4")} />}
                        {hasPermission("4") && <button disabled={loading} className="odocd-save-changes-button" onClick={() => handleSaveDocumentChanges(documentid, document.id)}>Guardar cambios</button>}
                    </>) : <OrderDocumentsListSelector documents={documents} documentid={documentid} setDocumentid={setDocumentid} handleChangeData={handleChangeDocument} order={order} refresh={refreshData} />}
                </div>
                <div className={`od-fields-cont od-fields-cont-embed ${document?.isDummy ? "od-fields-cont-dummy" : ""}`}>
                    {document?.isDummy ? <span className="odocd-embed dummy-document">No hay Documento</span> :
                        /\.(xlsx?|docx?)$/i.test(document.url)
                            ? <iframe className="odocd-embed" style={{ overflow: 'hidden', border: 'none' }} src={createEmbedUrl(document.url)}></iframe>
                            : <embed className="odocd-embed" src={document.url} />
                    }
                </div>
            </div>
        </>
    )
}

export default OrderDocumentDisplay;
