import { Link, useParams, useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons"
import DataDisplay from "../DataDisplay/DataDisplay";
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance"
import toast from "react-hot-toast";
import "./OrderDetails.css";
import { UserContext } from "../../context/UserContext";

const OrderDetails = ({}) => {

    const { ordtype, ordnumber } = useParams()
    const [order] = useOutletContext()

    const {userdata} = useContext(UserContext)

    const [loading, setLoading] = useState(false)

    const createSintad = () => {
        setLoading(true)
        axiosPythonInstance.post(`/asignarLiquidador?id_ot=${ordnumber}`)
        .then((res) => {
            setLoading(false)
            toast.success("Liqidador asignado correctamente")
        })
        .catch((error) => {
            setLoading(false)
            console.error("ERROR", error)
            toast.error(error.response.data.error)
        })
    }

    const renderDocutypes = order.documents.map((docutype) => {
        return (
            <div className="docutypes-main-cont" key={docutype.type} >
                <span style={{backgroundColor: docutype.documents.length && !docutype.documents[0].isDummy ? "rgb(60, 192, 60)" : "orange" }} className="docutypes-item-number">{docutype.documents[0].isDummy ? 0 : docutype.documents.length}</span>
                <span>{docutype.type}</span>
                {docutype.documents.length > 0 && !docutype.documents[0].isDummy ? <Link to={`/ordenes/${ordtype}/${ordnumber}/${docutype.type}`} className="docutypes-eye">
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
                    <DataDisplay minwidth="30%" data={order.data} edit={userdata.permisos &&  userdata.permisos.includes("4")} />
                    {userdata.permisos && userdata.permisos.includes("4") && <button disabled={loading} onClick={createSintad} className="od-create-sintad-button">Crear en SINTAD</button>}
                </div>
                <div className="od-docutypes-cont">
                    {renderDocutypes}
                </div>
            </div>
        </>
    )
}

export default OrderDetails
