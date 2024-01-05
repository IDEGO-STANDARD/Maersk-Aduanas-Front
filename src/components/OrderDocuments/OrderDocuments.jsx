import { useOutletContext, useParams } from "react-router-dom"
import { useState } from "react"
import OrderDocumentDisplay from "../OrderDocumentDisplay/OrderDocumentDisplay"
import PageReload from "../PageReload/PageReload"
import Tabber from "../Tabber/Tabber"
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast"
import "./OrderDocuments.css"
import { useEffect } from "react"
import OrderDocumentFullscreenView from "../OrderDocumentFullscreenView/OrderDocumentFullscreenView"

const OrderDocuments = () => {
    const { docutype } = useParams()
    const [order, documentid, setDocumentid, handleChangeOrder, handleChangeDocument, handleChangeSubDocument, handleChangeValidationData, refreshData] = useOutletContext()

    const [loading, setLoading] = useState(false)

    const [isFullscreen, setIsFullscreen] = useState(false)

    const documentToDisplay = order.documents.find((document) => document.type === docutype)

    useEffect(() => {
        setDocumentid(0)
    }, [docutype])

    const handleSaveDocumentChanges = (docindex, id) => {
        setLoading(true)
        const docid = id ? id : 0
        const docqueryparam = `id=${order.id}&docid=${docid}&type=${documentToDisplay.type}`
        console.log(docqueryparam)
        axiosPythonInstance.post(`/validarCampos?${docqueryparam}`, {
            data: documentToDisplay.documents[docindex].data,
            nestedData: documentToDisplay.documents[docindex].nestedData
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

    const handleDocumentChange = (itemName, newCheckedValue, newValue, documentid) => {
        handleChangeDocument(docutype, itemName, newCheckedValue, newValue, documentid);
    }

    const handleSubDocumentChange = (itemid, newCheckedValue, newData, documentid) => {
        handleChangeSubDocument(docutype, itemid, newCheckedValue, newData, documentid);
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    const openAllDocs = () => {
        const openList = order.documents.flatMap((doctype, index) => {
            return doctype.documents.filter((doc) => !doc.isDummy)
                .map((doc) => (doc.url))
        })
        openList.forEach((url) => {
            window.open(url, '_blank')
        })
    }
    

    return (
        <>
            <div className="fullscreen-button" >
                <button onClick={toggleFullscreen}>
                    Vista Maximizada
                </button>
                <button onClick={openAllDocs}>
                    Abrir todos
                </button>
            </div>
            {isFullscreen && (
                <OrderDocumentFullscreenView onClose={toggleFullscreen} isFullscreen={isFullscreen} order={order} />
            )}
            <Tabber order={order} onClickSet={setDocumentid} />
            <OrderDocumentDisplay
                docutype={docutype}
                documents={documentToDisplay?.documents}
                documentid={documentid}
                setDocumentid={setDocumentid}
                handleChangeDocument={handleDocumentChange}
                handleSubDocumentChange={handleSubDocumentChange}
                handleSaveDocumentChanges={handleSaveDocumentChanges}
                loading={loading}
                order={order}
                refreshData={refreshData}
            />
        </>
    )
}

export default PageReload(OrderDocuments, "docutype");
