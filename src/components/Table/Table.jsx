import { Fragment, useState, useEffect, useRef } from "react"
import "./Table.css"

function Table({data, columns, onClickFunc, offset, setNewOffset, pagesize, pageLeft, totalrows, pageRight, loading, tablecheck, checkedrows, handleChangeCheckedrows, error}) {

    const tablecontref = useRef(null);

/*     useEffect(() => {
        if (tablecontref.current) {
          const initialHeight = tablecontref.current.offsetHeight
          tablecontref.current.style.maxHeight = `${initialHeight}px`
        }
    }, []) */
    
    const columnsElems = columns.map((name, index) => {
        if(index + 1 === columns.length && tablecheck) {
            return <Fragment key={`${index} fragment`}>
                <div key={name} className="table-col-box">{name}</div>
                <div key={"selection"} className="table-col-box">Selección</div>
            </Fragment> 
        }
        return <div key={name} className="table-col-box">{name}</div>
    })

    const rowsElems = data.map((reg, index) => {
        let counter = -1    
        let elemsArr = []
        {Object.keys(reg).forEach((key) => {
            counter = counter + 1
            elemsArr.push(<div key={index + counter} onClick={onClickFunc ? (e) => {onClickFunc(e, index)} : () => {}} id={columns[counter]} className="table-row-box" style={{backgroundColor: index % 2 === 1 ? "#e6e6e6" : "white", cursor: onClickFunc ? "pointer": "default"}}>{reg[key] || reg[key] === 0 ? reg[key] : "----"}</div>)
        })}
        if(tablecheck) {
            elemsArr.push(<div className="table-row-box" style={{backgroundColor: index % 2 === 1 ? "#e6e6e6" : "white"}} key={`${index + counter} checkboxcont`}><input key={`${index} checkbox`} type="checkbox" onChange={() => {handleChangeCheckedrows(index)}} className="checkedrow-table-checkbox" checked={checkedrows[index]} style={{cursor: "pointer"}} /></div>)
        }
        return elemsArr
    })

    return (
        <div ref={tablecontref} className="table-main-cont">
            <div className="table-sub-grid-cols" style={{gridTemplateColumns: tablecheck ? `repeat(${columns.length + 1}, 1fr)` : `repeat(${columns.length}, 1fr)`}}>
                {columnsElems}
            </div>
            {data.length === 0 ? 
                <div className="loading-table-text">{loading ? "Cargando registros..." : error ? "Error al cargar los registros" : "No hay registros"}</div>
                :
                <div className="table-sub-grid-elems" style={{gridTemplateColumns: tablecheck ? `repeat(${columns.length + 1}, 1fr)` : `repeat(${columns.length}, 1fr)`}}>
                    {rowsElems}
                </div>
            }
        </div>
    )
}

export default Table