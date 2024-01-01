import { useRef, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

const IncidentGeneratorDataSection = ({ incidentdata, handleSubmit, observaciones, setObservaciones, isSubmitting, handleInputChange, formValues, formRef }) => {
	const { ordtype } = useParams();
	const { userdata } = useContext(UserContext)

	const renderInputs = (name, type, content, index) => {
		// console.log('Name:', name)
		// console.log('Type:', type)
		// console.log('Content:', content)
		
		return (
			<div key={index} style={{ minWidth: "18%" }} className="ig-rendered-keys-key-cont">
				<div className="ig-rendered-keys-top-cont">
					<span className="ig-rendered-keys-key-text">{name}</span>
				</div>
				{type === 'radio' ? (
					<div>
						{content.map((option, i) => (
							<label key={i}>
								<input
									type="radio"
									value={option}
									name={name}
									checked={formValues[name] === option}
									onChange={handleInputChange}
								/>
								{option}
							</label>
						))}
					</div>
				) : type === 'select' ? (
					<div>
					  <label className="ig-rendered-keys-label">
						<select
						  value={formValues[name] || ''}
						  onChange={handleInputChange}
						  name={name}
						  className="ig-rendered-keys-select"
						>
						  <option value="">Selecciona una opción</option>
						  {content.map((option, i) => (
							<option key={i} value={option}>
							  {option}
							</option>
						  ))}
						</select>
					  </label>
					</div>
				  ) : type === 'checkbox' ? (
					<label>
						<input
							type="checkbox"
							checked={formValues[name] || false}
							className="ig-rendered-keys-value-checkbox"
							onChange={handleInputChange}
							name={name}
						/>
					</label>
				) : type === 'date' ? (
					<div>
						<label>
							<input
								type="date"
								value={formValues[name] || ''}
								onChange={handleInputChange}
								name={name}
							/>
						</label>
					</div>
				) : type === 'button' ? (
					<button
						type="button"
						className="ig-back-button"
						onClick={() => handleButtonClicked(name)}
					>
						{name}
					</button>
				) : (
					<input
						className={`ig-rendered-keys-value-${type || 'text'}`}
						type={type || 'text'}
						value={formValues[name] || content || ''}
						name={name}
						onChange={handleInputChange}
					/>
				)}
			</div>
		)
	}

	const renderManualInputs = () => (
		<div className="ig-ingreso-cont">
		  <form ref={formRef} onSubmit={handleSubmit}>
			{Object.entries(incidentdata.parametros.manuales).map(([name, { type, content }], index) => renderInputs(name, type, content, index))}
			{renderObservations()}
			{renderButtons()}
		  </form>
		</div>
	  )

	const renderSistemaInputs = () => (
		<div className="ig-sistema-cont">
			{Object.entries(incidentdata.parametros.sistema).map(renderSistemaItem)}
			{Object.keys(incidentdata.parametros.manuales).length === 0 && (
				<form ref={formRef} onSubmit={handleSubmit}>
					{renderObservations()}
					{renderButtons()}
				</form>
			)}
		</div>
	)

	const renderSistemaItem = ([key, value], index) => (
		<div key={index} className="ig-rendered-keys-key-cont">
			<div className="ig-rendered-keys-top-cont">
				<span className="ig-rendered-keys-key-text">{key}</span>
			</div>
			<input type="text" className="ig-rendered-keys-value-text" value={value || 'Dato inválido/no existe.'} disabled />
		</div>
	)

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
	)

	const renderButtons = () => (
		<div className="ig-buttons-cont">
			<Link to={`/ordenes/${ordtype}`} className="ig-back-button">Volver</Link>
			<button type="submit" className="ig-send-button" disabled={isSubmitting}>Enviar</button>
		</div>
	)

	return(
		<div className="ig-data-cont">
			{Object.keys(incidentdata.parametros.manuales).length > 0 && renderManualInputs()}
			{Object.keys(incidentdata.parametros.sistema).length > 0 && renderSistemaInputs()}
		</div>
	)
}

export default IncidentGeneratorDataSection;