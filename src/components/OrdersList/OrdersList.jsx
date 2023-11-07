import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RowsTable from "../RowsTable/RowsTable";
import OrderRowsBeforeComponent from "../OrderRowsBeforeComponent/OrderRowsBeforeComponent";
import ord from "../../test.js"
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance/axiosInstance";
import "./OrdersList.css";

const OrdersList = ({}) => {
    const [orders, setOrders] = useState([])

    const {ordtype} = useParams()
    const nav = useNavigate()

    useEffect(() => {
        const fetchOrders = () => {
            axiosInstance.get("/ordenes")
            .then((res) => {
                setOrders(res.data)
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }

        fetchOrders()

        const intervalId = setInterval(fetchOrders, 3000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const openDetails = (index) => {
        nav(`/orders/${ordtype}/detalles/${orders[index].id}`)
    }

    return <div className="ol-main-cont">
        <span className="ol-title">MIS ÓRDENES DE TRABAJO {ordtype.slice(0,4).toUpperCase()}</span>
        <RowsTable data={orders} ComponentBeforeKeys={OrderRowsBeforeComponent} onClickFunc={openDetails}/>
        <div></div>
        <div></div>
    </div>
}

export default OrdersList
