import { useOutletContext, useParams } from "react-router-dom";
import { useState } from "react";
import OrderDocumentDisplay from "../OrderDocumentDisplay/OrderDocumentDisplay";
import PageReload from "../PageReload/PageReload";
import Tabber from "../Tabber/Tabber";
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast";
import "./OrderDocuments.css";

const OrderDocuments = () => {
    const { docutype } = useParams()
    const [order, handleChangeOrder, handleChangeDocument] = useOutletContext()

    const [loading, setLoading] = useState(false)


    const documentToDisplay = order.documents.find((document) => document.type === docutype)

    const handleSaveDocumentChanges = () => {
        setLoading(true)
        axiosPythonInstance.post(`/validarCampos?id=${order.id}&type=${documentToDisplay.type}`, {
            data: documentToDisplay.documents[0].data
        })
        .then((res) => {
            setLoading(false)
            toast.success("Campos guardados correctamente")
        })
        .catch((error) => {
            setLoading(false)
            console.error("ERROR", error)
            toast.error(error.response.data.error)
        })
    }

    console.log(documentToDisplay)

    const handleDocumentChange = (itemName, newCheckedValue, newValue) => {
        handleChangeDocument(docutype, itemName, newCheckedValue, newValue);
    }


    return (
        <>
            <Tabber order={order} />
            <OrderDocumentDisplay 
                document={documentToDisplay.documents[0]} 
                handleChangeDocument={handleDocumentChange}
                handleSaveDocumentChanges={handleSaveDocumentChanges}
                loading={loading}
            />
        </>
    )
}

export default PageReload(OrderDocuments, "docutype");
