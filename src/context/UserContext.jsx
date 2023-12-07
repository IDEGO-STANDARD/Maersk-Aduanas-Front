import React, { useState, useEffect } from "react"
const UserContext = React.createContext()

function UserContextProvider({children}) {
    
    const [isLogged, setIsLogged] = useState(() => false)
    const [userdata, setUserData] = useState(() => ({}))
    
    const handleSet = (obj) => {
        setUserData(obj)
        if(!obj.username) {
            localStorage.setItem('token', "");
        }
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userdata'))
        if(data) {
            setUserData(data)
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('userdata', JSON.stringify(userdata))
        if(userdata.email) {
            setIsLogged(true)
        }
        else {
            setIsLogged(false)
        }
    }, [userdata])

    const hasPermission = (permiso) => {
        return userdata.permisos && userdata.permisos.includes(permiso);
    }

    return (
        <UserContext.Provider value={{isLogged: isLogged, userdata: userdata, handleSet: handleSet, hasPermission: hasPermission}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }