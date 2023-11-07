import { useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast"
import { FaArrowRightLong } from "react-icons/fa6"
import "./ControlTowerSearch.css"

const ControlTowerSearch = () => {

    const nav = useNavigate()
    const {ordnumber} = useParams()

    const operationelems = ["Importación", "Exportación"]
    const [clientes, setClientes] = useState([])
    const [ordenes, setOrdenes] = useState([])

    const changeOperation = (e) => {
        if(e.target.value === "") {
            setClientes([])
            setOrdenes([])
        }
        else {
            axiosInstance.get(`/clientes?type=${e.target.value}`)
            .then((res) => {
                setClientes([...res.data])
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }
    }

    const changeClient = (e) => {
        if(e.target.value === "") {
            setOrdenes([])
        }
        else {
            axiosInstance.get(`/ordenes/cliente?client=${e.target.value}`)
            .then((res) => {
                setOrdenes([...res.data])
            })
            .catch((error) => {
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
        }
    }

    const changeOrder = (e) => {
        if(e.target.value === "") {
            nav(`/control`)
        }
        else {
            nav(`/control/${e.target.value}`)
        }
    }

    const renderOptionElems = (options, defaultmsg="Seleccione una opción") => {
        let opelems = options.map((op) => {
            return <option key={op} value={op}>{op}</option>
        })

        opelems.unshift(<option value="">{defaultmsg}</option>)

        return opelems
    }

  return (
    <div className="ct-main-cont">
        <span className="ct-title">Torre de control</span>
        <div className="ct-search-cont">
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="operacion">Operación</label>
                <select className="ct-search-input" id="operacion" onChange={changeOperation}>
                    {renderOptionElems(operationelems, "Seleccione un tipo de operación")}
                </select>
            </div>
            <FaArrowRightLong />
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="cliente">Cliente</label>
                <select className="ct-search-input" disabled={clientes.length === 0} id="cliente" onChange={changeClient}>
                    {renderOptionElems(clientes, "Seleccione un cliente")}
                </select>
            </div>
            <FaArrowRightLong />
            <div className="ct-input-table-cont">
                <label className="ct-label" htmlFor="ordentrabajo">Orden de trabajo</label>
                <select className="ct-search-input" disabled={ordenes.length === 0} id="ordentrabajo" onChange={changeOrder}>
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