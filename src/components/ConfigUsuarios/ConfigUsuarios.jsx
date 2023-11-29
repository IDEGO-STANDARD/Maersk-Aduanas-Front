import { useState, useEffect     } from "react"
import ConfigurationsBase from "../ConfigurationsBase/ConfigurationsBase"
import axiosPythonInstance from "../../axiosInstance/axiosPythonInstance"
import "./ConfigUsuarios.css"


function ConfigUsuarios() {

    const [roleOptions, setRoleOptions] = useState([])

    useEffect(() => {
        axiosPythonInstance.get("/api/roles")
        .then((res) => {
            console.log(res)
            setRoleOptions(() => {
                let resultarr = []
                resultarr.push({name: "Seleccione un rol", value: ""})
                res.data.data.forEach((role) => {
                    resultarr.push({name: role.name, value: role.id})
                })
                return resultarr    
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const editRegInputRows = [
        {label: "Usuario", name: "username", type: "text", ph: "Ingrese nombre de usuario"}, 
        {label: "Nombre", name: "first_name", type: "text", ph: "Ingrese nombre"}, 
        {label: "Apellido", name: "last_name", type: "text", ph: "Ingrese apellido"}, 
        {label: "Email", name: "email", type: "email", ph: "Ingrese email"}, 
        {label: "Contraseña", name: "password", type: "text", ph: "Ingrese contraseña"}, 
        {label: "Rol de usuario", required: true, name: "rol", type: "select", options: roleOptions},
    ]

    const createRegInputRows = [
        {label: "Usuario", name: "username", type: "text", ph: "Ingrese nombre de usuario"}, 
        {label: "Nombre", name: "first_name", type: "text", ph: "Ingrese nombre"}, 
        {label: "Apellido", name: "last_name", type: "text", ph: "Ingrese apellido"}, 
        {label: "Email", name: "email", type: "email", ph: "Ingrese email"}, 
        {label: "Contraseña", name: "password", type: "text", ph: "Ingrese contraseña"}, 
        {label: "Rol de usuario", required: true, name: "rol", type: "select", options: roleOptions},
    ]
    
    const dataColumns = ["Usuario", "Nombre", "Email", "Rol"]

    const createDataObj = {username: "", dni: "", email: "", firstName: "", lastName:"", profilePicture: "", status: "ACTIVO", password: "", modules: []}

    const filtersObj = [{key: "username", name: "Usuario", type: "text", ph: "Ingrese nombre de usuario"}, {key: "name", type: "text", name: "Nombre", ph: "Ingrese nombre de persona"}]

    const configpath = "/api/usuarios"

    const mainname = "Usuario"

    const titlename = "Usuarios"

    const filekey = "profilePicture"

    const delkey = "username"

    const checkboxeskey = "modules"

    const tabname = "Configuración"

    const setDataArr = (rawdata) => {
        const newarr = rawdata.map((row) => {
            return {username: row.username, dni: row.dni, email: row.email, name: `${row.firstName} ${row.lastName}`, status: row.status}
        })
        return newarr
    }

    return (
        <ConfigurationsBase editRegInputRows={editRegInputRows} mainname={mainname} tabname={tabname} createRegInputRows={createRegInputRows} dataColumns={dataColumns} createDataObj={createDataObj} filtersObj={filtersObj} configpath={configpath} titlename={titlename} filekey={filekey} delkey={delkey} checkboxeskey={checkboxeskey} setDataArr={setDataArr}/>
    )
}

export default ConfigUsuarios