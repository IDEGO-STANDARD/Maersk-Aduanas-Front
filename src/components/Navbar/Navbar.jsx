import { List, Bell, BellFill, XLg } from "react-bootstrap-icons"
import logomaersk from "../../assets/logomaersk.png"
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown"
import NavProfile from "../NavProfile/NavProfile"
import { useState } from "react"
import "./Navbar.css"

function Navbar({isOpen, handleToggleSidebar}) {

    const [openNotis, setOpenNotis] = useState(false)

    const notis = ["Hubo un problema con el viaje #123213", "Hubo un problema con el viaje #555555"]

    const handleToggleNotis = () => {
        setOpenNotis((prev) => !prev)
    }

    const handleCloseNotis = () => {
        setOpenNotis(false)
    }

    return (
        <nav className="navbar-cont">
            {isOpen ? <XLg className="navbar-3-lines-open-button" onClick={handleToggleSidebar}/> : <List className="navbar-3-lines-open-button" onClick={handleToggleSidebar}/>}
            <img className="navbar-img" src={logomaersk}/>
            <div className="navbar-bell-cont">
{/*                 {openNotis ? <BellFill className="notis-bell" onClick={handleToggleNotis}/> : <Bell className="notis-bell" onClick={handleToggleNotis}/>}
                {openNotis && <NotificationsDropdown notis={notis} handleCloseNotis={handleCloseNotis}/>} */}
            </div>
            <NavProfile />
        </nav>
    )

}

export default Navbar