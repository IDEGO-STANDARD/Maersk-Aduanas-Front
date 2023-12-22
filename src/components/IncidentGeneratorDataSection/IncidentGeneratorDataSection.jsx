import { useRef, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

const IncidentGeneratorDataSection = ({ incidentdata, handleSubmit, observaciones, setObservaciones, isSubmitting, handleInputChange, formValues, formRef }) => {
	const { ordtype } = useParams();
	const { userdata } = useContext(UserContext)
	console.log(Object.keys(incidentdata.parametros.sistema)?.length)

	const inputType = {
		"SINI": "checkbox",
		"Agente de Carga": "checkbox",
		"Certificado de Origen": "radio",
		"Adjuntar Documentos": "button",
		"Fecha" : "date"
	}

	const inputContent = {
		"Facturar a": "Maersk"
	}

	const inputList = {
		"Certificado de Origen": ["Si", "No", "Acogimiento Posterior"]
	};

	const renderInputs = (item, index) => (
		<div key={index} style={{ minWidth: "18%" }} className="ig-rendered-keys-key-cont">
			{item !== "Adjuntar Documentos" ? (
				<div className="ig-rendered-keys-top-cont">
					<span className="ig-rendered-keys-key-text">{item}</span>
				</div>
			) : null}
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
			) : inputType[item] === 'date' ? (
				<div>
				  <label>
					<input
					  type="date"
					  value={formValues[item] || ''}
					  onChange={handleInputChange}
					  name={item}
					/>
				  </label>
				</div>
			  ) : inputType[item] === 'button' ? (
				<button
				  type="button"
				  className="ig-back-button"
				  onClick={() => handleButtonClicked(item)}
				>
				  {item}
				</button>
			  ) : (
				<input
					className={`ig-rendered-keys-value-${inputType[item] || 'text'}`}
					type={inputType[item] || 'text'}
					value={formValues[item] || inputContent[item] || ''}
					name={item}
					onChange={handleInputChange}
				/>
			)}
		</div>
	);

	const renderManualInputs = () => (
		<div className="ig-ingreso-cont">
			<form ref={formRef} onSubmit={handleSubmit}>
				{incidentdata.parametros.manuales.map(renderInputs)}
				{renderObservations()}
				{renderButtons()}
			</form>
		</div>
	);

	const renderSistemaInputs = () => (
		<div className="ig-sistema-cont">
			{Object.entries(incidentdata.parametros.sistema).map(renderSistemaItem)}
			{incidentdata.parametros.manuales.length === 0 && (
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

	return(
		<div className="ig-data-cont">
			{incidentdata.parametros.manuales.length > 0 && renderManualInputs()}
			{Object.keys(incidentdata.parametros.sistema).length > 0 && renderSistemaInputs()}
		</div>
	)
}

export default IncidentGeneratorDataSection;