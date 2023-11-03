import { NavLink } from "react-router-dom"
import "./Tabber.css"

const Tabber = ({ order }) => {

    const docutypes = order.documents
    .filter((documentType) => documentType.documents.length > 0)
    .map((documentType) => documentType.type);


    const renderedTabs = docutypes.map((tab) => {
        return <NavLink to={`/ordenes/${order.id}/${tab}`} className="tabber-tab-cont" onClick={() => {onClickFunc(tab)}}>{tab}</NavLink >
    })

    return (
        <div id="tabber" className="tabber-main-cont">
            {renderedTabs}
        </div>
    )
}

export default Tabber