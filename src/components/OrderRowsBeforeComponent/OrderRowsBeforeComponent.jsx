import { CheckLg, XLg, SlashCircle, BookmarkPlusFill, FolderFill } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "./OrderRowsBeforeComponent.css"

const OrderRowsBeforeComponent = ({ item }) => {


    const {ordtype} = useParams()

    const renderedIncidents = item.incidents.map((incident) => {
        return <div className="orbc-incident-cont">{incident}</div>
    })

    return (
        <div className="orbc-main-cont">
{            <div className="orbc-order-channel-cont">
                <span className="orbc-order-details-channel">CANAL</span>
                <div style={{backgroundColor: item.channel}} className="channel-orb"></div>
            </div>}
            <div className="orbc-order-details-cont">
                <span className="orbc-order-details-title">ORDEN DE TRABAJO</span>  
                <span className="orbc-order-details-title-value">Nro: {item.id}</span>
                <span className="orbc-order-details-client">Cliente: <span className="orbc-order-details-client-value">{item.client}</span></span>
                <div className="orbc-order-details-buttons-cont">
                    <Link to={`/ordenes/${ordtype}/validacion/${item.id}`} className="orbc-order-details-button" style={{color: "green"}}><CheckLg /></Link>
                    <div className="orbc-order-details-button" style={{color: "red"}}><XLg /></div>
                    <div className="orbc-order-details-button" style={{color: "red"}}><SlashCircle /></div>
                    <div className="orbc-order-details-button" style={{color: "blue"}}><BookmarkPlusFill /></div>
                    <Link to={`/ordenes/${ordtype}/${item.id}/${item.firstDocutype}`} className="orbc-order-details-button" style={{color: "orange"}}><FolderFill /></Link >
                </div>
            </div>
            <div className="orbc-order-incidents-cont">
                {renderedIncidents}
            </div>
        </div>
    )
}

export default OrderRowsBeforeComponent