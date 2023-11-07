import { useState, useEffect } from "react"
import axiosInstance from "../../axiosInstance/axiosInstance"
import "./ControlTowerInfo.css"

const ControlTowerInfo = () => {

    const [order, setOrder] = useState("")
    
    useEffect(() => {
        axiosInstance("/")
        .then((res) => {
            setOrder(res.data)
        })
        .catch((error) => {
            console.error("ERROR", error)
            toast.error(error.response.data.error)
        })
    }, [])

    const renderedInfoboxes = order.info


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