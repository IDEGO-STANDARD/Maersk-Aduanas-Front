import { ArrowBarDown } from "react-bootstrap-icons";
import "./DataDisplay.css";
const DataDisplay = ({ data, minwidth = "18%", handleChangeData, edit, documentid }) => {

    const inputDate = (elem, index) => (
        <input type="date" className="dd-rendered-keys-value-text"
            value={elem.value}
            disabled={elem.hasOwnProperty("checked") && edit ? elem.checked : true}
            onChange={(e) => {
                handleChangeData(elem.name, elem.checked, e.target.value, documentid)
            }} />
    )

    const renderDropdownList = (elem, index) => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.dd-custom-select') === null) {
                const dropdowns = document.querySelectorAll('.dd-dropdown-content')
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show-dropdown')
                })
            }
        }

        document.addEventListener('click', handleClickOutside)

        return (
            <div className="dd-rendered-keys-value-dropdown">
                <input
                    type="text"
                    className="dd-rendered-keys-value-text-dropdown"
                    value={elem.value}
                    onChange={(e) => {
                        handleChangeData(elem.name, elem.checked, e.target.value, documentid)
                    }}
                    disabled={elem.hasOwnProperty("checked") && edit ? elem.checked : false}
                />
                <div className="dd-custom-select">
                    <button
                        className="dd-select-button"
                        onClick={(e) => {
                            e.currentTarget.nextSibling.classList.toggle("show-dropdown")
                            e.stopPropagation()
                        }}
                        disabled={elem.hasOwnProperty("checked") && edit ? elem.checked : false}
                    >
                        <ArrowBarDown />
                    </button>
                    <ul className="dd-dropdown-content">
                        {elem.content.map((option) => (
                            <li
                                key={option.codigo}
                                onClick={(e) => {
                                    handleChangeData(elem.name, elem.checked, option.codigo, documentid);
                                    e.currentTarget.parentNode.classList.remove("show-dropdown")
                                }}
                            >
                                {option.codigo} - {option.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }


    const renderedKeys = data
        ?.filter((elem) => elem.name !== "Instrucciones")
        .map((elem, index) => {
            let name = elem.name.charAt(0).toUpperCase() + elem.name.slice(1)

            const isFechaElement = elem.dataType === 'date'
            const isBool = elem.dataType === 'boolean'
            const isList = elem.dataType === "list"
            if (isList) {
                console.log(elem)
            }
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
                    {isFechaElement ? inputDate(elem, index)
                        // : isBool ? inputBool(elem, index) 
                        : isList ? renderDropdownList(elem, index)
                            : (
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
