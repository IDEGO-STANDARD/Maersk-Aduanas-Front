import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axiosInstance from "../../axiosInstance/axiosInstance"
import DataOpener from "../DataOpener/DataOpener"
import toast from "react-hot-toast"
import "./ControlTowerInfo.css"

const ControlTowerInfo = () => {

    const [order, setOrder] = useState("")
    const {ordnumber} = useParams()
    
    useEffect(() => {
        axiosInstance(`/get_torre_de_control_exp?id=${ordnumber}`)
        .then((res) => {
            console.log(res.data)
            setOrder(res.data)
        })
        .catch((error) => {
            console.error("ERROR", error)
            toast.error(error.response.data.error)
        })
    }, [])

    console.log(order.control)

    const renderedInfoboxes = !order ? [] : order.info.map((item) => {
        return <div className="cti-infoboxes-cont">
            <span>{item.name}</span>
            <span>{item.value}</span>
        </div>
    })

    const renderedControlTowerBoxes = !order ? [] : order.control.map((item) => {
        return <div className="cti-towerbox-cont">
            <span className="cti-towerbox-title">{item.title}</span>
            <div className="cti-towerbox-items-cont">
                {item.data.map((field) => {
                    return <DataOpener name={field.name} value={field.value}/>
                })}
            </div>
        </div>
    })


    return (
        <div className="cti-main-cont">
            <div className="cti-upper-info-cont">
                {renderedInfoboxes}
            </div>
            <div className="cti-lower-info-cont">
                {renderedControlTowerBoxes}
            </div>
        </div>
    )
}

export default ControlTowerInfo