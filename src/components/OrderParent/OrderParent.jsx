import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeFill } from "react-bootstrap-icons"
import DataDisplay from "../DataDisplay/DataDisplay";
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast";
import "./OrderParent.css";

const OrderParent = ({}) => {

    const { ordtype, ordnumber, docutype } = useParams();
    const nav = useNavigate()
    const [order, setOrder] = useState("")
    const [documentid, setDocumentid] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        axiosInstance.get(`/orden?id=${ordnumber}`)
        .then((res) => {
            console.log("response", res.data)
            const updatedData = res.data.data.map(item => {
                if (item.name === "Resumen mercancía") {
                    const newItem = { ...item }
                    newItem.value = newItem.value === '' ? 'Otros' : newItem.value
                    console.log(newItem)
                    return newItem
                } else {
                    return { ...item }
                }
            })
            setOrder({ ...res.data, data: updatedData })
            
            console.log("res.data.idSintad")
            console.log(res.data.idSintad)
            console.log(updatedData)
        })
        .catch((error) => {
            console.error("ERROR", error)
            toast.error(error.response.data.error)
        })
    }, [])

    const handleChangeOrder = () => {
    }

    const handleChangeDocument = (docType, itemName, newCheckedValue, newValue, documentid) => {
        console.log("doc")
        setOrder(prevOrder => {
            const newOrder = { ...prevOrder }
            const docIndex = newOrder.documents.findIndex(doc => doc.type === docType);
            if (docIndex !== -1) {
                newOrder.documents[docIndex].documents.forEach((document, documentIndex) => {
                    const itemIndex = document.data.findIndex(item => item.name === itemName)
                    if (itemIndex !== -1 && documentIndex === documentid) {
                        const newItem = { ...document.data[itemIndex] }
                        newItem.checked = newCheckedValue
                        newItem.value = newValue
                        newOrder.documents[docIndex].documents[documentIndex].data[itemIndex] = newItem
                    }
                })
            }
            
            console.log("newOrder")
            console.log(newOrder.idSintad)
            return newOrder
        })
    }

    const handleChangeSubDocument = (docType, itemid, newCheckedValue, newData, documentid) => {
        setOrder(prevOrder => {
            const newOrder = { ...prevOrder }
            const docIndex = newOrder.documents.findIndex(doc => doc.type === docType)
            
            if (docIndex !== -1) {
                const nestedData = [...newOrder.documents[docIndex].documents[documentid].nestedData]
                const itemIndex = nestedData.findIndex((item) => item.id === itemid)
                if (itemIndex !== -1) {
                    nestedData[itemIndex] = {
                        ...nestedData[itemIndex],
                        checked: newCheckedValue,
                        data: newData,
                    }

                    newOrder.documents[docIndex].documents[documentid].nestedData = nestedData;
                }
            }
            return newOrder
        })
    }

    const handleChangeValidationData = ( itemName, newCheckedValue, newValue) => {
        console.log("vali")
        setOrder(prevOrder => {
            const newOrder = { ...prevOrder }
            const itemIndex = newOrder.data?.findIndex((item) => item.name === itemName)
            
            if (itemIndex !== -1) {
                newOrder.data.forEach((validationData, dataIndex) => {
                    if (dataIndex === itemIndex) {
                        const newItem = { ...newOrder.data[itemIndex] }
                        console.log(newItem)
                        newItem.checked = newCheckedValue
                        newItem.value = newValue
                        newOrder.data[itemIndex] = newItem
                    }
                })
            
            }
            console.log(newOrder)
            return newOrder
        })
    }
    
    const refreshData = () => {
        setIsRefreshing(true)
        axiosInstance.get(`/orden?id=${ordnumber}`)
            .then((res) => {
                const updatedData = res.data.data.map(item => {
                    if (item.name === "Razón social" || item.name === "Cliente") {
                        const newItem = { ...item }
                        delete newItem.checked
                        return newItem
                    } else {
                        return { ...item, checked: false }
                    }
                })
                setOrder({ ...res.data, data: updatedData })
                console.log(res.data)
                toast.success(`Datos recargados correctamente`)
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
            .finally(() => {
                console.log("end")
                setIsRefreshing(false)
            })
    }

    const handleVolver = () => {
        if (window.location.pathname !== `/ordenes/${ordtype}/${ordnumber}/validacion`) {
            nav(`/ordenes/${ordtype}/${ordnumber}/validacion`)
        } else {
            nav(`/ordenes/${ordtype}`)
        }
    }

    const contextValues = [order, documentid, setDocumentid, handleChangeOrder, handleChangeDocument, handleChangeSubDocument, handleChangeValidationData, refreshData, isRefreshing ]

    return <>
        {order && 
            <div className="od-main-cont">
                <span className="ol-title">{docutype ? `DOCUMENTOS DE ORDEN DE TRABAJO ${order?.idSintad}` :  `VALIDACIÓN DE ORDEN DE TRABAJO ${order?.idSintad}`}</span>
                {order != 0 && <Outlet context={contextValues}/>}
                <button  onClick={handleVolver} className="od-back-button">Volver</button>
            </div>
        }
    </>
}

export default OrderParent
