import { useState } from "react"
import { Filter } from "react-bootstrap-icons"
import "./FiltersMenu.css"

const FiltersMenu = ({filtersections}) => {

    const renderedFilters = filtersections.map((filtersection) => {
        return <div className="rendered-filter-section-cont">
            <span className="filter-section-title">{filtersection.title}</span>
            <div className="filter-section-filters-cont">
                {filtersection.type === "multiple" ? 
                    filtersection.filters.map((filter) => {
                        return (<div className="filter-label-input-cont">
                            <label htmlFor={filter.name}>{filter.name}</label>
                            <input type="text" id={filter.name}/>
                        </div>)
                    })
                :
                filtersection.type === "checkboxes" ?
                    filtersection.filters.map((filter) => {
                        return (<div className="filter-label-checkbox-cont">
                            <label htmlFor={filter.name}>{filter.name}</label>
                            <input type="checkbox" id={filter.name}/>
                        </div>)
                    })
                :
                filtersection.type === "select" ?
                    <div className="filter-label-checkbox-cont">
                        <select className="filter-select">
                            {filtersection.filters.map((filter) => {
                                return <option>{filter.name}</option>
                            })}
                        </select>
                        <input type="text"/>
                    </div>
                :
                <></>
                }
            </div>
        </div>
    })

    return (
        <div className="filter-content-main-cont">
            {renderedFilters}
        </div>
    )
}


export default FiltersMenu