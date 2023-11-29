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

    let tabItems = [
        {
            name: "Dashboard",
            icon: <BarChart />,
            path: "/",
            submenus: [] // No submenus for Dashboard
        },
        {
            name: "Órdenes de trabajo",
            icon: <TbMail />, // Use a general icon for the parent tab
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
        },
        {
            name: "Torre de control",
            icon: <FaTowerCell />,
            path: "/control",
            submenus: [] // No submenus for Torre de control
        },
        {
            name: "Administración",
            icon: <Gear />,
            submenus: [
                {
                    name: "Usuarios",
                    icon: <Person />,
                    path: "/administracion/usuarios"
                },
                {
                    name: "Roles",
                    icon: <Lock />,
                    path: "/administracion/roles"
                }
            ] // No submenus for Torre de control
        }
    ];
    
    

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