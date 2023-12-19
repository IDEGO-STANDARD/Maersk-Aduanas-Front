import { NavLink, useParams } from "react-router-dom"
import "./Tabber.css"

const Tabber = ({ order }, onClickSet) => {

    const {ordtype, ordnumber} = useParams()

    const docutypes = order.documents
    .filter((documentType) => documentType.documents.length > 0)
    .map((documentType) => documentType.type);
    const renderedTabs = docutypes.map((tab, index) => {
        return <NavLink key={`${index}-${tab}`} to={`/ordenes/${ordtype}/${ordnumber}/${tab}`} className="tabber-tab-cont">{tab}</NavLink >
    })

    return (
        <div id="tabber" className="tabber-main-cont">
            {renderedTabs}
        </div>
    )
}

export default Tabber