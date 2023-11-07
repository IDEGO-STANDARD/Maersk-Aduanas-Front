import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeFill } from "react-bootstrap-icons"
import DataDisplay from "../DataDisplay/DataDisplay";
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast";
import "./OrderParent.css";

const OrderParent = ({ }) => {

    const { ordtype, ordnumber, docutype } = useParams()

    const [order, setOrder] = useState("")

    useEffect(() => {
        const fetchOrder = () => {
            axiosInstance.get(`/orden?id=${ordnumber}`)
            .then((res) => {
                setOrder(res.data)
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }

        fetchOrder()

        const intervalId = setInterval(fetchOrder, 3000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return <>
        {order && 
            <div className="od-main-cont">
                <span className="ol-title">{docutype ? `DOCUMENTOS DE ORDEN DE TRABAJO ${order.id}` :  `VALIDACIÓN DE ORDEN DE TRABAJO ${order.id}`}</span>
                {order != 0 && <Outlet context={[order]}/>}
                <Link to={`/ordenes/${ordtype}}`} className="od-back-button">Volver</Link>
            </div>
        }
    </>
}

export default OrderParent
