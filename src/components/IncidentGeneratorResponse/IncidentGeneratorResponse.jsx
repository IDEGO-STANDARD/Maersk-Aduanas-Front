import React from 'react'
import "./IncidentGeneratorResponse.css"

const IncidentGeneratorResponse = ({ response }) => {
	console.log(response)
	
	const RecursiveComponent = ({ data }) => {
		if (!data) {
			return null;
		}
	
		if (typeof data !== 'object') {
			return <span>{data}</span>;
		}
	
		return (
			<ul>
				{Object.entries(data).map(([key, value], index) => (
					<li key={index}>
						<strong>{key}:</strong> <RecursiveComponent data={value} />
					</li>
				))}
			</ul>
		);
	};
	
	
	const renderSubtable = (value) => (
		<td className="subitem-value">
			<RecursiveComponent data={value} />
		</td>
	);
	
	

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