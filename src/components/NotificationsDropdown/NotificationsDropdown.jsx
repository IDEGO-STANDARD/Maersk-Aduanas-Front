import { EnvelopeFill } from "react-bootstrap-icons"
import { useState, useEffect } from "react"
import "./NotificationsDropdown.css"


function NotificationsDropdown({notis, handleCloseNotis}) {
    
    useEffect(() => {
        const notislistener = document.addEventListener("mousedown", (e) => {
            if(e.target.id != "notis") {
                handleCloseNotis()
            }
        })

        return(() => {
            removeEventListener("mousedown", notislistener)
        })
    }, [])

    return (
        <div id="notis" className="notis-dropdown-cont">
            {notis.map((noti, index) => {
                return (<div key={index} id="notis" className="noti-cont">
                    <EnvelopeFill className="noti-icon"/>
                    <span id="notis" className="noti-title">{noti}</span>
                </div>)
            })}
        </div>
    )
}

export default NotificationsDropdown