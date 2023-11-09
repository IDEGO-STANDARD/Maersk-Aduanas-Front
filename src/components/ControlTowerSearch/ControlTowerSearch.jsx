import { useState, useEffect } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast"
import { FaArrowRightLong } from "react-icons/fa6"
import "./ControlTowerSearch.css"

const ControlTowerSearch = () => {

    const nav = useNavigate()
    const {ordnumber} = useParams()

    const operationelems = ["Importacion", "Exportacion"]
    const [clientes, setClientes] = useState([])
    const [ordenes, setOrdenes] = useState([])

    const [type, setType] = useState("")
    const [client, setClient] = useState("")
    const [orderid, setOrderid] = useState("")

    useEffect(() => {
        if(ordnumber) {
            setOrderid(ordnumber)
            axiosInstance(`/get_torre_de_control_exp?id=${ordnumber}`)
            .then((res) => {
                setType(res.data.type)
                setClient(res.data.client)
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }
    })

    useEffect(() => {
        if(type === "") {
            setClientes([])
            setClient("")
            setOrdenes([])
            setOrderid("")
        }
        else {
            axiosInstance.get(`/get_clientes?type=${type}`)
            .then((res) => {
                if(res.data.length === 0) {
                    toast.error("No hay clientes validos")
                }
                setClientes([...res.data])
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }
    }, [type]) 

    useEffect(() => {
        if(client === "") {
            setOrdenes([])
            setOrderid("")
        }
        else {
            axiosInstance.get(`/get_id_orden_trabajo_clientes?type=${type}&client=${client}`)
            .then((res) => {
                setOrdenes([...res.data])
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }
    }, [client]) 
        
    useEffect(() => {
        if(!ordnumber) {
            if(orderid === "") {
                nav(`/control`)
            }
            else {
                nav(`/control/${orderid}`)
            }
        }
    }, [orderid]) 

    const renderOptionElems = (options, defaultmsg="Seleccione una opción") => {
        let opelems = options.map((op) => {
            return <option key={op} value={op}>{op}</option>
        })

        opelems.unshift(<option value="">{defaultmsg}</option>)

        return opelems
    }


    console.log(clientes)

  return (
    <div className="ct-main-cont">
        <span className="ct-title">Torre de control</span>
        <div className="ct-search-cont">
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="operacion">Operación</label>
                <select className="ct-search-input" value={type} id="operacion" onChange={(e) => {setType(e.target.value)}}>
                    {renderOptionElems(operationelems, "Seleccione un tipo de operación")}
                </select>
            </div>
            <FaArrowRightLong />
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="cliente">Cliente</label>
                <select className="ct-search-input" value={client} disabled={clientes.length === 0} id="cliente" onChange={(e) => {setClient(e.target.value)}}>
                    {renderOptionElems(clientes, "Seleccione un cliente")}
                </select>
            </div>
            <FaArrowRightLong />
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="ordentrabajo">Orden de trabajo</label>
                <select className="ct-search-input" value={orderid} disabled={ordenes.length === 0} id="ordentrabajo" onChange={(e) => {setOrderid(e.target.value)}}>
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