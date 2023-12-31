import { Outlet, Navigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { BarChart, EnvelopePaperFill, People, Person, Lock, Gear } from "react-bootstrap-icons"
import { TbMailUp, TbMailDown, TbMail } from "react-icons/tb"
import { FaTowerCell } from "react-icons/fa6"
import Sidebar from "../Sidebar/Sidebar"
import Navbar from "../Navbar/Navbar"
import toast from "react-hot-toast"
import axiosInstance from "../../axiosInstance/axiosInstance"
import "./Main.css"

function Main() {

    
    const { isLogged, userdata, handleSet } = useContext(UserContext)
    const [timer, setTimer] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        axiosInstance.get("/verify-token")
        .then(() => {
        })
        .catch((error) => {
            if(error.response.status === 401) {
                handleSet({})
                toast.remove()
            }
        })
    }, [])

    let tabItems = []
    tabItems.push({
        name: "Dashboard",
        icon: <BarChart />,
        path: "/",
        submenus: []
    })
    tabItems.push({
        name: "Órdenes de trabajo",
        icon: <TbMail />,
        submenus: [
            {
                name: "Órdenes de trabajo ingreso",
                icon: <TbMailDown />,
                path: "/ordenes/ingreso"
            },
            {
                name: "Órdenes de trabajo salida",
                icon: <TbMailUp />,
                path: "/ordenes/salida"
            }
        ]
    })
    tabItems.push({
        name: "Torre de control",
        icon: <FaTowerCell />,
        path: "/control",
        submenus: []
    })
    let admintab = {
        name: "Administración",
        icon: <Gear />,
        submenus: []
    }
    if(userdata.permisos && userdata.permisos.includes("1")) {
        admintab.submenus.push({
            name: "Usuarios",
            icon: <Person />,
            path: "/administracion/usuarios"
        })
    }
    if(userdata.permisos && userdata.permisos.includes("2")) {
        admintab.submenus.push({
            name: "Roles",
            icon: <Lock />,
            path: "/administracion/roles"
        })
    }
    if(admintab.submenus.length > 0) {
        tabItems.push(admintab)
    }

    
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