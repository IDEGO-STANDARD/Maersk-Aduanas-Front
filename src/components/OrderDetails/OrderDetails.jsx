import { Link, useParams, useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import { EyeFill, EyeSlashFill, FileEarmarkPlusFill, FileEarmarkPlus, ArrowCounterclockwise } from "react-bootstrap-icons";
import DataDisplay from "../DataDisplay/DataDisplay";
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance";
import toast from "react-hot-toast";
import "./OrderDetails.css";
import { UserContext } from "../../context/UserContext";

const OrderDetails = ({ }) => {
    const { ordtype, ordnumber, docutype } = useParams()
    const [order, documentid, setDocumentid, handleChangeOrder, handleChangeDocument, handleChangeSubDocument, handleChangeValidationData, refreshData, isRefreshing] = useOutletContext()

    const { userdata, hasPermission } = useContext(UserContext)

    const [loading, setLoading] = useState(false)

    const createSintad = () => {
        setLoading(true)
        axiosPythonInstance.post(`/asignarLiquidador?id_ot=${ordnumber}`)
            .then((res) => {
                setLoading(false)
                toast.success("Solicitud de orden generada correctamente")
            })
            .catch((error) => {
                setLoading(false)
                console.error("ERROR", error)
                toast.error(error.response.data.error)
            })
    }

    const refreshPage = () => {
        refreshData()
    }    

    const handleDataChange = (itemName, newCheckedValue, newValue) => {
        handleChangeValidationData(itemName, newCheckedValue, newValue);
    }

    const handleSaveDetailChanges = () => {
        setLoading(true)
        const checkedData = order.data.filter(item => item.checked);
        const docqueryparam = `id=${ordnumber}`
        console.log({
            data: [...checkedData]
        })
        axiosPythonInstance.post(`/validarDetalles?${docqueryparam}`, {
            data: [...checkedData]
        })
            .then((res) => {
                console.log(res)
                setLoading(false)
                toast.success("Campos guardados correctamente")
            })
            .catch((error) => {
                setLoading(false)
                console.error("ERROR", error)
                toast.error(error.response?.data?.error || "Error guardando cambios")
            })
    }

    const handleFileAdd = (e, docutypeType, setPosting) => {
        const file = e.target.files[0]
    
        const formData = new FormData()
        formData.append("file", file)

        setPosting(true)
        
        const isConfirmed = window.confirm(`Deseas subir ${file.name} como ${docutypeType}?`)
        if (!isConfirmed) {
            setPosting(false)
            return
        }

        const queryParams = `?id=${encodeURIComponent(ordnumber)}&type=${encodeURIComponent(docutypeType)}`
        axiosPythonInstance
            .post(`/uploadFile${queryParams}`, formData)
            .then((res) => {
                console.log("Upload Response:", res.data)
                toast.success(`Solicitud generada correctamente para el archivo ${file.name} de tipo ${docutypeType}`)
            })
            .catch((error) => {
                setLoading(false)
                console.error("ERROR", error)
                toast.error(error.response?.data?.error || "Error al subir el archivo")
            })
            .finally(() => {
                setPosting(false)
            })
    }
    
    const renderDocutypes = order.documents.map((docutype) => {
        const [posting, setPosting] = useState(false);

        const handleFileUpload = () => {
            if (!posting) {
                document.getElementById(`fileInput-${docutype.type}`).click();
            }
        }


        return (
            <div className="docutypes-main-cont" key={docutype.type} >
                <span style={{ backgroundColor: docutype.documents.length && !docutype.documents[0].isDummy ? "rgb(60, 192, 60)" : "orange" }} className="docutypes-item-number">{docutype.documents[0].isDummy ? 0 : docutype.documents.length}</span>
                <span>{docutype.type}</span>
                <div className="docutypes-icons">
                    <div className={`docutypes-icon docutypes-icon-pointer ${posting ? 'docutypes-icon-opacity' : ''}`} onClick={handleFileUpload}>
                        {posting ? <FileEarmarkPlus /> : <FileEarmarkPlusFill />}
                        <input
                            type="file"
                            id={`fileInput-${docutype.type}`}
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileAdd(e, docutype.type, setPosting)}
                        />
                    </div>
                    {docutype.documents.length > 0 && !docutype.documents[0].isDummy
                        ? <Link to={`/ordenes/${ordtype}/${ordnumber}/${docutype.type}`} className="docutypes-icon docutypes-icon-pointer">
                            <EyeFill />
                        </Link>
                        :
                        <div className="docutypes-icon docutypes-icon-opacity">
                            <EyeSlashFill />
                        </div>}
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="od-split-div">
                <div className="od-fields-cont">
                    <DataDisplay minwidth="30%" data={order.data} edit={hasPermission("4")} handleChangeData={handleDataChange} />
                    <div className="od-button-cont">
                        {hasPermission("4") && <button disabled={loading} className="odd-save-changes-button" onClick={() => handleSaveDetailChanges()}>Guardar cambios</button>}
                        {hasPermission("4") && <button disabled={loading} onClick={createSintad} className="od-create-sintad-button">Crear en SINTAD</button>}
                    </div>
                </div>
                <div className="od-docutypes-cont">
                    <button onClick={refreshPage} className="od-refresh-button" disabled={isRefreshing}><ArrowCounterclockwise /></button>  
                    {renderDocutypes}
                </div>
            </div>
        </>
    )
}

export default OrderDetails
