import React from 'react'
// import "./IncidentGeneratorResponse.css"

const IncidentGeneratorResponse = ({ response }) => {
	const renderSubtable = (value) => (
		<td className="subitem-value">
			{typeof value !== 'object' ? value : (
				<ul className="sublist">
					{Object.entries(value).map(([subkey, subvalue], subindex) => (
						<li key={subindex} className="subitem">
							<strong>{subkey}:</strong> {subvalue}
						</li>
					))}
				</ul>
				)
			}
		</td>
	)

	return (
		<div id="response-container" className="ig-data-cont">
			<table id="response-table" className="response-table">
				<tbody>
					{Object.entries(response).map(([key, value], index) => (
						<tr key={index} id={`response-row-${index}`} className="response-row">
							<td className="response-key">
								<strong>{key}:</strong>
							</td>
							<td className="response-value">
								{typeof value === 'object' ? (
									<table className="subtable">
										<tbody>
											<tr className="subrow">
												{renderSubtable(value)}
											</tr>
										</tbody>
									</table>
								) : (
									value
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default IncidentGeneratorResponse;