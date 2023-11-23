import "./DataDisplay.css"

const DataDisplay = ({ data, minwidth="18%", handleChangeData }) => {

    const renderedKeys = data.map((elem, index) => {
        return (<div key={index} style={{minWidth: minwidth}} className="dd-rendered-keys-key-cont">
            <div className="dd-rendered-keys-top-cont">
                <span className="dd-rendered-keys-key-text">{elem.name}</span>
                {elem.hasOwnProperty('checked') && <input className="dd-rendered-keys-checkbox" onChange={(e) => {handleChangeData(elem.name, e.target.checked, elem.value)}} type="checkbox" checked={elem.checked}/>}
            </div>
            <input type="text" className="dd-rendered-keys-value-text" value={elem.value} onChange={(e) => {handleChangeData(elem.name, elem.checked, e.target.value)}} disabled={elem.hasOwnProperty('checked') ? elem.checked : true}/>
        </div>)
    })
    
    return (
        <div className="dd-rendered-keys-cont">
            {renderedKeys}
        </div>
    )

}

export default DataDisplay