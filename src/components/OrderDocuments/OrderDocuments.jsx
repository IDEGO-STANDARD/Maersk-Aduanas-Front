import { Link, useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderDocumentDisplay from "../OrderDocumentDisplay/OrderDocumentDisplay";
import "./OrderDocuments.css";
import Tabber from "../Tabber/Tabber";

const OrderDocuments = ({}) => {


    const { docutype } = useParams()
    const [order] = useOutletContext()

    const documentToDisplay = order.documents.find((document) => document.type === docutype)

    console.log(documentToDisplay)

    return (
        <>
            <Tabber order={order}/>
            <OrderDocumentDisplay document={documentToDisplay.documents[0]}/>
        </>
    )
}

export default OrderDocuments;
