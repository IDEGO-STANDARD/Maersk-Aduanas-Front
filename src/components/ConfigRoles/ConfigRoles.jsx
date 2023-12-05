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
        {label: "Nombre", name: "rol", type: "text"}, 
        {label: "Modulos", type: "checkboxes", name: "permisos", checkboxes: modulos}
    ]

    const createRegInputRows = [
        {label: "Nombre", name: "rol", type: "text", ph: "Ingrese nombre del rol"}, 
        {label: "Modulos", type: "checkboxes", name: "permisos", checkboxes: modulos}
    ]
    
    const dataColumns = ["Nombre de rol"]

    const createDataObj = {rol: "", permisos: []}

    const filtersObj = [{key: "nombre", name: "Nombre", type: "text", ph: "Ingrese nombre de rol"}]

    const configpath = "/roles"

    const mainname = "Rol"

    const titlename = "Roles"

    const delkey = "id"

    const checkboxeskey = "permisos"

    const tabname = "Administración"

    const setDataArr = (rawdata) => {
        const newarr = rawdata.map((row) => {
            return {nombre: row.rol}
        })
        return newarr
    }

    return (
        <ConfigurationsBase editRegInputRows={editRegInputRows} mainname={mainname} tabname={tabname} createRegInputRows={createRegInputRows} dataColumns={dataColumns} createDataObj={createDataObj} filtersObj={filtersObj} configpath={configpath} titlename={titlename} delkey={delkey} checkboxeskey={checkboxeskey} setDataArr={setDataArr}/>
    )
}

export default ConfigRoles