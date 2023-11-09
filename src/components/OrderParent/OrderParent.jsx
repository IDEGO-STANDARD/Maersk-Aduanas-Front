import { useNavigate, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeFill } from "react-bootstrap-icons"
import DataDisplay from "../DataDisplay/DataDisplay";
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast";
import "./OrderParent.css";

const OrderParent = ({ }) => {

    const { ordtype, ordnumber, docutype } = useParams()
    const nav = useNavigate()
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

    console.log(order)

    return <>
        {order && 
            <div className="od-main-cont">
                <span className="ol-title">{docutype ? `DOCUMENTOS DE ORDEN DE TRABAJO ${ordnumber}` :  `VALIDACIÓN DE ORDEN DE TRABAJO ${ordnumber}`}</span>
                {order != 0 && <Outlet context={[order]}/>}
                <button onClick={() => {nav(-1)}} className="od-back-button">Volver</button>
            </div>
        }
    </>
}

export default OrderParent
