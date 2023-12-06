import { useState, useEffect     } from "react"
import ConfigurationsBase from "../ConfigurationsBase/ConfigurationsBase"
import axiosInstance from "../../axiosInstance/axiosInstance"
import "./ConfigUsuarios.css"


function ConfigUsuarios() {

    const [roleOptions, setRoleOptions] = useState([])

    useEffect(() => {
        axiosInstance.get("/roles")
        .then((res) => {
            console.log(res)
            setRoleOptions(() => {
                let resultarr = []
                resultarr.push({name: "Seleccione un rol", value: ""})
                res.data.forEach((role) => {
                    resultarr.push({name: role.nombre, value: role.id})
                })
                return resultarr    
            })
        })
        .catch((error) => {
            console.log("error de getroles")
            console.log(error)
        })
    }, [])


    const editRegInputRows = [
        {label: "Usuario", name: "username", type: "text", ph: "Ingrese nombre de usuario"}, 
        {label: "Nombre", name: "first_name", type: "text", ph: "Ingrese nombre"}, 
        {label: "Apellido", name: "last_name", type: "text", ph: "Ingrese apellido"}, 
        {label: "Email", name: "email", type: "email", ph: "Ingrese email"}, 
        {label: "Rol de usuario", required: true, name: "rol_id", type: "select", options: roleOptions},
    ]

    const createRegInputRows = [
        {label: "Usuario", name: "username", type: "text", ph: "Ingrese nombre de usuario"}, 
        {label: "Nombre", name: "first_name", type: "text", ph: "Ingrese nombre"}, 
        {label: "Apellido", name: "last_name", type: "text", ph: "Ingrese apellido"}, 
        {label: "Email", name: "email", type: "email", ph: "Ingrese email"}, 
        {label: "Contraseña", name: "password", type: "password", ph: "Ingrese contraseña"}, 
        {label: "Rol de usuario", required: true, name: "rol_id", type: "select", options: roleOptions},
    ]
    
    const dataColumns = ["Usuario", "Nombre", "Email", "Rol"]

    const createDataObj = {username: "", email: "" , first_name: "", last_name:"", password: "", rol_id: ""}

    const filtersObj = [{key: "username", name: "Usuario", type: "text", ph: "Ingrese nombre de usuario"}, {key: "name", type: "text", name: "Nombre", ph: "Ingrese nombre de persona"}]

    const configpath = "/usuarios"

    const mainname = "Usuario"

    const titlename = "Usuarios"

    const delkey = "id"

    const tabname = "Administración"

    const setDataArr = (rawdata) => {
        const newarr = rawdata.map((row) => {
            return {username: row.username, name: `${row.first_name} ${row.last_name}`, email: row.email, rol: row.rol}
        })
        return newarr
    }

    return (
        <ConfigurationsBase editRegInputRows={editRegInputRows} mainname={mainname} tabname={tabname} createRegInputRows={createRegInputRows} dataColumns={dataColumns} createDataObj={createDataObj} filtersObj={filtersObj} configpath={configpath} titlename={titlename} delkey={delkey} setDataArr={setDataArr}/>
    )
}

export default ConfigUsuarios