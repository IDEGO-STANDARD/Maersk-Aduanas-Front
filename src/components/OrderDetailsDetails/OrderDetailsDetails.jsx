import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import DataDisplay from "../DataDisplay/DataDisplay"
import axiosInstance from "../../axiosInstance/axiosInstance"
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast"
import "./OrderDetailsDetails.css"


const OrderDetailsDetails = () => {

    const { ordnumber, ordtype } = useParams()
    const { hasPermission } = useContext(UserContext)

    const [order, setOrder] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchOrderDetails = () => {
            axiosInstance.get(`/get_detalle?id=${ordnumber}`)
                .then((res) => {
                    console.log(res.data)
                    const updatedClientData = res.data.clientdata
                    // ?.map(item => {
                    //     if (item.name === "Razón social" || item.name === "Cliente") {
                    //         const newItem = { ...item }
                    //         delete newItem.checked
                    //         return newItem
                    //     } else {
                    //         return { ...item, checked: false }
                    //     }
                    // })
                    const updatedCalendarData = res.data.calendardata
                    // ?.map(item => {
                    //     if (item.name === "Razón social" || item.name === "Cliente") {
                    //         const newItem = { ...item }
                    //         delete newItem.checked
                    //         return newItem
                    //     } else {
                    //         return { ...item, checked: false }
                    //     }
                    // })
                    console.log(res.data)
                    setOrder({
                        ...res.data,
                        clientdata: updatedClientData,
                        calendardata: updatedCalendarData
                    })
                })
                .catch((error) => {
                    console.error("ERROR", error)
                    toast.error(error.response.data.error)
                })
        }

        if (!isEditing) {fetchOrderDetails()}

        const intervalId = setInterval(() => {
            if (!isEditing) {
                fetchOrderDetails();
            }
        }, 3000);

        return () => {
            clearInterval(intervalId);
        }
    }, [isEditing])

    const handleChangeDetails = (detailType, itemName, newCheckedValue, newValue) => {
        setIsEditing(true)
        setOrder(prevOrder => {
            const newOrder = { ...prevOrder }
            const itemIndex = newOrder[detailType]?.findIndex((item) => item.name === itemName)

            if (itemIndex !== -1) {
                newOrder[detailType].forEach((detail, detailIndex) => {
                    if (detailIndex === itemIndex) {
                        const newItem = { ...newOrder[detailType][itemIndex] }
                        newItem.checked = newCheckedValue
                        newItem.value = newValue
                        
                        newOrder[detailType][itemIndex] = newItem
                    }
                })
            }

            // console.log(`Final Order:`)
            console.log(newOrder)
            return newOrder
        })
    }

    const handleChangeDataClient = (itemName, newCheckedValue, newValue) => {
        const detailType = 'clientdata'
        handleChangeDetails(detailType, itemName, newCheckedValue, newValue)
    }

    const handleChangeDataCalendar = (itemName, newCheckedValue, newValue) => {
        const detailType = 'calendardata'
        handleChangeDetails(detailType, itemName, newCheckedValue, newValue)
    }

    const handleSaveDetailChanges = () => {
        setLoading(true)
        const checkedData = order.clientdata.filter(item => item.checked);
        const docqueryparam = `id=${ordnumber}`
        console.log({
            data: [...checkedData]
        })
        axiosPythonInstance.post(`/validarDetalles?${docqueryparam}`, {
            data: [...checkedData]
        })
        .then((res) => {
            console.log(res)
            setLoading(false)
            setIsEditing(false)
            toast.success("Campos guardados correctamente")
        })
        .catch((error) => {
            setLoading(false)
            console.error("ERROR", error)
            toast.error(error.response?.data?.error || "Error guardando cambios")
        })
    }

    // Para búsqueda
    const removeDiacritics = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    const containsSearchQuery = (text) => {
        const normalizedText = removeDiacritics(text).toLowerCase();
        const normalizedQuery = removeDiacritics(searchQuery).toLowerCase();
        return normalizedText.includes(normalizedQuery);
    };

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
                <div className="odd-section-title">Cliente <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="odd-search-bar"
                /></div>
                {order && <DataDisplay data={order.clientdata.filter((item) => containsSearchQuery(item.name) || containsSearchQuery(item.value))} handleChangeData={handleChangeDataClient} edit={hasPermission("4")}/>}
            </div>
            {/* <div className="odd-section-cont">
                <div className="odd-section-title">Calendario</div>
                {order && <DataDisplay data={order.calendardata} edit={hasPermission("4")} handleChangeData={handleChangeDataCalendar} />}
            </div> */}
            <div className="odd-buttons-cont">
                <Link to={`/ordenes/${ordtype}`} className="od-back-button">Volver</Link>
                {hasPermission("4") && <button disabled={loading} className="odd-save-changes-button" onClick={() => handleSaveDetailChanges()}>Guardar cambios</button>}
                <Link to={`/control/${ordnumber}`} className="odd-control-button">Ir a torre de control</Link>
            </div>
        </div>
    )
}


export default OrderDetailsDetails