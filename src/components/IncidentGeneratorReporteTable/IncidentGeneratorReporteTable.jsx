import React, { useRef, useContext, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { Plus } from 'react-bootstrap-icons'
import instance from "../../axiosInstance/axiosInstance"
import pythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast"
import "./IncidentGeneratorReporteTable.css"

const data_sectorista = {
	parametros: [
		{
			"gasto": "Multa",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Solicitante": ""
			},
			"contentArray": []
		},
		{
			"gasto": "Expediente de rectificación",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Solicitante": ""
			},
			"contentArray": []
		}, {
			"gasto": "Adicional",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Solicitante": ""
			},
			"contentArray": []
		}
	]
}

const data_operaciones = {
	parametros: [
		{
			"gasto": "Precintos Adicionales",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Cantidad/Monto": "",
				"Solicitante": ""
			},
			"contentArray": []
		},
		{
			"gasto": "Boletín Químico",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Cantidad/Monto": "",
				"Solicitante": ""
			},
			"contentArray": []
		},
		{
			"gasto": "Servicio Extraordinario",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Cantidad/Monto": "",
				"Solicitante": ""
			},
			"contentArray": []
		},
		{
			"gasto": "Cancelación de Cita",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Cantidad/Monto": "",
				"Solicitante": ""
			},
			"contentArray": []
		},
		{
			"gasto": "Uso de área",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Cantidad/Monto": "",
				"Solicitante": ""
			},
			"contentArray": []
		},
		{
			"gasto": "Presencia de despachador adicional",
			"checkbox": {
				"type": "checkbox",
				"isChecked": false
			},
			"inputFields": {
				"Cantidad/Monto": "",
				"Solicitante": ""
			},
			"contentArray": ["Aforo", "Previo", "Trasegado", "Separación de bultos", "Otro"]
		}
	]
}

const useFormHandlers = () => {
	const { ordtype, ordnumber, incid } = useParams()
	const { userdata } = useContext(UserContext)
	const [formValues, setFormValues] = useState({})
	const [otro, setotro] = useState('')

	const [observaciones, setObservaciones] = useState("")

	const [additionalRows, setAdditionalRows] = useState([])

	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleCheckboxChange = (gasto) => {
		setFormValues((prevValues) => {
			const updatedValues = { ...prevValues }

			if (updatedValues[gasto]?.checkbox?.isChecked) {
				delete updatedValues[gasto]
				setAdditionalRows(prevRows => prevRows.filter(item => item.gasto !== gasto))
			} else {
				updatedValues[gasto] = {
					checkbox: {
						type: 'checkbox',
						isChecked: true,
					},
					inputFields: {
						'Cantidad/Monto': '',
						Solicitante: '',
					},
				}
			}

			return updatedValues
		})
	}

	const handleInputChange = (event, gasto, field) => {
		const { value, type, checked } = event.target;

		setFormValues((prevValues) => {
			const updatedValues = {
				...prevValues,
				[gasto]: {
					...prevValues[gasto],
					inputFields: {
						...prevValues[gasto]?.inputFields,
						[field]: type === 'checkbox' ? checked : value,
					},
				},
			}

			return updatedValues
		})
	}

	const handleContentCheckboxChange = (gasto, option) => {
		setFormValues((prevValues) => {
			const isChecked = !prevValues[gasto]?.contentArray?.includes(option)

			const updatedValues = {
				...prevValues,
				[gasto]: {
					...prevValues[gasto],
					contentArray: isChecked
						? [...(prevValues[gasto]?.contentArray || []), option]
						: (prevValues[gasto]?.contentArray || []).filter((item) => item !== option),
				},
			}

			return updatedValues
		})
	}

	const addRowHandler = (item) => {
		const newGastoName = formValues[item.gasto]?.inputFields?.['NuevoGasto']
		const exists = additionalRows.some(item => item.gasto === newGastoName)
		if (newGastoName && !exists) {
			let newGasto = { ...item }
			newGasto.gasto = formValues[item.gasto]?.inputFields?.['NuevoGasto']
			newGasto.checkbox.isChecked = true

			setFormValues((prevValues) => {
				const updatedValues = {
					...prevValues,
					[item.gasto]: {
						...prevValues[item.gasto],
						inputFields: {
							...prevValues[item.gasto]?.inputFields,
							NuevoGasto: '',
						}
					},
					[newGastoName]: {
						checkbox: { ...newGasto.checkbox },
					},
				}

				return updatedValues
			})

			setAdditionalRows((prevRows) => [...prevRows, { ...newGasto }])
		}
	}

	const handleSubmit = async (event, setResponse, setPostState) => {
		event.preventDefault()
		const formData = {
			"incidentId": incid,
			"orderId": ordnumber,
			"recipient_email": userdata.email,
			"manuales": { ...formValues, observaciones }
		}
		try {
			console.log("formdata")
			console.log(formData);
			const response = await pythonInstance.post("/testpost", formData)
			console.log("response")
			console.log(response.data)
			setResponse(response.data)
			setPostState(response.data)
		} catch (error) {
			console.error("Error submitting form", error)
			toast.error(error.response?.data?.error || "Error submitting form")
		} finally {
			setIsSubmitting(false)
		}
	}

	return { isSubmitting, handleSubmit, formValues, handleCheckboxChange, handleInputChange, otro, handleContentCheckboxChange, setotro, additionalRows, addRowHandler, observaciones, setObservaciones };
}

const GastosAdicionalesRow = ({ item, handlers, solicitantes }) => {
	const { gasto, checkbox, inputFields, contentArray } = item;
	const { formValues, handleCheckboxChange, handleInputChange, otro, handleContentCheckboxChange, setotro } = handlers;

	const isChecked = formValues[gasto]?.checkbox?.isChecked || false;

	const itemkeys = Object.keys(item.inputFields)

	return (
		<React.Fragment>
			<tr>
				<td>{gasto}</td>
				<td>
					<input
						type="checkbox"
						checked={isChecked}
						onChange={() => handleCheckboxChange(gasto)}
					/>
				</td>
				{isChecked && (
					<React.Fragment>
						{itemkeys.includes('Cantidad/Monto') ?
							<td>
								<input
									type="text"
									value={formValues[gasto]?.inputFields?.['Cantidad/Monto'] || ''}
									onChange={(e) => handleInputChange(e, gasto, 'Cantidad/Monto')}
								/>
							</td> : null}
						{itemkeys.includes("Solicitante") ? <td>
							<select
								value={formValues[gasto]?.inputFields?.Solicitante || ''}
								onChange={(e) => handleInputChange(e, gasto, 'Solicitante')}
							>
								<option value="">Selecciona un solicitante</option>
								{solicitantes.map((option, optionIndex) => (
									<option key={optionIndex} value={option}>
										{option}
									</option>
								))}
							</select>
						</td> : null}
					</React.Fragment>
				)}
			</tr>
			{isChecked && contentArray && contentArray.length > 0 && (
				<tr>
					<td colSpan="4">
						<div>
							{contentArray.map((option, optionIndex) => (
								<div key={optionIndex}>
									<label>
										<input
											type="checkbox"
											checked={formValues[gasto]?.contentArray?.includes(option) || false}
											onChange={(e) => handleContentCheckboxChange(gasto, option)}
										/>{' '}
										{option}
										{option === 'Otro' && (
											<input
												type="text"
												class="ig-reporte-otro-text-input"
												value={formValues[gasto]?.inputFields?.otro || ''}
												onChange={(e) => handleInputChange(e, gasto, 'otro')}
											/>
										)}
									</label>
								</div>
							))}
						</div>
					</td>
				</tr>
			)}
		</React.Fragment>
	)
}

const AddGastosAdicionalesRow = ({ item, handlers }) => {
	const { gasto, checkbox, inputFields, contentArray } = item;
	const { formValues, handleCheckboxChange, handleInputChange, otro, handleContentCheckboxChange, setotro, addRowHandler } = handlers;

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addRowHandler(item);
		}
	}

	return (
		<React.Fragment>
			<tr>
				<td>
					<input
						type="text"
						className="ig-reporte-addrow-text-input"
						value={formValues[gasto]?.inputFields?.['NuevoGasto'] || ''}
						onChange={(e) => handleInputChange(e, gasto, 'NuevoGasto')}
						onKeyDown={handleKeyDown}
						placeholder="Agregar Gasto"
					/>
				</td>
				<td>
					<div className="ig-reporte-addrow-button" onClick={() => addRowHandler(item)}><Plus /></div>
				</td>
			</tr>
		</React.Fragment>
	)
}

const IncidentGeneratorReporteTable = ({ incidentdata, setResponse, setPostState }) => {
	const { ordtype } = useParams()
	const { userdata } = useContext(UserContext)
	const handlers = useFormHandlers()

	const solicitantes = incidentdata?.solicitantes
	const data = incidentdata?.parametros
	const allData = [...data, ...handlers.additionalRows];
	
	const renderObservations = (observaciones, setObservaciones) => (
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
	)

	return (
		<div className="ig-data-cont">
			<div className="ig-reporte-cont">
				<form onSubmit={(event) => handlers.handleSubmit(event, setResponse, setPostState)}>
					<table border="1">
						<thead>
							<tr>
								<th colSpan="2">GASTOS ADICIONALES</th>
								{data?.some(item => item.inputFields["Cantidad/Monto"] !== undefined) && <th>CANTIDAD/MONTO</th>}
								{data?.some(item => item.inputFields.Solicitante !== undefined) && <th>SOLICITANTE</th>}
							</tr>
						</thead>
						<tbody>
							{allData?.filter(item => item.gasto !== "Adicional").map((item, index) => (
								<GastosAdicionalesRow key={index} item={item} handlers={handlers} solicitantes={solicitantes} />
							))}
							{allData?.filter(item => item.gasto === "Adicional").map((item, index) => (
								<AddGastosAdicionalesRow key={index} item={item} handlers={handlers} />
							))}
						</tbody>

					</table>
					{renderObservations(handlers.observaciones, handlers.setObservaciones)}
					<div className="ig-buttons-cont">
						<Link to={`/ordenes/${ordtype}`} className="ig-back-button">Volver</Link>
						<button type="submit" className="ig-send-button" disabled={handlers.isSubmitting}>Enviar</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default IncidentGeneratorReporteTable;