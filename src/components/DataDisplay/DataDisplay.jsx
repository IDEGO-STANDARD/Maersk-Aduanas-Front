import "./DataDisplay.css";

const DataDisplay = ({ data, minwidth = "18%", handleChangeData, edit, documentid }) => {
    const renderedKeys = data
        ?.filter((elem) => elem.name !== "Instrucciones")
        .map((elem, index) => {
            let name = elem.name.charAt(0).toUpperCase() + elem.name.slice(1)
            console.log(elem)
            const isFechaElement = elem.dataType === 'date'
            const isBool = elem.dataType === 'boolean'

            return (
                <div key={index} style={{ minWidth: minwidth }} className="dd-rendered-keys-key-cont">
                    <div className="dd-rendered-keys-top-cont">
                        <span className="dd-rendered-keys-key-text">{name}</span>
                        {elem.hasOwnProperty("checked") && edit && (
                            <input
                                className="dd-rendered-keys-checkbox"
                                onChange={(e) => {
                                    handleChangeData(elem.name, e.target.checked, elem.value, documentid)
                                }}
                                type="checkbox"
                                checked={elem.checked}
                            />
                        )}
                    </div>
                    {isFechaElement ? (
                        <input
                            type="date"
                            className="dd-rendered-keys-value-text"
                            value={elem.value}
                            onChange={(e) => {
                                handleChangeData(elem.name, elem.checked, date, documentid);
                            }}
                            disabled={elem.hasOwnProperty("checked") && edit ? elem.checked : true}
                        />
                    ) : (
                        <input
                            type="text"
                            className="dd-rendered-keys-value-text"
                            value={elem.value}
                            onChange={(e) => {
                                handleChangeData(elem.name, elem.checked, e.target.value, documentid);
                            }}
                            disabled={elem.hasOwnProperty("checked") && edit ? elem.checked : true}
                        />
                    )}
                </div>
            )
        })

    const instructionsElement = data?.find((elem) => elem.name === "Instrucciones")

    return (
        <div className="dd-rendered-keys-cont">
            {renderedKeys}
            {instructionsElement && (
                    <div style={{ minWidth: "100%" }} className="dd-rendered-keys-key-cont">
                        <div className="dd-rendered-keys-top-cont">
                            <span className="dd-rendered-keys-key-text">Instrucciones</span>
                            {instructionsElement.hasOwnProperty("checked") && edit && (
                                <input
                                    className="dd-rendered-keys-checkbox"
                                    onChange={(e) => {
                                        handleChangeData(instructionsElement.name, e.target.checked, instructionsElement.value, documentid)
                                    }}
                                    type="checkbox"
                                    checked={instructionsElement.checked}
                                />
                            )}
                        </div>
                        <textarea
                            className="dd-rendered-keys-value-text"
                            value={instructionsElement.value}
                            onChange={(e) => {
                                handleChangeData(instructionsElement.name, instructionsElement.checked, e.target.value, documentid)
                            }}
                            disabled={instructionsElement.hasOwnProperty("checked") && edit ? instructionsElement.checked : true}
                        />
                    </div>
            )}
        </div>
    )
}

export default DataDisplay
