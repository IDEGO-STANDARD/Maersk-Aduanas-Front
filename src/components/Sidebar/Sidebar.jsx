import { NavLink } from "react-router-dom"
import "./Sidebar.css"


function Sidebar({ isOpen, tabs }) {

    const navLinkElems = tabs.map((tab) => {
        return <NavLink to={tab.path} key={tab.name} className="sidebar-navlinks">
            <div className="navlink-icon">{tab.icon}</div>
            <span className={isOpen ? "navlink-tab-name" : "navlink-tab-name-closed"}>{tab.name}</span>
        </NavLink>
    })

    return (
        <>
            <div id="sidebar" className={`sidebar-cont ${!isOpen && "sidebar-closed"}`}>
                {navLinkElems}
            </div>
        </>
    )
}

export default Sidebar