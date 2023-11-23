import { useState } from "react"
import { TfiLayoutColumn3 } from "react-icons/tfi"
import "./TableRowColumnSelect.css"

const TableRowColumnSelect = ({ columns, changeColumnExceptions }) => {

    const renderedColumnSelects = columns.map((col) => {
        return (
            <div className="column-select-rendered-checkbox">
                <label htmlFor={col.name}>{col.name}</label>
                <input id={col.name} type="checkbox" checked={col.active} name={col.name} onChange={changeColumnExceptions}/>
            </div>
        )
    })

    return (
        <div className="column-select-checkboxes-cont">
            {renderedColumnSelects}
        </div>
    )
}


export default TableRowColumnSelect