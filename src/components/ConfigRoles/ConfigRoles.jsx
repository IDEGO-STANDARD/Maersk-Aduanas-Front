import ConfigurationsBase from "../ConfigurationsBase/ConfigurationsBase"
import "./ConfigRoles.css"


function ConfigRoles() {

    const editRegInputRows = [
        {label: "Nombre", name: "name", type: "text"}, 
        {label: "Modulos", type: "checkboxes", name: "modules", checkboxes: [
            {label: "Dashboard", name: "dashboard"},
            {label: "Reportes", name: "reportes"},
            {label: "Configuración", name: "configuracion"},
            {label: "Carga de solicitudes", name: "cargasolicitudes"},
            {label: "Gestión de solicitudes - OPE", name: "solicitudesope"},
            {label: "Gestión de solicitudes - FIN", name: "solicitudesfin"},
            {label: "Carga de anticipo", name: "cargaanticipo"},
            {label: "Gestión de solicitudes anticipo - OPE", name: "anticipoope"},
            {label: "Gestión de solicitudes anticipo - FIN", name: "anticipofin"},
            {label: "Gestión de liquidaciones - OPE", name: "liquidacionesope"},
            {label: "Gestión de liquidaciones - FIN", name: "liquidacionesfin"},
            {label: "Gestión de liquidaciones de anticipo - OPE", name: "liquidacionesanticipoope"},
            {label: "Gestión de liquidaciones de anticipo - FIN", name: "liquidacionesanticipofin"},
            {label: "Rendición viajes", name: "liquidaciontransportista"},
            {label: "Rendición anticipos", name: "liquidacionpersona"},
            {label: "Integraciones", name: "integraciones"},
            {label: "Guías de remisión", name: "guias"},
            {label: "App móvil", name: "app"},
            {label: "Administración usuarios", name: "configusers"},
            {label: "Administración transportistas", name: "configcarriers"},
            {label: "Administración personas", name: "configpeople"},
            {label: "Administración tarifarios", name: "configroutes"},
            {label: "Administración conceptos", name: "configconcepts"},
            {label: "Administración dispositivos", name: "configdevices"},
            {label: "Administración centros", name: "configcenters"},
            {label: "Administración movilidades", name: "configmobilities"},
            {label: "Administración roles", name: "configroles"},
            {label: "Administración impuestos de proveedor", name: "configtaxes"},
            {label: "Administración proveedores frecuentes", name: "configfrecuent"},
        ]}
    ]

    const createRegInputRows = [
        {label: "Nombre", name: "name", type: "text", ph: "Ingrese nombre del rol"}, 
        {label: "Modulos", type: "checkboxes", name: "modules", checkboxes: [
            {label: "Dashboard", name: "dashboard"},
            {label: "Reportes", name: "reportes"},
            {label: "Configuración", name: "configuracion"},
            {label: "Carga de solicitudes", name: "cargasolicitudes"},
            {label: "Gestión de solicitudes - OPE", name: "solicitudesope"},
            {label: "Gestión de solicitudes - FIN", name: "solicitudesfin"},
            {label: "Carga de anticipo", name: "cargaanticipo"},
            {label: "Gestión de solicitudes anticipo - OPE", name: "anticipoope"},
            {label: "Gestión de solicitudes anticipo - FIN", name: "anticipofin"},
            {label: "Gestión de liquidaciones - OPE", name: "liquidacionesope"},
            {label: "Gestión de liquidaciones - FIN", name: "liquidacionesfin"},
            {label: "Gestión de liquidaciones de anticipo - OPE", name: "liquidacionesanticipoope"},
            {label: "Gestión de liquidaciones de anticipo - FIN", name: "liquidacionesanticipofin"},
            {label: "Rendición viajes", name: "liquidaciontransportista"},
            {label: "Rendición anticipos", name: "liquidacionpersona"},
            {label: "Integraciones", name: "integraciones"},
            {label: "Guías de remisión", name: "guias"},
            {label: "App móvil", name: "app"},
            {label: "Administración usuarios", name: "configusers"},
            {label: "Administración transportistas", name: "configcarriers"},
            {label: "Administración personas", name: "configpeople"},
            {label: "Administración tarifarios", name: "configroutes"},
            {label: "Administración conceptos", name: "configconcepts"},
            {label: "Administración dispositivos", name: "configdevices"},
            {label: "Administración centros", name: "configcenters"},
            {label: "Administración movilidades", name: "configmobilities"},
            {label: "Administración roles", name: "configroles"},
            {label: "Administración impuestos de proveedor", name: "configtaxes"},
            {label: "Administración proveedores frecuentes", name: "configfrecuent"},   
        ]}
    ]
    
    const dataColumns = ["Nombre de rol"]

    const createDataObj = {name: "", modules: []}

    const filtersObj = [{key: "name", name: "Nombre", type: "text", ph: "Ingrese nombre de rol"}]

    const configpath = "/roles"

    const mainname = "Rol"

    const titlename = "Roles"

    const delkey = "id"

    const checkboxeskey = "modules"

    const tabname = "Administración"

    const setDataArr = (rawdata) => {
        const newarr = rawdata.map((row) => {
            return {name: row.name}
        })
        return newarr
    }

    return (
        <ConfigurationsBase editRegInputRows={editRegInputRows} mainname={mainname} tabname={tabname} createRegInputRows={createRegInputRows} dataColumns={dataColumns} createDataObj={createDataObj} filtersObj={filtersObj} configpath={configpath} titlename={titlename} delkey={delkey} checkboxeskey={checkboxeskey} setDataArr={setDataArr}/>
    )
}

export default ConfigRoles