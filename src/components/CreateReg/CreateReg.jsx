import { useState } from "react"
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup"
import ArraySelect from "../ArraySelect/ArraySelect"
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast"
import "./CreateReg.css"


function CreateReg({ filekey, back, stringfile, changeOpenCreate, freewidth, addRegToData, inputRows, createData, submitEndpoint, handleSetCreateData, title, handleRemoveFile, clearCreateReg, additionalfunc}) {

    const [openconfirm, setOpenconfirm] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    const handleClick = (event) => {
        if (event.target.id === "outside-cont") {
            changeOpenCreate(false)
        }
    }

    const inputElems = inputRows.map((item) => {
        return (
            <div className="input-cont-div" key={item.name}>
                <label className="edit-reg-label" htmlFor={item.name}>{item.label}</label>
                {item.type === "select" ? 
                <select className="edit-reg-input" required={true} value={createData[item.name]} name={item.name} id={item.name} onChange={handleSetCreateData}>
                    {item.options.map((option, index) => {
                        return <option key={`${option.name} ${index}`} value={option.value}>{option.name}</option>
                    })}
                </select> 
                : item.type === "file" ? 
                <div className="input-cont-div">
                    {!createData[filekey]  && 
                        <label className="file-input-label" htmlFor="file-input">
                            Subir archivo
                            <input required={item.required} id="file-input" accept={item.accept} onChange={handleSetCreateData} style={{display:"none"}} name={item.name} type="file"/>
                        </label>
                    }
                    {createData[filekey] && <div style={{display: "flex", color: "white", height: "30px"}}>
                        <div style={{marginRight: "0.5rem"}}>{createData[filekey].name}</div>
                        <div style={{color: "red", cursor: "pointer"}} onClick={handleRemoveFile}>✕</div>
                    </div>}
                </div>
                : item.type === "checkboxes" ? 
                <div className="checkboxes-cont">
                {item.checkboxes.map((checkbox) => {
                    return (
                        <div key={checkbox.label} className="input-cont-div" style={{gap: "3px"}}>
                            <label htmlFor={checkbox.name}>{checkbox.label}</label>
                            <input type="checkbox" name={checkbox.name} id={item.type} onChange={handleSetCreateData} checked={createData[item.name].includes(checkbox.name)}/>
                        </div>
                    )
                })}
                </div>
                : item.type === "arrayselect" ?
                <ArraySelect item={item} dataarr={createData[item.name]} handleInsert={handleSetCreateData} inputs={item.inputs}/>
                :<input className="edit-reg-input" placeholder={item.ph} required={true} disabled={item.disabled} type={item.type} name={item.name} id={item.name} onChange={handleSetCreateData} value={createData[item.name]}/>
                }
            </div>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setOpenconfirm(1)
    }

    const closeConfirm = (e) => {
        setOpenconfirm(0)
    }


    const submitReg = () => {
        setSubmitting(true)
        let config = {}
        let body = {}
        body = {...createData}
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        {Object.keys(body).forEach((key) => {
            if(regex.test(body[key])) {
                body[key] = `${body[key]}T00:00:00.000Z`
            }
            if(Array.isArray(body[key])) {
                body[key].forEach((obj) => {
                    {Object.keys(obj).forEach((subkey) => {
                        if(regex.test(obj[subkey])) {
                            obj[subkey] = `${obj[subkey]}T00:00:00.000Z`
                        }
                    })}
                })
            }
        })}
        if(stringfile) {
            config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let rest = {...body}
            let form = new FormData()
            if(filekey) {
                form.set(filekey, body.file)
                delete rest[filekey]
            }
            form.set(stringfile, JSON.stringify(rest))
            console.log(form.get(stringfile))
            body = form
        }
        else if(filekey) {
            config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let form = new FormData()
            {Object.keys(body).forEach((key) => {
                if(body[key] != "") {
                    form.set(key, body[key])
                }
            })}
            body = form
        }
        console.log(body)
        axiosPythonInstance.post(submitEndpoint, body, config)
        .then((res) => {
            setSubmitting(false)
            if(additionalfunc) {
                additionalfunc()
            }
            toast.dismiss()
            console.log(res)
            addRegToData(res.data.data)
            toast.success(`${title} registrado/a exitosamente`)
            clearCreateReg()
            changeOpenCreate(false)
        })
        .catch((err) => {
            setSubmitting(false)
            console.log(err)
            toast.dismiss()
            toast.error(err.response.data.message)
            clearCreateReg()
            changeOpenCreate(false)
        })
    }

    const calcularTotal = () => {
        let totalPrice = 0
        {Object.keys(createData).forEach((key) => {
            if(Array.isArray(createData[key])) {
                createData[key].map((item) => {
                    totalPrice += item.price
                })
            }
        })}
        return totalPrice
    } 

    return (
        <div className="edit-reg-cont" id="outside-cont" onClick={handleClick}>
            <div className="edit-reg-main-cont" style={{maxWidth: freewidth ? "1000px" : "600px"}}>
                {openconfirm === 1 && <ConfirmationPopup cancelfunc={closeConfirm} acceptfunc={submitReg} submitting={submitting} text={`¿Estás seguro de que quieres crear el/la ${title.toLowerCase()}?`}/>}
                <span className="edit-reg-title">Crear {title}</span>
                <hr className="edit-reg-hr"></hr>
                <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                    {inputElems}
                    {title === "Tarifario" && <div className="input-cont-div">
                        <span className="edit-reg-label">Monto total</span>
                        <span style={{color: "white", fontSize: "1.1rem"}}>S/{calcularTotal()}</span>
                    </div>}
                    <div style={{display: "flex", flexDirection: "row", width: "100%", bottom: "10px", left: "0px"}}>
                        {back ? <button type="button" className="edit-reg-back-button" onClick={() => {changeOpenCreate(false)}}>Volver</button> : <div></div>}
                        <button className="edit-reg-confirm-btn">Crear {title.toLowerCase()}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateReg