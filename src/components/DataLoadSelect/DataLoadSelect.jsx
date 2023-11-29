import { useState } from "react"
import Table from "../Table/Table"
import axiosInstance from "../../axiosInstance/axiosInstance"
import toast from "react-hot-toast"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import "./DataLoadSelect.css"


function DataLoadSelect({ selectData, columns, addLoadToRaw, clearSelectData, configpath }) {

    const setDataInit = () => {
        return selectData.map((reg) => {
            let dataObj = {}
            {Object.keys(reg).forEach((key) => {
                dataObj = {...dataObj, [key]: reg[key]}
            })}
            return dataObj
        })
    }

    const { userdata } = useContext(UserContext)

    const [acceptData, setAcceptData] = useState(() => setDataInit())
    const [rejectData, setRejectData] = useState([])
    const [submitting, setSubmitting] = useState(false)
        
    const rejectDataRow = (e, index) => {
        const row = acceptData[index]
        setAcceptData((prev) => {
            let newarr = [...prev]
            newarr.splice(index, 1)
            return newarr

        })
        setRejectData((prev) => {
            let newarr = [...prev]
            return [...newarr, row]
        })
    }

    const acceptDataRow = (e, index) => {
        const row = rejectData[index]
        setRejectData((prev) => {
            let newarr = [...prev]
            newarr.splice(index, 1)
            return newarr
        })
        setAcceptData((prev) => {
            let newarr = [...prev]
            return [...newarr, row]
        })
    }

    const handleMassDataLoad = () => {
        if(acceptData.length > 0) {
            setSubmitting(true)
            axiosInstance.post(`${configpath}/upload`, {sender: `${userdata.username}`, list: acceptData})
            .then((res) => {
                setSubmitting(false)
                toast.dismiss()
                console.log(res.data.data)
                if(res.data.data.length == 0) {
                    toast.error("No se inserto ningun registro")
                }
                else {
                    toast.success(`${res.data.data.length} registro(s) insertados correctamente`)
                    addLoadToRaw(res.data.data)
                }
                clearSelectData()
            })
            .catch((error) => {
                console.log(error)
                clearSelectData()
            })
        }
        else {
            clearSelectData()
        }
    }

    return (
        <div className="data-select-outside-cont">
            <div className="data-select-cont">
                <span>Haga click en los registros que no desee cargar</span>
                <Table data={acceptData} columns={columns} onClickFunc={rejectDataRow} loading={false}/>
                <span>Haga click en los registros que si desee cargar</span>
                <Table data={rejectData} columns={columns} onClickFunc={acceptDataRow} loading={false}/>
                <button disabled={submitting} className="data-select-load-button" onClick={handleMassDataLoad}>Cargar datos</button>
            </div>
        </div>
    )
}

export default DataLoadSelect