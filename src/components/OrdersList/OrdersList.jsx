import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RowsTable from "../RowsTable/RowsTable";
import OrderRowsBeforeComponent from "../OrderRowsBeforeComponent/OrderRowsBeforeComponent";
import PageReload from "../PageReload/PageReload";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance/axiosInstance";
import FiltersMenu from "../FiltersMenu/FiltersMenu";
import TableRowColumnSelect from "../TableRowColumnSelect/TableRowColumnSelect";
import RowsTableConfigurationMenu from "../RowsTableConfigurationMenu/RowsTableConfigurationMenu"
import OrderPopup from "../OrderPopup/OrderPopup";
import OrderPopupIncident from "../OrderPopupIncident/OrderPopupIncident";
import "./OrdersList.css";
import { UserContext } from "../../context/UserContext";
import OrderPopupExport from "../OrderPopupExport/OrderPopupExport";

const OrdersList = ({ }) => {

    const [orders, setOrders] = useState([])
    const { ordtype } = useParams()
    const {userdata} = useContext(UserContext)
    const nav = useNavigate()

    const [loading, setLoading] = useState(true)
    const [columns, setColumns] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [itemsPerPage, setItemsPerPage] = useState()

    const [isIncidentPopupOpen, setIncidentPopupOpen] = useState(false)
    const [popupOrderId, setPopupOrderId] = useState(null)

    const [isExportPopupOpen, setExportPopupOpen] = useState(false)


    /*useEffect(() => {
        const fetchOrders = () => {
            console.log(`/ordenes?type=${ordtype}&email=${userdata.email}&rol=${userdata.rol}`)
            axiosInstance.get(`/ordenes?type=${ordtype}&email=${userdata.email}&rol=${userdata.rol}`)
                .then((res) => {
                    console.log(userdata.rol)
                    console.log(res.data[0])
                    setLoading(false)
                    setOrders(res.data)
                    console.log(res.data)
                    let cols = []
                    const objkeys = Object.keys(res.data[0].keys)
                    {
                        objkeys.forEach((key) => {
                            cols.push({
                                name: key,
                                active: true
                            })
                        })
                    }
                    console.log(cols)
                    setColumns(cols)

                })
                .catch((error) => {
                    setLoading(false)
                    console.error("ERROR", error)
                    toast.error(error.response.data.error)
                })
        }

        fetchOrders()

                //  const intervalId = setInterval(fetchOrders, 3000)
        
                // return () => {
                //     clearInterval(intervalId)
                // } 
    }, [])*/

    useEffect(() => {
        const fetchOrders = () => {
            const itemsPerPageParam = `&itemsPerPage=${itemsPerPage||"0"}` // If  0, return all ordenes. To change when Pagination is implemented
            // console.log(`/ordenes/${currentPage}?type=${ordtype}&email=${userdata.email}&rol=${userdata.rol}${itemsPerPageParam}`)
            axiosInstance.get(`/ordenes/${currentPage}?type=${ordtype}&email=${userdata.email}&rol=${userdata.rol}&itemsPerPage=0`)
                .then((res) => {
                    // console.log("***OrdersList:***")
                    console.log(res.data)
                    // console.log("*****************")
                    setLoading(false)
                    setTotalPages(res.data.totalPages)
                    setOrders(res.data.orders)
                    let cols = []
                    const objkeys = Object.keys(res.data.orders[0].keys)
                    {
                        objkeys.forEach((key) => {
                            cols.push({
                                name: key,
                                active: true
                            })
                        })
                    }
                    setColumns(cols)

                })
                .catch((error) => {
                    setLoading(false)
                    console.error("ERROR", error)
                    toast.error(error.response.data.error)
                })
        }

        fetchOrders()

        //interval to re send the request
        const intervalId = setInterval(fetchOrders, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [ordtype, currentPage, itemsPerPage])

    const changeColumnExceptions = (e) => {
        const colname = e.target.name
        setColumns((prev) => {
            let prevcols = [...prev]
            const index = prevcols.findIndex(col => {
                return col.name === colname
            })
            prevcols[index].active = e.target.checked
            return prevcols
        })
    }

    const openDetails = (index) => {
        // nav(`/ordenes/${ordtype}/detalles/${orders[index].id}`)
        nav(`/ordenes/${ordtype}/detalles/${index}`)
    }

    
    const filtersections = [
        {
            title: "Sección 1",
            type: "multiple",
            filters: [
                {
                    name: "Filtro 1"
                },
                {
                    name: "Filtro 2"
                },
                {
                    name: "Filtro 3"
                },
                {
                    name: "Filtro 10"
                },
                /*                 {
                                    name: "Filtro 11"
                                },
                                {
                                    name: "Filtro 12"
                                }, 
                                {
                                    name: "Filtro 13"
                                },
                                {
                                    name: "Filtro 14"
                                },
                                {
                                    name: "Filtro 15"
                                }, 
                                {
                                    name: "Filtro 16"
                                },
                                {
                                    name: "Filtro 17"
                                },
                                {
                                    name: "Filtro 18"
                                },  */
            ]
        },
        {
            title: "Sección 2",
            type: "checkboxes",
            filters: [
                {
                    name: "Opción 4"
                },
                {
                    name: "Opción 5"
                },
                {
                    name: "Opción 6"
                },
            ]
        },
        {
            title: "Sección 3",
            type: "select",
            filters: [
                {
                    name: "Filtro 7"
                },
                {
                    name: "Filtro 8"
                },
                {
                    name: "Filtro 9"
                },
            ]
        },
    ] 



    let columnExceptions = []
    columns.forEach((col) => {
        if (!col.active) {
            columnExceptions.push(col.name)
        }
    })

    const handleOpenIncidentPopup = (id) => {
        setPopupOrderId(id)
        setIncidentPopupOpen(true)
      };

    const handleCloseIncidentPopup = () => {
        setIncidentPopupOpen(false)
        setPopupOrderId(null)
    };

    const handleOpenExportPopup = (id) => {
        setExportPopupOpen(true)
      };

    const handleCloseExportPopup = () => {
        setExportPopupOpen(false)
    };

    return <div className="ol-main-cont">
        <span className="ol-title">MIS ÓRDENES DE TRABAJO {ordtype.toUpperCase()}</span>
        {/* <button onClick={handleOpenExportPopup}>Exportar a Excel</button> */}
        { /*<RowsTableConfigurationMenu filtersections={filtersections} columns={columns} changeColumnExceptions={changeColumnExceptions} /> */}
        
        <RowsTable columnExceptions={columnExceptions} loading={loading} data={orders} ComponentBeforeKeys={OrderRowsBeforeComponent} onClickFunc={openDetails} onOpenPopup={handleOpenIncidentPopup} />
        <OrderPopup isOpen={isIncidentPopupOpen} onClose={handleCloseIncidentPopup} info={popupOrderId} PopupComponent={OrderPopupIncident} />
        {/* <OrderPopup isOpen={isExportPopupOpen} onClose={handleCloseExportPopup} info={popupOrderId} PopupComponent={OrderPopupExport} contentClass={"export-popup-content"}/> */}
        <div></div>
        <div></div>
    </div>
}

export default PageReload(OrdersList, "ordtype");
