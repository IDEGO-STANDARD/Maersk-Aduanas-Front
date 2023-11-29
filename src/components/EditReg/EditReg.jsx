import { useState } from "react"
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup"
import ArraySelect from "../ArraySelect/ArraySelect"
import "./EditReg.css"


function EditReg({index, data, inputRows, deleteReg, changeEditRow, title, applyChanges, checkboxeskey, submitting}) {

    const [newData, setNewData] = useState(() => data[index])
    const [hasEdited, setHasEdited] = useState(false)
    const [openconfirm, setOpenconfirm] = useState(0)

    const handleChangeNewData = (e, item = {}) => {
        setHasEdited(true)
        setNewData((prev) => {
            if(e.target.id === "checkboxes") {
                let newcheckboxes = [...prev[checkboxeskey]]
                if(!e.target.checked) {
                    const index = newcheckboxes.indexOf(e.target.name);
                    newcheckboxes.splice(index, 1);
                }
                else {
                    newcheckboxes.push(e.target.name)
                }
                return {...prev, [checkboxeskey]: newcheckboxes}
            }
            if(item.name) {
                if(item.type === "add") {
                    const prevarr = prev[item.name]
                    return {...prev, [item.name]: [...prevarr, item.value]}
                }
                else if(item.type === "edit") {
                    const prevarr = [...prev[item.name]]
                    if(e.target.type === "number") {
                        prevarr[item.index] = {...prevarr[item.index], [e.target.name]: parseInt(e.target.value)} 
                    }
                    else {
                        prevarr[item.index] = {...prevarr[item.index], [e.target.name]: e.target.value}
                    }
                    return {...prev, [item.name]: prevarr}
                }
                else if(item.type === "delete") {
                    let prevarr = [...prev[item.name]]
                    prevarr.splice(item.index, 1)
                    return {...prev, [item.name]: prevarr}
                }
            }
            else {
                if(e.target.type === "number") {
                    return {...prev, [e.target.name]: parseInt(e.target.value)} 
                }
                else {
                    return {...prev, [e.target.name]: e.target.value}
                }
            }
        })
    }

    const handleClick = (event) => {
        if (event.target.id === "outside-cont") {
            changeEditRow(-1)
        }
    }

    const handleDelete = () => {
        setOpenconfirm(2)
    }

    const inputElems = inputRows.map((item) => {
        return (
            <div className="input-cont-div" key={item.name}>
                <label className="edit-reg-label" htmlFor={item.name}>{item.label}</label>
                {item.type === "select" ? 
                <select className="edit-reg-input" required={true} value={newData[item.name]} name={item.name} id={item.name} onChange={handleChangeNewData}>
                    {item.options.map((option) => {
                        return <option key={option.name} value={option.value}>{option.name}</option>
                    })}
                </select> : 
                item.type === "checkboxes" ? 
                <div className="checkboxes-cont">
                {item.checkboxes.map((checkbox) => {
                    return (
                        <div className="input-cont-div" key={checkbox.label} style={{gap: "3px"}}>
                            <label htmlFor={checkbox.name}>{checkbox.label}</label>
                            <input type="checkbox" name={checkbox.name} id={item.type} onChange={handleChangeNewData} checked={newData[item.name].includes(checkbox.name)}/>
                        </div>
                    )
                })}
                </div>
                : item.type === "arrayselect" ?
                <ArraySelect item={item} dataarr={newData[item.name]} handleInsert={handleChangeNewData} inputs={item.inputs}/>
                :
                <input className="edit-reg-input" required={true} disabled={item.disabled} type={item.type} name={item.name} id={item.name} onChange={handleChangeNewData} value={newData[item.name]}/>
                }
            </div>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(hasEdited) {
            setOpenconfirm(1)
        }
        else {
            changeEditRow(-1)
        }
    }

    const closeConfirm = (e) => {
        setOpenconfirm(0)
    }

    const calcularTotal = () => {
        let totalPrice = 0
        {Object.keys(newData).forEach((key) => {
            if(Array.isArray(newData[key])) {
                newData[key].map((item) => {
                    totalPrice += item.price
                })
            }
        })}
        return totalPrice
    } 

    return (
        <div className="edit-reg-cont" id="outside-cont" onClick={handleClick}>
            <div className="edit-reg-main-cont">
                {openconfirm === 1 && <ConfirmationPopup cancelfunc={closeConfirm} acceptfunc={() => {applyChanges(index, newData)}} submitting={submitting} text={`¿Estás seguro de que quieres editar el/la ${title.toLowerCase()}?`}/>}
                {openconfirm === 2 && <ConfirmationPopup cancelfunc={closeConfirm} acceptfunc={() => {deleteReg(index)}} submitting={submitting} text={`¿Estás seguro de que quieres eliminar el/la ${title.toLowerCase()}?`}/>}
                <span className="edit-reg-title">Editar {title}</span>
                <hr className="edit-reg-hr"></hr>
                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                    {inputElems}
                    {title === "Tarifario" && <div className="input-cont-div">
                        <span className="edit-reg-label">Monto total</span>
                        <span style={{color: "white", fontSize: "1.1rem"}}>S/{calcularTotal()}</span>
                    </div>}
                    <div style={{display: "flex", flexDirection: "row", width: "100%", bottom: "10px", left: "0px"}}>
                        <button className="edit-reg-delete-btn" type="button" onClick={handleDelete}>Eliminar {title}</button>
                        <button className="edit-reg-confirm-btn">Aplicar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditReg