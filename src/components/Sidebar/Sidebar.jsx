import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, tabs }) {
    const [activeSubmenus, setActiveSubmenus] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        if (tab.submenus && tab.submenus.length > 0) {
            // Toggle the submenu by adding or removing it from the array
            setActiveSubmenus(activeSubmenus.includes(tab.name) 
                ? activeSubmenus.filter(name => name !== tab.name)
                : [...activeSubmenus, tab.name]);
        } else {
            // Navigate to the tab's path if it has no submenus
            navigate(tab.path);
            // Do not change the activeSubmenus state
        }
    };
    

    const navLinkElems = tabs.map((tab) => {
        const isActive = (tab.path !== "/" ? location.pathname.includes(tab.path) : location.pathname === tab.path) || (tab.submenus && tab.submenus.some(submenu => location.pathname.includes(submenu.path)));
        const isSubmenuActive = tab.submenus && tab.submenus.length > 0 && activeSubmenus.includes(tab.name);

        return (
            <div className={`sidebar-tab ${isActive ? 'maintbasactive' : ''} ${isSubmenuActive ? "reducedpadding" : ""}`} key={tab.name}>
                <div className="sidebar-title-icon-cont" onClick={() => handleTabClick(tab)}>
                    <div className="navlink-icon">{tab.icon}</div>
                    <span className={isOpen ? "navlink-tab-name" : "navlink-tab-name-closed"}>{tab.name}</span>
                </div>
                {isSubmenuActive && (
                    <div className="submenu-container">
                        {tab.submenus.map((submenu) => {
                            const isSubmenuItemSelected = location.pathname.includes(submenu.path);
                            const colorStyle = isSubmenuItemSelected || !isActive ? 'white' : 'black';
                            return (
                                <NavLink
                                    to={submenu.path}
                                    key={submenu.name}
                                    className={`sidebar-submenu-navlinks ${isSubmenuItemSelected ? 'active' : ''}`}
                                    style={{ color: colorStyle }}
                                >
                                    <div className="navlink-icon">{submenu.icon}</div>
                                    <span className={isOpen ? "submenu-tab-name" : "submenu-tab-name-closed"}>{submenu.name}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    });

    return (
        <>
            <div id="sidebar" className={`sidebar-cont ${!isOpen && "sidebar-closed"}`}>
                {navLinkElems}
            </div>
        </>
    );
}

export default Sidebar;
