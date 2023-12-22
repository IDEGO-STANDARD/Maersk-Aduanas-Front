import { useState, useEffect, useRef, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import instance from "../../axiosInstance/axiosInstance"
import pythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast"
import "./IncidentGenerator.css"
import IncidentGeneratorResponse from "../IncidentGeneratorResponse/IncidentGeneratorResponse"
import IncidentGeneratorDataSection from "../IncidentGeneratorDataSection/IncidentGeneratorDataSection"

const IncidentGenerator = () => {
	const { ordtype, ordnumber, incid } = useParams()
	const { userdata } = useContext(UserContext)
	const formRef = useRef(null)

	const [order, setOrder] = useState("")
	const [incidentParam, setIncidentsParam] = useState()
	const [paramLoading, setParamLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [postState, setPostState] = useState(false)

	const [formValues, setFormValues] = useState({})
	const [observaciones, setObservaciones] = useState("")

	useEffect(() => {
		const fetchOrderDetails = async () => {
			try {
				const res = await instance.get(`/get_detalle?id=${ordnumber}`)
				setOrder(res.data)
			} catch (error) {
				console.error("ERROR", error)
				toast.error(error.response?.data?.error || "Error fetching order details")
			}
		}

		const fetchIncidents = async () => {
			try {
				console.log(`/incidenciasParametros?operacion=${ordtype}&orderId=${ordnumber}&id=${incid}`)
				const response = await instance.get(`/incidenciasParametros?operacion=${ordtype}&orderId=${ordnumber}&id=${incid}`)
				setIncidentsParam(response.data)
				setParamLoading(false)
			} catch (error) {
				setParamLoading(false)
				setIncidentsParam(false)
				console.error("ERROR", error)
				toast.error(error.response?.data?.error || "Error fetching incidents")
			}
		}

		fetchOrderDetails()
		fetchIncidents()
	}, [ordnumber, ordtype, incid]);

	const handleInputChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: type === "checkbox" ? checked : value,
		}))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setIsSubmitting(true)

		// const formData = {
		// 	"incidentId": incid,
		// 	"orderId": ordnumber,
		// 	"operacion": ordtype,
		// 	"recipient_email": userdata.email,
		// 	"sistema": { ...incidentParam.parametros.sistema },
		// 	"manuales": { ...formValues, observaciones }
		// }
		const formData = {
			"incidentId": incid,
			"orderId": ordnumber,
			"operacion": ordtype,
			"recipient_email": "carlosandressmsm@gmail.com",
			"sistema": { ...incidentParam.parametros.sistema },
			"manuales": { ...formValues, observaciones }
		}

		try {
			console.log(formData)
			const response = await pythonInstance.post("/testpost", formData)
			toast.success("Form submitted successfully!")
			setIncidentsParam(response.data)
			setPostState(true)
		} catch (error) {
			console.error("ERROR", error)
			toast.error(error.response?.data?.error || "Error submitting form")
		} finally {
			setIsSubmitting(false)
		}
	}

	const renderSection = (title, value) => (
		<div className="ig-section-title">
			{`${title}: `}
			<span className="ig-order-title">{value}</span>
		</div>
	)

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
			{incidentParam !== false ?
				(postState ? <IncidentGeneratorResponse response={incidentParam} />
					: paramLoading ? <div className="ig-data-cont">Cargando...</div>
						: <IncidentGeneratorDataSection
							incidentdata={incidentParam}
							observaciones={observaciones}
							setObservaciones={setObservaciones}
							handleInputChange={handleInputChange}
							handleSubmit={handleSubmit}
							isSubmitting={isSubmitting}
							formValues={formValues}
							formRef={formRef}
						/>)
				: <div className="ig-data-cont">Error fetching incidents. Please try again later.</div>
			}
		</div>
	)
}

export default IncidentGenerator