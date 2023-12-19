import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import OrderDocumentDisplay from "../OrderDocumentDisplay/OrderDocumentDisplay";
import PageReload from "../PageReload/PageReload";
import Tabber from "../Tabber/Tabber";
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast";
import "./OrderDocuments.css";
import { useEffect } from "react";

const OrderDocuments = () => {
    const { docutype } = useParams()
    const [order, documentid, setDocumentid, handleChangeOrder, handleChangeDocument] = useOutletContext()

    const [loading, setLoading] = useState(false)

    const documentToDisplay = order.documents.find((document) => document.type === docutype)

    useEffect(() => {
        setDocumentid(0)
    }, [docutype])

    const handleSaveDocumentChanges = (docindex, id) => {
        setLoading(true)
        const docid = id ? id : 0
        const docqueryparam = `id=${order.id}&docid=${docid}&type=${documentToDisplay.type}`
        console.log(documentToDisplay.documents[docindex].data)
        axiosPythonInstance.post(`/validarCampos?${docqueryparam}`, {
            data: documentToDisplay.documents[docindex].data
        })
        .then((res) => {
            console.log(res)
            setLoading(false)
            toast.success("Campos guardados correctamente")
        })
        .catch((error) => {
            setLoading(false)
            console.error("ERROR", error)
            toast.error(error.response?.data?.error || "Error guardando cambios")
        })
    }

    const handleDocumentChange = (itemName, newCheckedValue, newValue) => {
        handleChangeDocument(docutype, itemName, newCheckedValue, newValue);
    }


    return (
        <>
            <Tabber order={order} onClickSet={setDocumentid}/>
            <OrderDocumentDisplay 
                documents={documentToDisplay.documents} 
                documentid={documentid}
                setDocumentid={setDocumentid}
                handleChangeDocument={handleDocumentChange}
                handleSaveDocumentChanges={handleSaveDocumentChanges}
                loading={loading}
            />
        </>
    )
}

export default PageReload(OrderDocuments, "docutype");
