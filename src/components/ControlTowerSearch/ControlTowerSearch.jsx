import { useState, useEffect, useRef } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast"
import { FaArrowRightLong } from "react-icons/fa6"
import "./ControlTowerSearch.css"

const ControlTowerSearch = () => {

    const nav = useNavigate()
    const {ordnumber} = useParams()

    const operationelems = ["Ingreso", "Salida"]
    const [clientes, setClientes] = useState([])
    const [ordenes, setOrdenes] = useState([])

    const typeRef = useRef(null)
    const clientRef = useRef(null)
    const orderIdRef = useRef(null)

    const [orderData, setOrderData] = useState(null)
    const [clientData, setClientData] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            if (ordnumber) {
                try {
                    const orderRes = await axiosInstance(`/get_torre_de_control_exp?id=${ordnumber}`)
                    const fetchedOrderData = orderRes.data
                    setOrderData(fetchedOrderData)
                    typeRef.current.value = fetchedOrderData.type
                    console.log(fetchedOrderData.type)

                    const clientRes = await axiosInstance.get(`/get_clientes?type=${fetchedOrderData.type}`)
                    const fetchedClientData = clientRes.data
                    if (fetchedClientData.length === 0) {
                        toast.error("No hay clientes válidos")
                    } else {
                        setClientes(fetchedClientData)
                        setClientData(fetchedClientData)
                    }
                    const ordersRes = await axiosInstance.get(`/get_id_orden_trabajo_clientes?type=${fetchedOrderData.type}&client=${fetchedOrderData.client}`)
                    const ordenesData = ordersRes.data
                    if (ordenesData.length === 0) {
                        toast.error("No hay ordenes válidas")
                    } else {
                        setOrdenes(ordenesData)
                    }
                } catch (error) {
                    console.error("ERROR", error)
                    toast.error(error.response.data.error)
                }
            }
        };

        loadData();
    }, [ordnumber]);

    useEffect(() => {
        if (clientData && orderData) {
            clientRef.current.value = orderData.client
        }
    }, [clientData, orderData])
    useEffect(() => {
        if (ordenes.includes(ordnumber)) {
            orderIdRef.current.value = ordnumber
        }
    }, [ordenes, ordnumber])



    const handleChangeType = () => {
        nav("/control")
        if(!typeRef.current.value) {
            setClientes([])
            setOrdenes([])
            clientRef.current.value = ""
            orderIdRef.current.value = ""
        }
        else {
            axiosInstance.get(`/get_clientes?type=${typeRef.current.value}`)
            .then((res) => {
                if(res.data.length === 0) {
                    toast.error("No hay clientes validos")
                }
                clientRef.current.value = ""
                orderIdRef.current.value = ""
                setClientes([...res.data])
                setOrdenes([])
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }
    }

/*     useEffect(() => {
        console.log(`Change type: ${type}`)
        if(type === "") {
            setClient("")
            setClientes([])
        }
        else {
            if(type) {
                axiosInstance.get(`/get_clientes?type=${type}`)
                .then((res) => {
                    if(res.data.length === 0) {
                        toast.error("No hay clientes validos")
                    }
                    setClient("")
                    setClientes([...res.data])
                })
                .catch((error) => {
                    console.error("ERROR", error)
                    toast.error(error.response.data.error)
                })
            }
        }
    }, [type])  */

    const handleChangeClient = () => {
        nav("/control")
        if(!clientRef.current.value) {
            setOrdenes([])
            orderIdRef.current.value = ""
        }
        else {
            axiosInstance.get(`/get_id_orden_trabajo_clientes?type=${typeRef.current.value}&client=${clientRef.current.value}`)
            .then((res) => {
                if(res.data.length === 0) {
                    toast.error("No hay ordenes validas")
                }
                orderIdRef.current.value = ""
                setOrdenes([...res.data])
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }
    }

/*     useEffect(() => {
        console.log(`Change client: ${client}`)
        if(client === "") {
            setOrderid("")
            setOrdenes([])
        }
        else {
            if(client && type) {
                axiosInstance.get(`/get_id_orden_trabajo_clientes?type=${type}&client=${client}`)
                .then((res) => {
                    setOrdenes([...res.data])
                })
                .catch((error) => {
                    console.error("ERROR", error)
                    toast.error(error.response.data.error)
                })
            }
        }
    }, [client])  */

    const handleChangeOrderId = () => {
        if(!orderIdRef.current.value) {
            nav(`/control`)
        }
        else {
            nav(`/control/${orderIdRef.current.value}`)
        }
    }
  
/*     useEffect(() => {
        console.log(`Change ordid: ${orderid}`)
        if(orderid === "") {
            nav(`/control`)
        }
        else {
            nav(`/control/${orderid}`)
        }
    }, [orderid])  */

    const renderOptionElems = (options, defaultmsg="Seleccione una opción") => {
        let opelems = options.map((op) => {
            return <option key={op} value={op}>{op}</option>
        })

        opelems.unshift(<option value="">{defaultmsg}</option>)

        return opelems
    }

  return (
    <div className="ct-main-cont">
        <span className="ct-title">TORRE DE CONTROL</span>
        <div className="ct-search-cont">
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="operacion">Operación</label>
                <select ref={typeRef} className="ct-search-input" id="operacion" onChange={handleChangeType}>
                    {renderOptionElems(operationelems, "Seleccione un tipo de operación")}
                </select>
            </div>
            <FaArrowRightLong />
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="cliente">Cliente</label>
                <select ref={clientRef} className="ct-search-input" disabled={clientes.length === 0} id="cliente" onChange={handleChangeClient}>
                    {renderOptionElems(clientes, "Seleccione un cliente")}
                </select>
            </div>
            <FaArrowRightLong />
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="ordentrabajo">Orden de trabajo</label>
                <select ref={orderIdRef} className="ct-search-input" disabled={ordenes.length === 0} id="ordentrabajo" onChange={handleChangeOrderId}>
                    {renderOptionElems(ordenes, "Seleccione una orden de trabajo")}
                </select>
            </div>
        </div>
        {ordnumber ?
            <Outlet />
            :
            <div className="ct-no-order-cont">
                SELECCIONE UNA ORDEN
            </div>
        }
    </div>
  )
}

export default ControlTowerSearch