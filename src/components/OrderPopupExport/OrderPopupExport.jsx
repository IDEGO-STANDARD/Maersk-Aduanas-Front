import React, { useEffect, useState } from 'react'
import {  useParams, Link } from "react-router-dom"
import axiosInstance from "../../axiosInstance/axiosInstance"
import './OrderPopupExport.css'

const OrderPopupExport = ({ info }) => {
  const { ordtype } = useParams()

  
  const [columns, setColumns] = useState([])
  const [exports, setExports] = useState([])
  const [exportLoading, setExportLoading] = useState(true)
  
  useEffect(() => {
    // const fetchExports = async () => {
    //   try {
    //     const response = await axiosInstance.get(`/incidencias?tipo=Instrucciones&operacion=${ordtype}`)
    //     console.log(response)
    //     setExports(response.data)
    //     setExportLoading(false)
    //   } catch (error) {
    //     setExportLoading(false)
    //     console.error("ERROR", error)
    //     toast.error(error.response.data.error)
    //   }
    // };

    // fetchExports()
    setExports([
      {"name": "Referencia Cliente", "checked": false},
      {"name": "Numero de DAM", "checked": false},
      {"name": "Aduana", "checked": false},
      {"name": "Modalidad", "checked": false},
      {"name": "Regimen", "checked": false},
      {"name": "BK/BL", "checked": false},
      {"name": "POL", "checked": false},
      {"name": "POD", "checked": false},
      {"name": "Puerto", "checked": false},
      {"name": "Numero de Cnt", "checked": false},
      {"name": "Nave", "checked": false},
      {"name": "Linea naviera", "checked": false},
      {"name": "ETA", "checked": false},
      {"name": "ETD", "checked": false},
      {"name": "CIF", "checked": false},
      {"name": "FOB", "checked": false},
      {"name": "F. Entrega de Documentos", "checked": false},
      {"name": "F. direccionamiento", "checked": false},
      {"name": "F. VB", "checked": false},
      {"name": "F. Previo", "checked": false},
      {"name": "F. DAM", "checked": false},
      {"name": "Canal", "checked": false},
      {"name": "F. Reconocimiento Fisico", "checked": false},
      {"name": "Boletin", "checked": false},
      {"name": "F. Termino de descarga", "checked": false},
      {"name": "F. Levante", "checked": false},
      {"name": "ACE", "checked": false},
      {"name": "F. Retiro", "checked": false},
      {"name": "F. Regularizacion", "checked": false},
      {"name": "EXTRA COSTOS", "checked": false}
    ])
  }, [ordtype])
  
  const handleColumnChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value)
    
    const updatedColumns = columns.map((column) => ({
      ...column,
      checked: selectedOptions.includes(column.name),
    }))

    setColumns(updatedColumns)
    setSelectedColumns(selectedOptions)
  }

  const capitalizeFirstLetter = ((w) => { return w ? (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) : w })
  
  return (
    <div className="export-popup-container">
      <h2 className="export-popup-title">Exportar órdenes de {capitalizeFirstLetter(ordtype)}</h2>
      <div className="exports-container">
        <select className="column-dropdown" multiple onChange={handleColumnChange}>
          {columns.map((column) => (  // Change here
            <option key={column.name} value={column.name}>
              {column.name}
            </option>
          ))}
        </select>

        <div>
          <h3>Selected Columns:</h3>
          <ul>
            {/* {selectedColumns.map((selectedColumn) => (
              <li key={selectedColumn}>{selectedColumn}</li>
            ))} */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OrderPopupExport
