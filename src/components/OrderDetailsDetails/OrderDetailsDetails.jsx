import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import DataDisplay from "../DataDisplay/DataDisplay"
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast"
import "./OrderDetailsDetails.css"


const OrderDetailsDetails = () => {

    const {ordnumber, ordtype} = useParams()

    const [order, setOrder] = useState("")

    useEffect(() => {
        const fetchOrderDetails = () => {
            axiosInstance.get(`/get_detalle?id=${ordnumber}`)
            .then((res) => {
                console.log(res.data)
                setOrder(res.data)
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }

        fetchOrderDetails()

        const intervalId = setInterval(fetchOrderDetails, 3000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    console.log(order)
    

    return (
        <div className="odd-main-cont">
            <div className="odd-titles-cont">
                <span className="odd-order-title">Orden {ordnumber}</span>
                {ordtype === "ingreso" && <span className="odd-ordtype-title">Ingreso</span>}
                {ordtype === "salida" && <span className="odd-ordtype-title">Salida</span>}
                <span className="odd-order-title">Sectorista: {order.sectorista}</span>
                <span className="odd-order-title">Liquidador: {order.liquidador}</span>
            </div>
            <div className="odd-section-cont">
                <div className="odd-section-title">Cliente</div>
                {order && <DataDisplay data={order.clientdata}/>}
            </div>
            <div className="odd-section-cont">
                <div className="odd-section-title">Calendario</div>
                {order && <DataDisplay data={order.calendardata}/>}
            </div>
            <div className="odd-buttons-cont">
                <Link to={`/ordenes/${ordtype}`} className="od-back-button">Volver</Link>
                <Link to={`/control/${ordnumber}`} className="odd-control-button">Ir a torre de control</Link>
            </div>
        </div>
    )
}


export default OrderDetailsDetails