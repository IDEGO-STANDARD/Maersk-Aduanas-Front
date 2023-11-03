import { useState, useEffect } from "react";
import axios from "axios";
import RowsTable from "../RowsTable/RowsTable";
import OrderRowsBeforeComponent from "../OrderRowsBeforeComponent/OrderRowsBeforeComponent";
import ord from "../../test.js"
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance/axiosInstance";
import "./OrdersList.css";

const OrdersList = () => {
    const [orders, setOrders] = useState([])

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

    return <div className="ol-main-cont">
        <span className="ol-title">MIS ORDENES DE TRABAJO</span>
        <RowsTable data={orders} ComponentBeforeKeys={OrderRowsBeforeComponent}/>
        <div></div>
        <div></div>
    </div>
}

export default OrdersList
