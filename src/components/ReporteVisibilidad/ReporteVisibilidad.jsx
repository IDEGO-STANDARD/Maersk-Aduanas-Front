import { Fragment, useState, useEffect, useRef } from "react"
import axiosInstance from "../../axiosInstance/axiosInstance"
import "./ReporteVisibilidad.css"
import { FilterSquare, FilterSquareFill, Grid3x2, Grid3x2GapFill, CloudDownload, CloudDownloadFill } from "react-bootstrap-icons";
import { TfiLayoutColumn3 } from "react-icons/tfi";

const Table = ({ data, columns, onClickFunc, offset, setNewOffset, pagesize, pageLeft, totalrows, pageRight, loading, tablecheck, checkedrows, handleChangeCheckedrows, error }) => {

    // useEffect(() => {
    //     if (tablecontref.current) {
    //         const initialHeight = tablecontref.current.offsetHeight
    //         tablecontref.current.style.maxHeight = `${initialHeight}px`
    //     }
    // }, [])

    const tablecontref = useRef(null);

    const columnsElems = columns.map((name, index) => {
        if (index + 1 === columns.length && tablecheck) {
            return <Fragment key={`${index} fragment`}>
                <div key={name} className="rv-table-col-box">{name}</div>
                <div key={"selection"} className="rv-table-col-box">Selección</div>
            </Fragment>
        }
        return <div key={name} className="rv-table-col-box">{name}</div>
    })

    const rowsElems = data.map((reg, index) => {
        let counter = -1
        let elemsArr = []
        {
            Object.keys(reg).forEach((key) => {
                counter = counter + 1
                elemsArr.push(<div key={index + counter} onClick={onClickFunc ? (e) => { onClickFunc(e, index) } : () => { }} id={columns[counter]} className="rv-table-row-box" style={{ backgroundColor: index % 2 === 1 ? "#e6e6e6" : "white", cursor: onClickFunc ? "pointer" : "default" }}>{reg[key] || reg[key] === 0 ? reg[key] : "----"}</div>)
            })
        }
        return elemsArr
    })

    return (
        <div ref={tablecontref} className="rv-table-main-cont">
            <div className="rv-table-sub-grid-cols" style={{ gridTemplateColumns: tablecheck ? `repeat(${columns.length + 1}, 1fr)` : `repeat(${columns.length}, 1fr)` }}>
                {columnsElems}
            </div>
            {data.length === 0 ?
                <div className="loading-table-text">{loading ? "Cargando registros..." : error ? "Error al cargar los registros" : "No hay registros"}</div>
                :
                <div className="rv-table-sub-grid-elems" style={{ gridTemplateColumns: tablecheck ? `repeat(${columns.length + 1}, 1fr)` : `repeat(${columns.length}, 1fr)` }}>
                    {rowsElems}
                </div>
            }
        </div>
    )
}

const TableFilters = ({ columns, filtersections, changeColumnExceptions }) => {
    console.log("Filters")
    const [openSection, setOpenSection] = useState(0)
    const [activeFilterList, setActiveFilterList] = useState([])

    const toggleOpen = (section) => {
        setOpenSection((prev) => {
            if (prev === section) {
                return (0)
            }
            else {
                return section
            }
        })
    }

    const FiltersMenu = ({ filtersections, setActiveFilterList, activeFilterList }) => {
        const [filterValues, setFilterValues] = useState({ activeFilterList })
        const [openSections, setOpenSections] = useState({})

        const handleChange = (section, name, value, type) => {
            console.log(value)
            setFilterValues((prevValues) => ({
                ...prevValues,
                [section]: {
                    ...(prevValues[section] || {}),
                    [name]: type === "checkbox" ? !prevValues[section]?.[name] : value,
                },
            }))
        }

        const toggleSection = (section) => {
            setOpenSections((prevOpenSections) => ({
                ...prevOpenSections,
                [section]: !prevOpenSections[section],
            }))
        }

        const applyFilters = () => {
            console.log("Filter values:", filterValues);
            setActiveFilterList(filterValues)
        }

        const clearFilters = () => {
            setActiveFilterList({})
        }

        const saveFilters = () => {
            setActiveFilterList(filterValues)
            console.log("Filtros a guardar", filterValues);
        }

        const FilterItem = ({ type, value, section, name, onChange, label }) => (
            <div className="rv-filter-item">
                {type === "text" && (
                    <input type="text" className="rv-input-text" placeholder={name} value={value}
                        onChange={(e) => onChange(section, name, e.target.value, type)}
                    />
                )}
                {type === "checkbox" && (
                    <label className="rv-input-label">
                        <input type="checkbox" className="rv-input-checkbox" checked={value || false}
                            onChange={(e) => onChange(section, name, e.target.checked, type)}
                        />
                        {label || name}
                    </label>
                )}
                {type === "date" && (
                    <input type="date" className="rv-input-date" value={value}
                        onChange={(e) => onChange(section, name, e.target.value, type)}
                    />
                )}
                {/* Add more types as needed */}
            </div>
        )

        const renderFilters = (filters, section) => {
            return filters.map(({ name, type, value, label }) => (
                <FilterItem
                    key={name}
                    type={type}
                    value={filterValues[section]?.[name] || value || ""}
                    section={section}
                    name={name}
                    onChange={handleChange}
                    label={label}
                />
            ))
        }

        const renderSections = (sections, isChildren) => {
            return Object.entries(sections).map(([section, filters]) => (
                <div key={section} className="rv-filter-section">
                    {isChildren ? <h5>{section}</h5>
                        : <h4 onClick={() => toggleSection(section)}>{section}</h4>
                    }
                    {(openSections[section] || isChildren) && (
                        <div className="rv-filter-section-content">
                            {Array.isArray(filters) ? (
                                renderFilters(filters, section)
                            ) : (
                                <div className="rv-sub-filter-section">
                                    {renderSections(filters, true)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))
        }

        return (
            <div className="rv-filters-menu">
                <div className="rv-filters-filters-cont">
                    {renderSections(filtersections, false)}
                </div>
                <div className="rv-filters-button-cont">
                    <button className="rv-filters-button" onClick={applyFilters}>Aplicar</button>
                    <button className="rv-filters-button" onClick={clearFilters}>Limpiar</button>
                    <button className="rv-filters-button" onClick={saveFilters}>Guardar</button>
                </div>
            </div>
        )
    }

    const DownloadTable = ({ filtersections }) => {

    }

    const FilterButton = ({ id, filtername, iconOpen, iconClose }) => (
        <>
            <div onClick={() => toggleOpen(id)} className="rv-filter-open-button" >
                {openSection !== id ? iconClose : iconOpen}
            </div >
            {
                openSection === id && <h2 className="rv-filter-button-title">
                    {filtername}
                </h2>
            }
        </>
    )

    return (
        <div className="rv-filter-section-selector-cont">
            <div className="rv-filter-buttons-cont">
                <FilterButton id={1} filtername={'Filtros'} iconOpen={<FilterSquareFill />} iconClose={<FilterSquare />} />
                <FilterButton id={2} filtername={'Columnas'} iconOpen={<Grid3x2GapFill />} iconClose={<Grid3x2 />} />
                <FilterButton id={3} filtername={'Descargar'} iconOpen={<CloudDownloadFill />} iconClose={<CloudDownload />} />
            </div>
            {openSection === 1 && <FiltersMenu filtersections={filtersections} setActiveFilterList={setActiveFilterList} activeFilterList={activeFilterList} />}
            {/* {openSection === 2 && <TableColumnSelect columns={columns} changeColumnExceptions={changeColumnExceptions} />} */}
            {openSection === 3 && <DownloadTable filtersections={filtersections} />}
        </div>
    )
}

const ReporteVisibilidad = () => {

    const FULLCOLUMNS = {
        columns: ["Referencia Cliente", "Numero de DAM", "Aduana", "Modalidad", "Regimen", "BK/BL", "POL", "POD", "Puerto", "Numero de Cnt", "Nave", "Linea naviera", "ETA", "ETD", "CIF", "FOB", "F. Entrega de Documentos", "F. direccionamiento", "F. VB", "F. Previo", "F. DAM", "Canal", "F. Reconocimiento Fisico", "Boletin", "F. Termino de descarga", "F. Levante", "ACE", "F. Retiro", "F. Regularizacion"]
    }
    const FULLDATA = () => {
        const data = Array.from({ length: 30 }, (_, index) => {
            const rowData = {};
            FULLCOLUMNS.columns.forEach((columnName) => { rowData[columnName] = `${index}-${columnName}_Value${Math.floor(Math.random() * 100)}` })
            return rowData
        })
        return data
    }

    const TableData = { ...FULLCOLUMNS, data: FULLDATA() }
    const columns = TableData.columns
    const data = TableData.data

    const filtersections = {
        Referencia: [
            { name: 'Referencia cliente', type: 'text', value: '' },
            { name: 'Referencia Maersk', type: 'text', value: '' },
        ],
        'BL/BK': [
            { name: 'BL', type: 'text', value: '' },
            { name: 'BK', type: 'text', value: '' },
        ],
        'DAM/Regimen': [
            { name: 'Numero de DAM', type: 'text', value: '' },
            { name: 'Codigo Regimen', type: 'text', value: '' },
            { name: 'Regimen', type: 'text', value: '' },
        ],
        Aduana: [
            { name: 'Aerea', type: 'checkbox', value: true },
            { name: 'Maritima', type: 'checkbox', value: true },
            { name: 'Pisco', type: 'checkbox', value: true },
            { name: 'Tumbes', type: 'checkbox', value: true },
        ],
        Ubicaciones: [
            { name: 'POL', type: 'text', value: '' },
            { name: 'POD', type: 'text', value: '' },
        ],
        'Partes interesadas': [
            { name: 'Embarcador', type: 'text', value: '' },
            { name: 'Consignatario', type: 'text', value: '' },
        ],
        Fechas: {
            ETD: [
                { name: 'Del año hasta la fecha', type: 'date', value: '' },
                { name: 'Último mes', type: 'date', value: '' },
                { name: 'Ultima semana', type: 'date', value: '' },
            ],
            ETA: [
                { name: 'Del año hasta la fecha', type: 'date', value: '' },
                { name: 'Último mes', type: 'date', value: '' },
                { name: 'Ultima semana', type: 'date', value: '' },
            ],
        },
    }
    console.log("main")
    return (
        <div className="main-tab-cont">
            <TableFilters columns={columns.map(column => ({ "name": column, "active": true }))} filtersections={filtersections} />
            <Table columns={columns} data={data} />
        </div>
    )
}

export default ReporteVisibilidad