import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast"
import "./IncidentGenerator.css"

const IncidentGenerator = () => {

  let { ordtype, ordnumber, incid } = useParams();
  const navigate = useNavigate()

  const [order, setOrder] = useState("")
  const [incidentParam, setIncidentsParam] = useState([])
  const [paramLoading, setParamLoading] = useState(true);

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

    const fetchIncidents = async () => {
      try {
        const response = await axiosInstance.get(`/incidenciasParametros?operacion=${ordtype}&orderId=${ordnumber}&id=${incid}`);
        console.log(response);
        setIncidentsParam(response.data);
        setParamLoading(false);
      } catch (error) {
        setParamLoading(false);
        console.error("ERROR", error);
        toast.error(error.response.data.error);
      }
    }

    fetchOrderDetails()
    fetchIncidents()

  }, [])

  console.log(order)

  const inputType = {
    "SINI": "checkbox",
    "Certificado de Origen": "radio"
  }

  const inputList = {
    "Certificado de Origen": ["Si", "No", "Acogimiento Posterior"]
  }



  return (
    <div className="ig-main-cont">
      <div className="ig-titles-cont">
        <span className="ig-order-title">Orden {ordnumber}</span>
        <span className="ig-incident-title">{paramLoading ? `Cargando datos de incidencia ${incid}` : `Generar ${incidentParam.nombre}:`}</span>
        {ordtype === "ingreso" && <span className="ig-ordtype-title">Ingreso</span>}
        {ordtype === "salida" && <span className="ig-ordtype-title">Salida</span>}
      </div>
      <div className="ig-sections-cont">
        <div className="ig-section-cont">
          <div className="ig-section-title">Sectorista: <span className="ig-order-title">{order.sectorista}</span></div>
        </div>
        <div className="ig-section-cont">
          <div className="ig-section-title">Liquidador: <span className="ig-order-title">{order.liquidador}</span></div>
        </div>
      </div>
      <div className="ig-data-cont">
        {paramLoading ? 'Cargando...' :
          incidentParam.parametros.manuales.length > 0 && (
            <div className="ig-ingreso-cont">
              {incidentParam.parametros.manuales.map((item, index) => (
                <div key={index} style={{ minWidth: "18%" }} className="ig-rendered-keys-key-cont">
                  <div className="ig-rendered-keys-top-cont">
                    <span className="ig-rendered-keys-key-text">{item}</span>
                  </div>
                  {inputType[item] === 'radio' ? (
                    <div>
                      {inputList[item].map((option, i) => (
                        <label key={i}>
                          <input type="radio" value={option} name={item} />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input className={'ig-rendered-keys-value-' + (inputType[item] || 'text')} type={inputType[item] || 'text'} />
                  )}
                </div>
              ))}
            </div>
          )
        }
        {paramLoading ? 'Cargando...' :
          Object.keys(incidentParam.parametros.sistema).length > 0 && (
            <div className="ig-sistema-cont">
              {Object.entries(incidentParam.parametros.sistema).map(([key, value], index) => (
                <div key={index} className="ig-rendered-keys-key-cont">
                  <div className="ig-rendered-keys-top-cont">
                    <span className="ig-rendered-keys-key-text">{key}</span>
                  </div>
                  <input type="text" className="ig-rendered-keys-value-text" value={value || 'Dato inválido/no existe.'} disabled />
                </div>
              ))}
            </div>
          )
        }

      </div>
      <div className="ig-buttons-cont">
        <Link to={`/ordenes/${ordtype}`} className="ig-back-button">Volver</Link>
        {order && <button className="ig-send-button">Enviar</button>}
      </div>
    </div>
  )
}

export default IncidentGenerator
