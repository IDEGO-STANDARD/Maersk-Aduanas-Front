import { useContext } from "react"
import { CheckLg, XLg, SlashCircle, BookmarkPlusFill, FolderFill } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import "./OrderRowsBeforeComponent.css"
import TooltipElement from "../TooltipElement/TooltipElement"
import "../OrderSintad/OrderSintad.css"

const OrderRowsBeforeComponent = ({ item, onOpenPopup, onClickFunc }) => {

    const {userdata, hasPermission} = useContext(UserContext)
    const {ordtype} = useParams()
    
    // let renderedIncidents = item.incidents.slice(0, 3).map((incident) => {
    //     return <div key={incident} className="orbc-incident-cont">{incident}</div>
    // })
    let lastIncident = item.incidents[item.incidents.length - 1];
    let bgColor = lastIncident !== "Instruccion Recibida" ? "rgb(228, 200, 59)" : "rgb(135, 224, 0)";

    let renderedIncidents =
        <div key={lastIncident} className="orbc-incident-cont" style={{ backgroundColor: bgColor }}>
            {lastIncident}
        </div>
    
    if(renderedIncidents.length === 0) {
        renderedIncidents.push(<div key={"No incident"} className="orbc-incident-cont">No hay incidencias</div>)
    }

    return (
        <div className="orbc-main-cont">
           
            <div className="orbc-order-title-id">
                <span className="orbc-order-details-title">SINTAD</span>
                <span className="orbc-order-details-id">{item.idSintad}</span>
            </div>
            <div className="orbc-order-details-cont" onClick={() => onClickFunc(item.id)}>
                <span className="orbc-order-details-title-value">{item.client}</span>
               
                <span className="orbc-order-details-client-value"> id: {item.id}</span>
                <div className="orbc-order-details-buttons-cont" style={{ width: hasPermission("4") ? "150px" : "90px" }} onClick={(e) => e.stopPropagation()}>
                    <TooltipElement tooltipText="Validación">
                        <Link to={`/ordenes/${ordtype}/${item.id}/validacion`} className="orbc-order-details-button" style={{ color: "green" }}><CheckLg /></Link>
                    </TooltipElement>
                    {userdata.permisos && userdata.permisos.includes("4") &&
                    <TooltipElement tooltipText="">
                        <div className="orbc-order-details-button" style={{ color: "red" }}><XLg /></div>
                    </TooltipElement>}
                    {userdata.permisos && userdata.permisos.includes("4") &&
                    <TooltipElement tooltipText="">
                        <div className="orbc-order-details-button" style={{ color: "red" }}><SlashCircle /></div>
                    </TooltipElement>}
                    <TooltipElement tooltipText="Generar Incidencia">
                        <div className="orbc-order-details-button" style={{ color: "blue" }} onClick={(e) => onOpenPopup(item.id)}><BookmarkPlusFill /></div>
                    </TooltipElement>
                    <TooltipElement tooltipText="Documentos">
                        <Link to={item.firstDocutype ? `/ordenes/${ordtype}/${item.id}/${item.firstDocutype}` : ""} className="orbc-order-details-button" style={{ color: "orange", opacity: item.firstDocutype ? "1" : "0.5" }}><FolderFill /></Link >
                    </TooltipElement>
                </div>
            </div>
            <div className="orbc-order-incidents-cont">
                {renderedIncidents}
            </div>
        </div>
    )
}

export default OrderRowsBeforeComponent