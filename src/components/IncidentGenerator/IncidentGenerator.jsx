import { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"
import instance from "../../axiosInstance/axiosInstance";
import pythonInstance from "../../axiosInstance/axiosPythonInstance";
import toast from "react-hot-toast";
import "./IncidentGenerator.css";

const IncidentGenerator = () => {
  const { ordtype, ordnumber, incid } = useParams();
  const { userdata } = useContext(UserContext)
  const navigate = useNavigate();

  const formRef = useRef(null);

  const [order, setOrder] = useState("");
  const [incidentParam, setIncidentsParam] = useState([]);
  const [paramLoading, setParamLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postState, setPostState] = useState(false);

  const [formValues, setFormValues] = useState({});
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await instance.get(`/get_detalle?id=${ordnumber}`);
        setOrder(res.data);
      } catch (error) {
        console.error("ERROR", error);
        toast.error(error.response?.data?.error || "Error fetching order details");
      }
    };

    const fetchIncidents = async () => {
      try {
        const response = await instance.get(`/incidenciasParametros?operacion=${ordtype}&orderId=${ordnumber}&id=${incid}`);
        setIncidentsParam(response.data);
        setParamLoading(false);
        console.log(`/incidenciasParametros?operacion=${ordtype}&orderId=${ordnumber}&id=${incid}`)
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
    event.preventDefault()
    setIsSubmitting(true)

    const formData = {
      "incidentId": incid,
      "orderId": ordnumber,
      "operacion": ordtype,
      "recipient_email": userdata.email,
      "sistema": { ...incidentParam.parametros.sistema },
      "manuales": { ...formValues, observaciones }
    }

    try {
      console.log(formData)
      const response = await pythonInstance.post("/testpost", formData);
      toast.success("Form submitted successfully!");
      setIncidentsParam(response.data);
      setPostState(true);
    } catch (error) {
      console.error("ERROR", error);
      toast.error(error.response?.data?.error || "Error submitting form");
    } finally {
      setIsSubmitting(false);
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

  const renderSection = (title, value) => (
    <div className="ig-section-title">
      {`${title}: `}
      <span className="ig-order-title">{value}</span>
    </div>
  );

  const renderDataSection = () => (
    <div className="ig-data-cont">
      {paramLoading ? (
        <div className="ig-data-cont">Cargando...</div>
      ) : (
        <>
          {incidentParam.parametros.manuales.length > 0 && renderManualInputs()}
          {Object.keys(incidentParam.parametros.sistema).length > 0 && renderSistemaInputs()}
        </>
      )}
    </div>
  );

  const renderManualInputs = () => (
    <div className="ig-ingreso-cont">
      <form ref={formRef} onSubmit={handleSubmit}>
        {incidentParam.parametros.manuales.map(renderInputs)}
        {renderObservations()}
        {renderButtons()}
      </form>
    </div>
  );

  const renderSistemaInputs = () => (
    <div className="ig-sistema-cont">
      {Object.entries(incidentParam.parametros.sistema).map(renderSistemaItem)}
      {incidentParam.parametros.manuales.length === 0 && (
        <form ref={formRef} onSubmit={handleSubmit}>
          {renderObservations()}
          {renderButtons()}
        </form>
      )}
    </div>
  );

  const renderSistemaItem = ([key, value], index) => (
    <div key={index} className="ig-rendered-keys-key-cont">
      <div className="ig-rendered-keys-top-cont">
        <span className="ig-rendered-keys-key-text">{key}</span>
      </div>
      <input type="text" className="ig-rendered-keys-value-text" value={value || 'Dato inválido/no existe.'} disabled />
    </div>
  );

  const renderObservations = () => (
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
  );

  const renderButtons = () => (
    <div className="ig-buttons-cont">
      <Link to={`/ordenes/${ordtype}`} className="ig-back-button">Volver</Link>
      <button type="submit" className="ig-send-button" disabled={isSubmitting}>Enviar</button>
    </div>
  );

  const renderResponse = () => (
    <div id="response-container" className="ig-data-cont">
      <table id="response-table" className="response-table">
        <tbody>
          {Object.entries(incidentParam).map(([key, value], index) => (
            <tr key={index} id={`response-row-${index}`} className="response-row">
              <td className="response-key"><strong>{key}:</strong></td>
              <td className="response-value">
                {typeof value === 'object' ? (
                  <table className="subtable">
                    <tbody>
                      <tr className="subrow">
                        {typeof value !== 'object' ? (
                          <td className="subitem-key"><strong>{key}:</strong>
                            <td className="subitem-value">
                              value
                            </td>
                          </td>
                        ) : (
                          <td className="subitem-value">
                            <ul className="sublist">
                              {Object.entries(value).map(([subkey, subvalue], subindex) => (
                                <li key={subindex} className="subitem">
                                  <strong>{subkey}:</strong> {subvalue}
                                </li >
                              )
                              )}
                            </ul >
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                ) : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="ig-main-cont">
      <div className="ig-titles-cont">
        <span className="ig-order-title">Orden {ordnumber}</span>
        <span className="ig-incident-title">{paramLoading ? `Cargando datos de incidencia ${incid}` : (postState ? 'Incidencia Generada:' : `Generar ${incidentParam.nombre}:`)}</span>
        {ordtype === "ingreso" && <span className="ig-ordtype-title">Ingreso</span>}
        {ordtype === "salida" && <span className="ig-ordtype-title">Salida</span>}
      </div>
      <div className="ig-sections-cont">
        <div className="ig-section-cont">
          {renderSection("Sectorista", order.sectorista)}
        </div>
        <div className="ig-section-cont">
          {renderSection("Liquidador", order.liquidador)}
        </div>
      </div>
      {postState ? renderResponse() : renderDataSection()}
    </div>
  );
};

export default IncidentGenerator;