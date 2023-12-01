import ConfigurationsBase from "../ConfigurationsBase/ConfigurationsBase"
import "./ConfigRoles.css"


function ConfigRoles() {

    const modulos = [
        {label: "Dashboard", name: "dashboard"},
        {label: "Ordenes de trabajo", name: "ordenestrabajo"},
        {label: "Torre de control", name: "torrecontrol"},
        {label: "Administracion usuarios", name: "adminusuarios"},
    ]

    const editRegInputRows = [
        {label: "Nombre", name: "nombre", type: "text"}, 
        {label: "Modulos", type: "checkboxes", name: "modules", checkboxes: modulos}
    ]

    const createRegInputRows = [
        {label: "Nombre", name: "nombre", type: "text", ph: "Ingrese nombre del rol"}, 
        {label: "Modulos", type: "checkboxes", name: "modules", checkboxes: modulos}
    ]
    
    const dataColumns = ["Nombre de rol"]

    const createDataObj = {nombre: "", modules: []}

    const filtersObj = [{key: "nombre", name: "Nombre", type: "text", ph: "Ingrese nombre de rol"}]

    const configpath = "/roles"

    const mainname = "Rol"

    const titlename = "Roles"

    const delkey = "id"

    const checkboxeskey = "modules"

    const tabname = "Administración"

    const setDataArr = (rawdata) => {
        const newarr = rawdata.map((row) => {
            return {nombre: row.nombre}
        })
        return newarr
    }

    return (
        <ConfigurationsBase editRegInputRows={editRegInputRows} mainname={mainname} tabname={tabname} createRegInputRows={createRegInputRows} dataColumns={dataColumns} createDataObj={createDataObj} filtersObj={filtersObj} configpath={configpath} titlename={titlename} delkey={delkey} checkboxeskey={checkboxeskey} setDataArr={setDataArr}/>
    )
}

export default ConfigRoles