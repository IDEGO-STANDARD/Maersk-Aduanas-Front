import { Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { PersonCircle, BoxArrowLeft, ChevronDown } from "react-bootstrap-icons"
import "./NavProfile.css"


function NavProfile({}) {

    const { userdata, handleSet } = useContext(UserContext)

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const profilelistener = document.addEventListener("mousedown", (e) => {
            if(e.target.id != "profile" && e.target.id != "profile-cont") {
                setIsOpen(false)
            }
        })

        return(() => {
            removeEventListener("mousedown", profilelistener)
        })
    }, [])

    const logout = () => {
        handleSet({})
    }

    const handleToggleOpenProfile = (e) => {
        if(e.target.id != "profile") {
            setIsOpen((prev) => !prev)
        }
    }

    return (
        <div className="navprofile-cont" onMouseDown={handleToggleOpenProfile} id="profile-cont">
            <span className="navprofile-name" id="profile-cont">{`${userdata.firstName} ${userdata.lastName}`} <ChevronDown id="profile-cont"/></span>
            {isOpen && <div className="navprofile-dropdown-cont" id="profile">
                <PersonCircle />
                <Link to="/perfil" className="profile-config-link" id="profile">Perfil y preferencias</Link>
                <BoxArrowLeft />
                <span className="logout-button" id="profile" onClick={() => {logout()}}>Cerrar sesión</span>
            </div>}
        </div>
    )
}

export default NavProfile