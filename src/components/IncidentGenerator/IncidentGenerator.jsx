import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import instance from "../../axiosInstance/axiosInstance";
import pythonInstance from "../../axiosInstance/axiosPythonInstance";
import toast from "react-hot-toast";
import "./IncidentGenerator.css";

const IncidentGenerator = () => {
  const { ordtype, ordnumber, incid } = useParams();
  const navigate = useNavigate();

  const formRef = useRef(null);

  const [order, setOrder] = useState("");
  const [incidentParam, setIncidentsParam] = useState([]);
  const [paramLoading, setParamLoading] = useState(true);

  const [formValues, setFormValues] = useState({});
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await instance.get(`/get_detalle?id=${ordnumber}`);
        console.log(res.data);
        setOrder(res.data);
      } catch (error) {
        console.error("ERROR", error);
        toast.error(error.response?.data?.error || "Error fetching order details");
      }
    };

    const fetchIncidents = async () => {
      try {
        const response = await instance.get(`/incidenciasParametros?operacion=${ordtype}&orderId=${ordnumber}&id=${incid}`);
        console.log(response);
        setIncidentsParam(response.data);
        setParamLoading(false);
      } catch (error) {
        setParamLoading(false);
        console.error("ERROR", error);
        toast.error(error.response?.data?.error || "Error fetching incidents");
      }
    };

    fetchOrderDetails();
    fetchIncidents();
  }, [ordnumber, ordtype, incid]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      "incidentId": incid,
      "orderId": ordnumber,
      "operacion": ordtype,
      "recipient_email": "rvidal@idegostd.com",
      "sistema": { ...incidentParam.parametros.sistema },
      "manuales": { ...formValues, observaciones }
    };
    console.log(formData);
    try {
      const response = await pythonInstance.post("/testpost", formData);
      console.log(response.data);
    } catch (error) {
      console.error("ERROR", error);
      toast.error(error.response?.data?.error || "Error submitting form");
    }
  };

  const inputType = {
    "SINI": "checkbox",
    "Certificado de Origen": "radio"
  };

  const inputList = {
    "Certificado de Origen": ["Si", "No", "Acogimiento Posterior"]
  };

  const renderInputs = (item, index) => (
    <div key={index} style={{ minWidth: "18%" }} className="ig-rendered-keys-key-cont">
      <div className="ig-rendered-keys-top-cont">
        <span className="ig-rendered-keys-key-text">{item}</span>
      </div>
      {inputType[item] === 'radio' ? (
        <div>
          {inputList[item].map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                value={option}
                name={item}
                checked={formValues[item] === option}
                onChange={handleInputChange}
              />
              {option}
            </label>
          ))}
        </div>
      ) : inputType[item] === 'checkbox' ? (
        <label>
          <input
            type="checkbox"
            checked={formValues[item] || false}
            className="ig-rendered-keys-value-checkbox"
            onChange={handleInputChange}
            name={item}
          />
        </label>
      ) : (
        <input
          className={`ig-rendered-keys-value-${inputType[item] || 'text'}`}
          type={inputType[item] || 'text'}
          value={formValues[item] || ''}
          name={item}
          onChange={handleInputChange}
        />
      )}
    </div>
  );

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
              <form ref={formRef} onSubmit={handleSubmit}>
                {incidentParam.parametros.manuales.map(renderInputs)}
                <div className="ig-rendered-keys-key-cont">
                  <div className="ig-rendered-keys-top-cont">
                    <span className="ig-rendered-keys-key-text">Observaciones</span>
                  </div>
                  <textarea
                    className="ig-rendered-keys-value-textarea"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </div>
                <div className="ig-buttons-cont">
                  <Link to={`/ordenes/${ordtype}`} className="ig-back-button">Volver</Link>
                  <button type="submit" className="ig-send-button">Enviar</button>
                </div>
              </form>
            </div>
          )}
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
              {incidentParam.parametros.manuales.length > 0 ? <div /> : (
                <div>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="ig-rendered-keys-key-cont">
                      <div className="ig-rendered-keys-top-cont">
                        <span className="ig-rendered-keys-key-text">Observaciones</span>
                      </div>
                      <textarea
                        className="ig-rendered-keys-value-textarea"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                      />
                    </div>
                    <div className="ig-buttons-cont">
                      <Link to={`/ordenes/${ordtype}`} className="ig-back-button">Volver</Link>
                      <button type="submit" className="ig-send-button">Enviar</button>
                    </div>
                  </form >
                </div>)}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default IncidentGenerator;
