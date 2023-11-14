import { useState } from "react"
import { CheckCircle, ChevronRight, XCircle, ChevronDown, Dash } from "react-bootstrap-icons"
import { BiSubdirectoryRight } from "react-icons/bi"
import "./DataOpener.css"

const DataOpener = ({ name, value }) => {

    const [opened, setOpened] = useState(false)

    const toggleOpen = () => {
        if(value) {
            setOpened((prev) => {
                return !prev
            })
        }
    }

    return (
        <div className="data-opener-cont">
            <div onClick={toggleOpen} style={{cursor: value ? "pointer": ""}} className="data-opener-chevron-name-cont">
                {value ? opened ? <ChevronDown className="data-opener-16px-icon"/> : <ChevronRight className="data-opener-16px-icon"/> :  <Dash className="data-opener-16px-icon"/>}
                <span>{name}</span>
                {value ? <CheckCircle style={{color: "green"}} className="data-opener-item-icon"/> : <XCircle style={{color: "red"}} className="data-opener-item-icon"/>}
            </div>
            {opened && <span className="data-opener-value-span"><BiSubdirectoryRight className="data-opener-16px-icon"/>{value}</span>}
        </div>
    )
}

export default DataOpener