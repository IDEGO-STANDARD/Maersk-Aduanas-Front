import { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast"
import "./DataLoadPopup.css"

function DataLoadPopup({setSendReq, confirmfunction, handleSetDataSelectData, removeRegsKey, closefunction, uploadpath, confirmpath, text}) {

    const [loadfile, setLoadfile] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const { userdata } = useContext(UserContext)

    const handleLoad = (e) => {
        setLoadfile(e.target.files[0])
    }

    const handleSubmitData = (e) => {
        const form = new FormData();
        form.append("file", loadfile)
        form.append("sender", `${userdata.username}`)
        setSubmitting(true)
        if(uploadpath) {
            axiosInstance.post(`${confirmpath}${uploadpath}`, form)
            .then((res) => {
                toast.success(res.data.message)
                setSubmitting(false)
                confirmfunction(res.data.data, removeRegsKey)
                closefunction(e, true)
            })
            .catch((error) => {
                console.log(error)
                setSubmitting(false)
                toast.dismiss()
                toast.error(error.response.data.message)
                closefunction(e, true)
            })
            
        }
        else {
            axiosInstance.post(`${confirmpath}/parse`, form)
            .then((res) => {
                toast.success(`El archivo contiene ${res.data.data.length} registro(s) listos para insertar`)
                setSubmitting(false)
                handleSetDataSelectData(res.data.data)
                closefunction(e, true)
            })
            .catch((error) => {
                console.log(error)
                setSubmitting(false)
                toast.dismiss()
                if(error.response.status === 406) {
                    toast.error("El archivo solo contiene registros invalidos o ya existentes")
                }
                else {
                    toast.error(error.response.data.message)
                }
                closefunction(e, true)
            })
        }
    }

    return (
        <div className="data-load-outside-cont" id="outside-cont" onClick={(e) =>{closefunction(e, false)}}>
            <div className="data-load-main-cont">
                <span className="data-load-text">{text}</span>
                {!loadfile  && 
                    <label className="data-load-load-button" htmlFor="file-input">
                        Cargar archivo
                        <input required={true} id="file-input" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleLoad} style={{display:"none"}} type="file"/>
                    </label>
                }
                {loadfile && 
                <>
                    <div style={{display: "flex", color: "white", height: "30px"}}>
                        <div style={{marginRight: "0.5rem"}}>{loadfile.name}</div>
                        <div style={{color: "red", cursor: "pointer"}} onClick={() => setLoadfile("")}>✕</div>
                    </div>
                    <button disabled={submitting} className="data-load-button" onClick={handleSubmitData}>Enviar documento</button>
                </>
                }
            </div>
        </div>

    )
}

export default DataLoadPopup