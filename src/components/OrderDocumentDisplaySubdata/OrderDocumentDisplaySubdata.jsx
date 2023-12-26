import { useState } from "react";
import "./OrderDocumentDisplaySubdata.css";

const OrderDocumentDisplaySubdata = ({ nestedData, minwidth = "18%", handleChangeData, edit, documentid, subDocName }) => {
    const [selectedId, setSelectedId] = useState(0)

    console.log("nestedData")

    const data = nestedData[selectedId]
    console.log(data)
    const dropdownOptions = Object.keys(nestedData).map((id) => (
        <option key={id} value={id}>
            {parseInt(id) + 1}
        </option>
    ));

    const renderedKeys = data && (
        <div style={{ minWidth: minwidth }} className="dd-rendered-keys-subcont">
            <div style={{ minWidth: minwidth }} className="dd-rendered-keys-key-cont">
                <div className="dd-rendered-keys-top-cont">
                    <span className="dd-rendered-keys-key-text">{subDocName}</span>
                    {data.hasOwnProperty('checked') && edit &&<input className="dd-rendered-keys-checkbox" type="checkbox" checked={data.checked}
                        onChange={(e) => {
                            handleChangeData(data.id, e.target.checked, data.data, documentid);
                        }}
                    />}
                </div>
                <select value={selectedId} onChange={(e) => setSelectedId(parseInt(e.target.value))}>{dropdownOptions}</select>
            </div>
            {Object.entries(data.data).map(([name, value], index) => (
                <div key={index} style={{ minWidth: minwidth }} className="dd-rendered-keys-key-cont">
                    <div className="dd-rendered-keys-top-cont">
                        <span className="dd-rendered-keys-key-text">{name}:</span>
                    </div>
                    <input type="text" className="dd-rendered-keys-value-text" value={value} disabled={edit && data.checked}
                        onChange={(e) => {
                            const updatedData = {
                                ...data.data,
                                [name]: e.target.value,
                            }
                            handleChangeData(data.id, data.checked, updatedData, documentid)
                        }}
                    />
                </div>
            ))}
        </div>
    );


    return (
        <div className="dd-rendered-keys-cont">
            {renderedKeys}
        </div>
    )
}

export default OrderDocumentDisplaySubdata;
