import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { ChevronLeft, ChevronRight, ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons"
import Table from "../Table/Table"
import EditReg from "../EditReg/EditReg"
import CreateReg from "../CreateReg/CreateReg"
import TabHeader from "../TabHeader/TabHeader"
import DataLoadSelect from "../DataLoadSelect/DataLoadSelect"
import axiosInstance from "../../axiosInstance/axiosInstance"
import DataLoadPopup from "../DataLoadPopUp/DataLoadPopUp"
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup"
import toast from "react-hot-toast"
import "./ConfigurationsBase.css"


function ConfigurationsBase({editRegInputRows, opencloseout, pagination=true ,reject, viajes, createExtra, defaultfilter, voucherType, reprogram, downloadsObj=[], selectname, notalldata, hasDetails, updateuploadtargetkey, detailsfields, approvepath, uploadpath, approvekey, tabname, titlename, tablecheck, massLoad, dataLoadText, dataLoadButtonText, dataLoadSelectColumns, createRegInputRows, setDataArr, dataColumns, createDataObj, filtersObj, configpath, mainname, filekey, delkey, checkboxeskey}) {

    const [data, setData] = useState({columns: dataColumns, registros: []})
    const [createData, setCreateData] = useState(createDataObj)
    const [rawdata, setRawData] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const [editRow, setEditRow] = useState(-1)
    const [sendReq, setSendReq] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadingError, setLoadingError] = useState(false)
    const [filters, setFilters] = useState(filtersObj.reduce((accumulator, value) => {
        return {...accumulator, [value.key]: ''};
    }, {}))
    const [openDataLoad, setOpenDataLoad] = useState(false)
    const [openDetails, setOpenDetails] = useState(-1)
    const [openOptions, setOpenOptions] = useState(-1) 
    const [selectData, setSelectData] = useState([])
    const [checkedrows, setCheckedrows] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [openconfirmapprove, setOpenconfirmapprove] = useState(false)
    const [offset, setOffset] = useState(0)
    const [totalrows, setTotalrows] = useState(0)

    const pagesize = 20

    console.log(rawdata)

    const {userdata} = useContext(UserContext)

    useEffect(() => {
        if(sendReq === 0) {
            setLoading(true)
            const queryParams = new URLSearchParams(filters).toString();
            axiosInstance.get(pagination ? `${configpath}?${defaultfilter}&${queryParams}&offset=${offset}&size=${pagesize}` : `${configpath}?${defaultfilter}&${queryParams}`)
            .then((res) => {
                console.log(res.data)
                setLoading(false)
                setTotalrows(res.data.total_rows)
                if(notalldata && notalldata.length > 0) {
                    let resarr = []
                    res.data.forEach((row) => {
                        let flag = true
                        notalldata.forEach((item) => {
                            if(row[item.key] != item.value) {
                                flag = false
                            }
                        })
                        if(flag) {
                            resarr.push(row)
                        }
                    })
                    setRawData(resarr)
                    if(tablecheck) {
                        setCheckedrows(resarr.map((dataobj) => {
                            return false
                        }))
                    }
                }
                else {
                    setRawData(res.data)
                    if(tablecheck) {
                        setCheckedrows(res.data.map((dataobj) => {
                            return false
                        }))
                    }
                }
                toast.dismiss()
                toast.success("Datos actualizados")
            }) 
            .catch((error) => {
                setLoading(false)
                setLoadingError(true)
                console.log(error)
                if(error.response.status === 401) {
                    toast.dismiss()
                    toast.error("El token ha caducado, actualice la ventana para volver al inicio de sesión")
                }
                else {
                    toast.error(error.response.data.message)
                }
            })
        }
    }, [sendReq])

    useEffect(() => {
        const newarr = setDataArr(rawdata)
        setData((prev) => {
            return {...prev, registros: newarr}
        })
    }, [rawdata])

    useEffect(() => {
        setEditRow(-1)
    }, [data])

    useEffect(() => {
        if(!loading && sendReq === 0) {
            setSendReq(20)
        }
    }, [offset])

    useEffect(() => {
        setLoading(true)
        setOffset(0)
    }, [filters])

    const changeOpenCreate = () => {
        setOpenCreate((prev) => {
            return !prev
        })
    }

    const changeEditRow = (e, index) => {
        setEditRow(index)
    }

    const changeFilters = (e) => {
        setSendReq(1000)
        setFilters((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    useEffect(() => {
        const intervalChange = setInterval(() => {
            setSendReq((prev) => {
                if(prev >= 10) {
                    return prev - 10
                }
                else {
                    return prev;
                }
            })
        }, 10)
        return () => clearInterval(intervalChange);
    }, [])

    const handleSetDataSelectData = (data) => {
        setSelectData(data)
    }

    const handleSetCreateData = (e, item = {}) => {
        if(e.target.type === "file") {
            setCreateData((prev)  => {
                return {...prev, [e.target.name]: e.target.files[0]}
            })
        }
        else if(e.target.id === "checkboxes") {
            setCreateData((prev) => {
                let newcheckboxes = [...prev[checkboxeskey]]
                if(!e.target.checked) {
                    const index = newcheckboxes.indexOf(e.target.name);
                    newcheckboxes.splice(index, 1);
                }
                else {
                    newcheckboxes.push(e.target.name)
                }
                return {...prev, [checkboxeskey]: newcheckboxes}
            })
        }
        else if(e.target.type === "checkbox") {
            setCreateData((prev)  => {
                return {...prev, [e.target.name]: e.target.checked}
            })
        }
        else if(item.type === "add") {
            setCreateData((prev) => {
                const prevarr = prev[item.name]
                return {...prev, [item.name]: [...prevarr, item.value]}
            })
        }
        else if(item.type === "edit") {
            setCreateData((prev) => {
                let prevarr = prev[item.name]
                if(e.target.type === "number") {
                    prevarr[item.index] = {...prevarr[item.index], [e.target.name]: parseInt(e.target.value)}
                }
                else {
                    prevarr[item.index] = {...prevarr[item.index], [e.target.name]: e.target.value}
                }
                return {...prev, [item.name]: prevarr}
            })
        }
        else if(item.type === "delete") {
            setCreateData((prev) => {
                let prevarr = prev[item.name]
                prevarr.splice(item.index, 1)
                return {...prev, [item.name]: prevarr}
            })
        }
        else {
            setCreateData((prev) => {
                if(e.target.type === "number") {
                    return {...prev, [e.target.name]: parseInt(e.target.value)}
                }
                else {
                    return {...prev, [e.target.name]: e.target.value}
                }
            })
        }
    }
    
    const handleRemoveFile = () => {
        setCreateData((prev) => {
            return {...prev, [filekey]: ""}
        })
    }

    const addRegToData = (reg) => {
        setRawData((prev) => {
            return [reg, ...prev]
        })
    }

    const updateReg = (index, reg) => {
        setSubmitting(true)
        let flag = false
        if(JSON.stringify(reg) != JSON.stringify(rawdata[index])) {
            flag = true
        }
        if(flag) {
            const body = {...reg}
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            {Object.keys(body).forEach((key) => {
                if(regex.test(body[key])) {
                    body[key] = `${body[key]}T00:00:00.000Z`
                }
            })}
            const queryParams = rawdata[index][delkey];
            axiosInstance.put(`${configpath}/${queryParams}`, body)
            .then((res) => {
                setSubmitting(false)
                setRawData((prev) => {
                    let newarr = prev
                    newarr[index] = res.data.data
                    return [...newarr]
                })
                toast.dismiss()
                toast.success(`${mainname} actualizado/a correctamente`)
            })
            .catch((error) => {
                setSubmitting(false)
                console.log(error)
                setEditRow(-1)
                toast.dismiss()
                toast.error(error.response.message)
                toast.error(`Error al actualizar ${mainname.toLowerCase}`)
            })
        }
        else {
            setEditRow(-1)
        }
    }

    const clearCreateReg = () => {
        setCreateData(createDataObj)
    }

    const deleteReg = (index) => {
        setSubmitting(true)
        const queryParams = rawdata[index][delkey];
        axiosInstance.delete(`${configpath}/${queryParams}`)
        .then(() => {
            setSubmitting(false)
            setRawData((prev) => {
                let newarr = []
                for(let i = 0; i < prev.length; i++) {
                    if(i != index) {
                        newarr.push(prev[i])
                    }
                }
                return [...newarr]
            })
            toast.dismiss()
            toast.success(`${mainname} eliminado/a correctamente`)
        })
        .catch((error) => {
            setSubmitting(false)
            console.log(error)
            setEditRow(-1)
            toast.dismiss()
            toast.error(error.response.data.message)
        })
    }

    const handleCloseDataLoad = (e, call) => {
        if(call || e.target.id === "outside-cont") {
            setOpenDataLoad(false)
        }
    }

    const addLoadToRaw = (arr) => {
        setRawData((prev) => {
            return [...arr, ...prev]
        })

    }

    const clearSelectData = () => {
        setSelectData([])
    }

    const changeDetailsRow = (e, index) => {
        setOpenDetails(index)
    }

    const handleChangeCheckedrows = (index) => {
        setCheckedrows((prev) => {
            let newarr = [...prev]
            newarr[index] = !newarr[index]
            return [...newarr]
        })
    }

    const checkAllCheckedRows = () => {
        setCheckedrows((prev) => {
            return prev.map(() => {
                return true
            })
        })
    }

    const uncheckAllCheckedRows = () => {
        setCheckedrows((prev) => {
            return prev.map(() => {
                return false
            })
        })
    }

    const removeRegs = (targetlist, key) => {
        setRawData((prev) => {
            let resarr = [...prev]
            let idsarr = []
            resarr.forEach((data) => {
                idsarr.push(data[key])
            })
            for(let i = targetlist.length; i >= 0; i = i-1) {
                const index = idsarr.indexOf(targetlist[i])
                if(index != -1) {
                    resarr.splice(index, 1)
                }
            }
            return resarr
        })
    }

    const ApproveRows = (approvelist, path) => {
        const body = {sender: `${userdata.username}`, list: approvelist}
        axiosInstance.post(`${configpath}${path}`, body)
        .then((res) => {
            setSubmitting(false)
            setOpenconfirmapprove(false)
            toast.dismiss()
            toast.success(res.data.message)
            removeRegs(res.data.data, approvekey)
            uncheckAllCheckedRows()
        })
        .catch((error) => {
            setSubmitting(false)
            setOpenconfirmapprove(false)
            console.log(error)
            toast.error(error.response.data.message)
            uncheckAllCheckedRows()
        })
    }

    const ApproveAllChekedRows = () => {
        setSubmitting(true)
        let bodyarr = []
        checkedrows.forEach((bool, index) => {
            if(bool) {
                bodyarr.push(rawdata[index][approvekey])
            }
        })
        ApproveRows(bodyarr, approvepath)
    }

    const closeConfirm = (e) => {
        setOpenconfirmapprove(false)
    }

    const openApproveConfirm = () => {
        let flag = false
        checkedrows.forEach((bool) => {
            if(bool) {
                flag = true
            }
        })
        if(flag) {
            setOpenconfirmapprove(true)
        }
        else {
            toast.dismiss()
            toast.error("Debe seleccionar almenos un registro")
        }
    }

    const updateRawDates = (ts, te) => {
        setRawData((prev) => {
            let newarr = [...prev]
            newarr[openDetails].travelStartDate = ts
            newarr[openDetails].travelEndDate = te
            return newarr
        })
    }

    const changeOptionsRow = (e, index) => {
        setOpenOptions(index)
    }

    const downloadData = (path, filename, hasfilters) => {
        setSubmitting(true)
        const queryParams = new URLSearchParams(filters).toString();
        console.log(`${path}${hasfilters ? `?${queryParams}` : ""}`)
        axiosInstance.get(`${path}${hasfilters ? `?${queryParams}` : ""}`)
        .then((res) => {
            const blob = new Blob([res.data], {type: 'text/csv'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.csv`
            a.click();
            setSubmitting(false)
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.message)
            setSubmitting(false)
        })
    }
    
    const finishCloseout = (index) => {
        setRawData((prev) => {
            let newarr = [...prev]
            prev[index].settlementStatus = "Rendido"
            return newarr
        })
    }

    const handleRejectVoucher = (rejectedamount) => {
        setRawData((prev) => {
            let newarr = [...prev]
            newarr[openDetails].reportedBalance -= rejectedamount
            return newarr
        })
    }

    const updateSettlementAmount = (index, amount) => {
        setRawData((prev) => {
            let newarr = [...prev]
            prev[index].reportedBalance += amount
            return newarr
        })
    }

    const handleOpenCloseout = () => {
        setSubmitting(true)
        axiosInstance.put(`/settlements/enable/${rawdata[openDetails].id}`)
        .then((res) => {
            setSubmitting(false)
            removeRegs([rawdata[openDetails][approvekey]], approvekey)
            toast.success(res.data.message)
            setOpenDetails(-1)
        })
        .catch((error) => {
            setSubmitting(false)
            setOpenDetails(-1)
            console.log(error)
            toast.error(error.response.data.message)
        })
    }

    const pageRight = () => {
        if(offset + pagesize < totalrows) {
            setOffset((prev) => {
                return prev + pagesize
            })
        } 
    }

    const pageLeft = () => {
        if(offset - pagesize >= 0) {
            setOffset((prev) => {
                return prev - pagesize
            })
        }
    }

    const setNewOffset = (page) => {
        setSendReq(20)
        setOffset(page)
    }

    const filtersElems = filtersObj.map((filter) => {
        return (
            <div key={filter.name} className="display-flex-row-div">
                {filter.type === "select" ? 
                <>
                <label className="input-name-box" htmlFor={filter.name}>{filter.name}</label>
                <select className="filter-input" required={true} value={[filters].filter.key} name={filter.key} id={filter.name} onChange={changeFilters}>
                    {filter.options.map((option) => {
                        return <option key={option.name} value={option.value}>{option.name}</option>
                    })}
                </select>
                </>
                :
                <>
                    <label htmlFor={filter.key} className="input-name-box">{filter.name}</label>
                    <input name={filter.key} id={filter.key} value={[filters].filter.key} placeholder={filter.ph} onChange={changeFilters} className="filter-input" type={filter.type} />
                </>}
            </div>
        )
    })

    const downloadElems = downloadsObj.map((download) => {
        return  <button key={download.path} className="create-reg-button" disabled={submitting} onClick={() => {downloadData(download.path, download.filename, download.hasfilters)}}>Descargar {download.buttonname}</button>
    })
    const paginationElems = () => {
        let list = [];
        const totalPages = Math.ceil(totalrows / pagesize);
        const currentPage = offset / pagesize;
        
        const pagesToShow = 30;
        const pagesAroundCurrent = Math.floor(pagesToShow / 2);
    
        let startPage = Math.max(0, currentPage - pagesAroundCurrent);
        let endPage = Math.min(totalPages - 1, currentPage + pagesAroundCurrent);
        
        if (currentPage < pagesAroundCurrent) {
            endPage = Math.min(totalPages - 1, pagesToShow - 1);
        }
        
        if (currentPage > totalPages - pagesAroundCurrent - 1) {
            startPage = Math.max(0, totalPages - pagesToShow);
        }
        
        if (totalrows > pagesize) {
            list.push(<button className="pagination-button" key={"first"} disabled={currentPage === 0 || loading} onClick={() => setNewOffset(0)}><ChevronDoubleLeft/></button>);
            list.push(<button className="pagination-button" key={"back"} disabled={offset === 0 || loading} onClick={pageLeft}><ChevronLeft/></button>);
        }
    
        for (let i = startPage; i <= endPage; i++) {
            const pageIndex = i * pagesize;
            list.push(<button className={`pagination-button${offset === pageIndex ? "-active" : ""}`} key={pageIndex} disabled={loading} onClick={() => setNewOffset(pageIndex)}>{i + 1}</button>);
        }
        
        if (totalrows > pagesize) {
            list.push(<button className="pagination-button" key={"forth"} disabled={offset + pagesize > totalrows || loading} onClick={pageRight}><ChevronRight/></button>);
            list.push(<button className="pagination-button" key={"last"} disabled={currentPage === totalPages - 1 || loading} onClick={() => setNewOffset((totalPages - 1) * pagesize)}><ChevronDoubleRight/></button>);
        }
        
        return list;
    }
    
    return (
        <div style={{paddingBottom: (pagination && pagesize < totalrows) ? "7.5px" : "25px"}} className="main-tab-cont">
            <TabHeader title={`${tabname} / ${titlename}`}/>
            {openconfirmapprove && <ConfirmationPopup cancelfunc={closeConfirm} acceptfunc={ApproveAllChekedRows} submitting={submitting} text={`¿Estás seguro de que quieres ${selectname.toLowerCase()} las ${tabname.toLowerCase()} seleccionadas?`}/>}
            {(massLoad && openDataLoad) && <DataLoadPopup uploadpath={uploadpath} confirmfunction={removeRegs} removeRegsKey = {updateuploadtargetkey} handleSetDataSelectData={handleSetDataSelectData} setSendReq={setSendReq} closefunction={handleCloseDataLoad} confirmpath={configpath} text={dataLoadText}/>}
            {selectData.length > 0 && <DataLoadSelect configpath={configpath} addLoadToRaw={addLoadToRaw} clearSelectData={clearSelectData} columns={dataLoadSelectColumns} selectData={selectData}/>}
            {editRow >= 0 && editRegInputRows && <EditReg checkboxeskey={checkboxeskey} title={mainname} applyChanges={updateReg} deleteReg={deleteReg} inputRows={editRegInputRows} data={rawdata} index={editRow} submitting={submitting}/* editReg={(editReg)} */ changeEditRow={changeEditRow}/>}
            {openCreate && <CreateReg filekey={filekey} clearCreateReg={clearCreateReg} inputRows={createRegInputRows} createData={createData} submitEndpoint={`${configpath}`} addRegToData={addRegToData} changeOpenCreate={changeOpenCreate} handleSetCreateData={handleSetCreateData} handleRemoveFile={handleRemoveFile} title={mainname}/>}
            <div className="filters-cont">
                {downloadElems}
                {createRegInputRows && <button className="create-reg-button" onClick={changeOpenCreate}>Crear {mainname.toLowerCase()}</button>}
                {massLoad && <button className="create-reg-button" onClick={() => {setOpenDataLoad(true)}}>{dataLoadButtonText ? dataLoadButtonText : "Carga masiva"}</button>}
                {filtersElems}
                {tablecheck && <button className="create-reg-button" onClick={checkAllCheckedRows}>Seleccionar todos</button>}
                {tablecheck && <button className="create-reg-button" onClick={uncheckAllCheckedRows}>Quitar selección</button>}
                {tablecheck && <button className="create-reg-button" onClick={openApproveConfirm}>{selectname} selección</button>}
            </div>
            <Table data={data.registros} pagesize={pagesize} offset={offset} setNewOffset={setNewOffset} totalrows={totalrows} pageLeft={pageLeft} pageRight={pageRight} checkedrows={checkedrows} handleChangeCheckedrows={handleChangeCheckedrows} tablecheck={tablecheck} columns={data.columns} onClickFunc={editRegInputRows ? changeEditRow : hasDetails ? changeDetailsRow : viajes ? changeOptionsRow : "" } loading={loading} error={loadingError}/>
            {(pagination && pagesize < totalrows) && <div className="pagination-cont">
                {paginationElems()}
            </div>    
            }
        </div>
    )
}

export default ConfigurationsBase