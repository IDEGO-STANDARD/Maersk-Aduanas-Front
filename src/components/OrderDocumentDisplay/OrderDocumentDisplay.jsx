import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataDisplay from "../DataDisplay/DataDisplay";
import "./OrderDocumentDisplay.css";

const OrderDocumentDisplay = ({ document }) => {

    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                    <DataDisplay data={document.data} />
                </div>
                <div className="od-fields-cont">
                    <embed className="odocd-embed" src={document.url} />
                </div>
            </div>
        </>
    )
}

export default OrderDocumentDisplay;
