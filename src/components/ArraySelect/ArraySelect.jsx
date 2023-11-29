import { useState } from "react"
import toast from "react-hot-toast"
import { TrashFill, PencilSquare } from "react-bootstrap-icons"
import "./ArraySelect.css"

function ArraySelect({ item, dataarr, inputs, handleInsert }) {

    const newrowbase = inputs.reduce((accumulator, input) => {
        return {...accumulator, [input.name]: ''};
    }, {})

    const [editReg, setEditReg] = useState(-1)

    const [newRow, setNewRow] = useState(newrowbase)

    const handleChangeNewRow = (e) => {
        setNewRow((prev) => {
            if(e.target.type === "number") {
                return {...prev, [e.target.name]: parseInt(e.target.value)}
            }
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleInsertNewArr = (e) => {
        let flag = false;
        {Object.keys(newRow).forEach((key) => {
            console.log(newRow[key])
            if(newRow[key] === "") {
                flag = true;
            }
        })}
        if(flag) {
            toast.dismiss()
            toast.error("Debe llenar todos los campos para insertar un nuevo elemento")
        }
        else {
            handleInsert(e, {type: "add", name: item.name, value: newRow})
            setNewRow(() => {
                return {...newrowbase}
            })
        }
    }

    const handleEditDataArr = (e, i) => {
        handleInsert(e, {type: "edit", name: item.name, index: i})
    }

    const handleDeleteReg = (e, i) => {
        handleInsert(e, {type: "delete", name: item.name, index: i})
    }

    const handleEditReg = (index) => {
        if(index != editReg) {
            setEditReg(index)
        }
        else {
            setEditReg(-1)
        }
    }

    const titleElems = inputs.map((input) => {
        return <span className="arrayselect-colname-span">{input.label}</span>
    })

    const inputElems = inputs.map((input) => {
        if(input.type === "select") {
            return <select key={input.name} value={newRow[input.name]} name={input.name} onChange={handleChangeNewRow}>
                {input.options.map((op) => {
                    return <option value={op.value}>{op.label}</option>
                })}
            </select>
        }
        return <input key={input.name} value={newRow[input.name]} name={input.name} type={input.type} placeholder={input.ph} onChange={handleChangeNewRow}/>
    })

    const rowsElems = dataarr.map((reg, index) => {
        let counter = -1
        let elemsArr = []
        if(editReg === index) {
            {Object.keys(reg).forEach((key) => {
                counter += 1
                if(inputs[counter].type === "select") {
                    elemsArr.push(<select onChange={(e) => {handleEditDataArr(e, index)}} name={inputs[counter % inputs.length].name} value={reg[key]}>
                        {inputs[counter % inputs.length].options.map((option) => {
                            return <option value={option.value}>{option.label}</option>
                        })}
                    </select>)
                }
                else {
                    elemsArr.push(<input onChange={(e) => {handleEditDataArr(e, index)}} name={inputs[counter % inputs.length].name} type={inputs[counter % inputs.length].type} key={counter} value={reg[key]}/>)
                }
            })}
        }
        else {
            {Object.keys(reg).forEach((key) => {
                counter += 1
                if(inputs[counter % inputs.length].type === "select") {
                    let i = 0
                    inputs[counter % inputs.length].options.forEach((option, index) => {
                        if(option.value === reg[key]) {
                            i = index
                        }
                    })
                    elemsArr.push(<div key={index + counter}>{inputs[counter % inputs.length].options[i].label}</div>)
                }
                else {
                    elemsArr.push(<div key={index + counter}>{reg[key]}</div>)

                }
            })}
        }
        const editButtonElem = <div key={`edit${index}`} onClick={() => {handleEditReg(index)}}><PencilSquare /></div>
        const deleteButtonElem = <div key={`delete${index}`} style={{color: "red"}} onClick={(e) => {handleDeleteReg(e, index)}}><TrashFill /></div>
        elemsArr.push(editButtonElem)
        elemsArr.push(deleteButtonElem)
        return elemsArr
    })
     
    return (
        <div className="arrayselect-cont" style={{gridTemplateColumns: `repeat(${inputs.length + 2}, auto)`}}>
            {titleElems}
            <span></span>
            <span></span>
            {inputElems}
            <div className="arrayselect-insert" onClick={handleInsertNewArr} style={{gridColumnStart: `${inputs.length + 1}`, gridColumnEnd: `${inputs.length + 3}`}}>INSERTAR</div>
            {rowsElems}
        </div>
    )
}

export default ArraySelect