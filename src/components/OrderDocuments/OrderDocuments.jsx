import { useOutletContext, useParams } from "react-router-dom";
import OrderDocumentDisplay from "../OrderDocumentDisplay/OrderDocumentDisplay";
import PageReload from "../PageReload/PageReload";
import Tabber from "../Tabber/Tabber";
import "./OrderDocuments.css";

const OrderDocuments = ({}) => {

    const { docutype } = useParams()
    const [order] = useOutletContext()


    const documentToDisplay = order.documents.find((document) => document.type === docutype)

    return (
        <>
            <Tabber order={order}/>
            <OrderDocumentDisplay document={documentToDisplay.documents[0]}/>
        </>
    )
}

export default PageReload(OrderDocuments, "docutype")
