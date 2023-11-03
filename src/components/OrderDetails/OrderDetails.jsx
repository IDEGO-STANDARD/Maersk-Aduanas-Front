import { Link, useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons"
import DataDisplay from "../DataDisplay/DataDisplay";
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast";
import "./OrderDetails.css";

const OrderDetails = ({}) => {

    const { ordnumber } = useParams()
    const [order] = useOutletContext()

    const renderDocutypes = order.documents.map((docutype) => {
        return (
            <div className="docutypes-main-cont" key={docutype.type} >
                <span style={{backgroundColor: docutype.documents.length > 0 ? "rgb(60, 192, 60)" : "orange" }} className="docutypes-item-number">{docutype.documents.length}</span>
                <span>{docutype.type}</span>
                {docutype.documents.length > 0 ? <Link to={`/ordenes/${ordnumber}/${docutype.type}`} className="docutypes-eye">
                    <EyeFill />
                </Link>
                :
                <div className="docutypes-cross-eye">
                    <EyeSlashFill />
                </div>}
            </div>
        )
    })

    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                    <DataDisplay data={order.data} />
                </div>
                <div className="od-docutypes-cont">
                    {renderDocutypes}
                </div>
            </div>
        </>
    )
}

export default OrderDetails
