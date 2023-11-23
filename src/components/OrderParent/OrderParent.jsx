import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeFill } from "react-bootstrap-icons"
import DataDisplay from "../DataDisplay/DataDisplay";
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast";
import "./OrderParent.css";

const OrderParent = ({}) => {

    const { ordtype, ordnumber, docutype } = useParams()
    const nav = useNavigate()
    const [order, setOrder] = useState("")

    useEffect(() => {
        axiosInstance.get(`/orden?id=${ordnumber}`)
        .then((res) => {
            setOrder(res.data)
        })
        .catch((error) => {
            console.error("ERROR", error)
            toast.error(error.response.data.error)
        })
    }, [])

    const handleChangeOrder = () => {

    }

    const handleChangeDocument = (docType, itemName, newCheckedValue, newValue) => {
        setOrder(prevOrder => {
            const newOrder = { ...prevOrder }
            const docIndex = newOrder.documents.findIndex(doc => doc.type === docType);
            if (docIndex !== -1) {
                newOrder.documents[docIndex].documents.forEach((document, documentIndex) => {
                    const itemIndex = document.data.findIndex(item => item.name === itemName)
                    if (itemIndex !== -1) {
                        const newItem = { ...document.data[itemIndex] }
                        newItem.checked = newCheckedValue
                        newItem.value = newValue
                        newOrder.documents[docIndex].documents[documentIndex].data[itemIndex] = newItem
                    }
                });
            }
    
            return newOrder
        })
    }

    console.log(order)
    
    return <>
        {order && 
            <div className="od-main-cont">
                <span className="ol-title">{docutype ? `DOCUMENTOS DE ORDEN DE TRABAJO ${ordnumber}` :  `VALIDACIÓN DE ORDEN DE TRABAJO ${ordnumber}`}</span>
                {order != 0 && <Outlet context={[order, handleChangeOrder, handleChangeDocument]}/>}
                <button onClick={() => {nav(-1)}} className="od-back-button">Volver</button>
            </div>
        }
    </>
}

export default OrderParent
