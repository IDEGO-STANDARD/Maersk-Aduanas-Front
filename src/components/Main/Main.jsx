import { Outlet, Navigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { HouseFill, GearFill, Cash, TruckFrontFill, Book, CardChecklist, Clipboard2PlusFill, CashStack, FilePersonFill, Boxes, BarChart, EnvelopePaperFill } from "react-bootstrap-icons"
import Sidebar from "../Sidebar/Sidebar"
import Navbar from "../Navbar/Navbar"
import toast from "react-hot-toast"
import axiosInstance from "../../axiosInstance/axiosInstance"
import "./Main.css"

function Main() {

    
    const { isLogged, userdata, handleSet } = useContext(UserContext)
    const [timer, setTimer] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    
/*     useEffect(() => {
        axiosInstance.get("/users/validate-token")
        .then(() => {
        })
        .catch((error) => {
            if(error.response.status === 401) {
                handleSet({})
                toast.remove()
            }
        })
    }, []) */

    let tabItems = []
    tabItems.push({name: "Dashboard", icon: <BarChart />, path: "/"})
    tabItems.push({name: "Ordenes de trabajo", icon: <EnvelopePaperFill />, path: "/ordenes"})
    

    const handleToggleSidebar = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        setTimeout(() => {
            setTimer(true)
        }, 10)
    },[])


    return (
        <div className="main-cont">
            {isLogged ?
                <>
                    <Navbar handleToggleSidebar={handleToggleSidebar} isOpen={isOpen}/>
                    <div className="sidebar-outlet-cont">
                        <Sidebar isOpen={isOpen} tabs={tabItems}/>
                        <Outlet />
                    </div>
                </>
                :
                <>
                    {timer && <>
                        <Navigate to="/login" />
                    </>}
                </>
            }
        </div>
    )
}

export default Main