import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import axiosInstance from "../../axiosInstance/axiosInstance"
import { X } from 'react-bootstrap-icons'
import './IncidentPopup.css'

const IncidentPopup = ({ isOpen, onClose, orderId }) => {

  const ref = useRef()
  const { ordtype } = useParams()

  const [incidents, setIncidents] = useState([])
  const [incidentLoading, setincidentLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axiosInstance.get(`/incidencias?tipo=Instrucciones&operacion=${ordtype}`)
        console.log(response)
        setIncidents(response.data)
        setincidentLoading(false)
      } catch (error) {
        setincidentLoading(false)
        console.error("ERROR", error)
        toast.error(error.response.data.error)
      }
    };

    if (isOpen) {
      fetchIncidents()
    } else {
      setIncidents([])
      setincidentLoading(true)
    }
  }, [isOpen, ordtype]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref])

  if (!isOpen) {
    return null
  }

  return (
    <div className="popup">
      <div ref={ref} className="popup-content">
        <button className="close-button" onClick={onClose}><X /></button>
        <h2 className="popup-title">Generar Incidencia para {ordtype.toUpperCase()}-{orderId}</h2>
        <div className="incidents-container">
          {incidents.length < 1 ? (
            <span>{incidentLoading ? "Cargando incidentes..." : "No hay incidentes"}</span>
          ) : (
            incidents.map((incident) => (
              <Link
                key={incident.idIncidencia}
                to={`/ordenes/${ordtype}/${orderId}/generacion/${incident.idIncidencia}`}
                className="incident-button"
              >
                {incident.nombre}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentPopup
