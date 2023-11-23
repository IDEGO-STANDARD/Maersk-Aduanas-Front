import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RowsTable from "../RowsTable/RowsTable";
import OrderRowsBeforeComponent from "../OrderRowsBeforeComponent/OrderRowsBeforeComponent";
import PageReload from "../PageReload/PageReload";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosInstance/axiosInstance";
import FiltersMenu from "../FiltersMenu/FiltersMenu";
import TableRowColumnSelect from "../TableRowColumnSelect/TableRowColumnSelect";
import RowsTableConfigurationMenu from "../RowsTableConfigurationMenu/RowsTableConfigurationMenu"
import "./OrdersList.css";

const OrdersList = ({}) => {

    const [orders, setOrders] = useState([])
    const {ordtype} = useParams()
    const nav = useNavigate()

    const [loading, setLoading] = useState(true)
    const [columns, setColumns] = useState([])


    useEffect(() => {
        const fetchOrders = () => {
            axiosInstance.get(`/ordenes?type=${ordtype}`)
            .then((res) => {
                console.log(res.data[0])
                setLoading(false)
                setOrders(res.data)
                let cols = []
                const objkeys = Object.keys(res.data[0].keys)
                {objkeys.forEach((key) => {
                    cols.push({
                        name: key,
                        active: true
                    })
                })}
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

/*         const intervalId = setInterval(fetchOrders, 3000)

        return () => {
            clearInterval(intervalId)
        } */
    }, [])

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
        nav(`/ordenes/${ordtype}/detalles/${orders[index].id}`)
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
        if(!col.active) {
            columnExceptions.push(col.name)
        }
    })

    return <div className="ol-main-cont">
        <span className="ol-title">MIS ÓRDENES DE TRABAJO {ordtype.toUpperCase()}</span>
{/*         <div className="ol-filters-selector-cont">
            <FiltersMenu filtersections={filtersections}/>
            <TableRowColumnSelect columns={columns} changeColumnExceptions={changeColumnExceptions} />
        </div> */}
        <RowsTableConfigurationMenu filtersections={filtersections} columns={columns} changeColumnExceptions={changeColumnExceptions}/>
        <RowsTable columnExceptions={columnExceptions} loading={loading} data={orders} ComponentBeforeKeys={OrderRowsBeforeComponent} onClickFunc={openDetails}/>
        <div></div>
        <div></div>
    </div>
}

export default PageReload(OrdersList, "ordtype");
