import { useState } from "react"
import FiltersMenu from "../FiltersMenu/FiltersMenu"
import TableRowColumnSelect from "../TableRowColumnSelect/TableRowColumnSelect"
import { Filter } from "react-bootstrap-icons"
import { TfiLayoutColumn3 } from "react-icons/tfi"
import "./RowsTableConfigurationMenu.css"

const RowsTableConfigurationMenu = ({columns, filtersections, changeColumnExceptions}) => {

    const [openSection, setOpenSection] = useState(0)

    const toggleOpen = (section) => {
        setOpenSection((prev) => {
            if(prev === section) {
                return (0)
            }
            else {
                return section
            }
        })
    }

    return (
        <div className="rows-table-config-section-selector-cont">
            <div className="rows-table-buttons-cont">
                <div onClick={() => toggleOpen(1)} className="filter-open-button">
                    <Filter />
                </div>
                <div onClick={() => toggleOpen(2)} className="filter-open-button">
                    <TfiLayoutColumn3 />
                </div>
            </div>
            {openSection === 1 && <FiltersMenu filtersections={filtersections}/>}
            {openSection === 2 && <TableRowColumnSelect columns={columns} changeColumnExceptions={changeColumnExceptions} />}
        </div>
    )
}

export default RowsTableConfigurationMenu