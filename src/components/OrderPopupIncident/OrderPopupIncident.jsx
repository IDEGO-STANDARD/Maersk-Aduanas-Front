import React, { useEffect, useState } from 'react'
import {  useParams, Link } from "react-router-dom"
import axiosInstance from "../../axiosInstance/axiosInstance"
import './OrderPopupIncident.css'

const OrderPopupIncident = ({ info }) => {
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

    fetchIncidents()

  }, [ordtype]);

  return (
    <div className="incident-popup-container">
      <h2 className="popup-title">Generar Incidencia para {ordtype.toUpperCase()}-{info}</h2>
      <div className="incidents-container">
        {incidents.length < 1 ? (
          <span>{incidentLoading ? "Cargando incidentes..." : "No hay incidentes"}</span>
        ) : (
          incidents.map((incident) => (
            <Link
              key={incident.idIncidencia}
              to={`/ordenes/${ordtype}/${info}/generacion/${incident.idIncidencia}`}
              className="incident-button"
            >
              {incident.nombre}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPopupIncident
