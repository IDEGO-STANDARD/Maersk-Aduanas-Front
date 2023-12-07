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
        {label: "Usuario", name: "usuario", type: "text", ph: "Ingrese nombre de usuario"}, 
        {label: "Nombre", name: "nombre", type: "text", ph: "Ingrese nombre"}, 
        {label: "Apellido", name: "apellido", type: "text", ph: "Ingrese apellido"}, 
        {label: "Email", name: "email", type: "email", ph: "Ingrese email"}, 
        {label: "Celular", name: "celular", type: "celular", ph: "Ingrese numero celular"}, 
        {label: "Rol de usuario", required: true, name: "id_rol", type: "select", options: roleOptions},
        {label: "Estado", required: true, name: "estado", type: "select", options: [{name: "Activo", value: "Activo"},{name: "Inactivo", value: "Inactivo"}]},
    ]

    const createRegInputRows = [
        {label: "Usuario", name: "usuario", type: "text", ph: "Ingrese nombre de usuario"}, 
        {label: "Nombre", name: "nombre", type: "text", ph: "Ingrese nombre"}, 
        {label: "Apellido", name: "apellido", type: "text", ph: "Ingrese apellido"}, 
        {label: "Email", name: "email", type: "email", ph: "Ingrese email"}, 
        {label: "Contraseña", name: "password", type: "password", ph: "Ingrese contraseña"}, 
        {label: "Rol de usuario", required: true, name: "id_rol", type: "select", options: roleOptions},
    ]
    
    const dataColumns = ["Usuario", "Nombre", "Email", "Celular", "Rol"]

    const createDataObj = {usuario: "", email: "" , celular: "" ,nombre: "", apellido:"", password: "", id_rol: "", estado: "Activo"}

    const filtersObj = [{key: "usuario", name: "Usuario", type: "text", ph: "Ingrese nombre de usuario"}, {key: "name", type: "text", name: "Nombre", ph: "Ingrese nombre de persona"}]

    const configpath = "/usuarios"

    const mainname = "Usuario"

    const titlename = "Usuarios"

    const delkey = "email"

    const tabname = "Administración"

    const setDataArr = (rawdata) => {
        const newarr = rawdata.map((row) => {
            return {usuario: row.usuario, name: `${row.nombre} ${row.apellido}`, email: row.email, celular: row.celular, rol: row.rol}
        })
        return newarr
    }

    return (
        <ConfigurationsBase editRegInputRows={editRegInputRows} mainname={mainname} tabname={tabname} createRegInputRows={createRegInputRows} dataColumns={dataColumns} createDataObj={createDataObj} filtersObj={filtersObj} configpath={configpath} titlename={titlename} delkey={delkey} setDataArr={setDataArr}/>
    )
}

export default ConfigUsuarios