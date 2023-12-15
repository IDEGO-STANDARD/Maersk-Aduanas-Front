import "./RowsTable.css"

const RowsTable = ({ data, onClickFunc, ComponentBeforeKeys, loading, columnExceptions, onOpenPopup }) => {

    const renderedRows = data.map((item, index) => {
        const keyItems = []
        const objkeys = Object.keys(item.keys)
        {
            objkeys.forEach((key) => {
                if (!columnExceptions.includes(key)) {
                    keyItems.push(<div key={`${index}${key}`} style={{ width: `${100 / objkeys.length}%` }} className="rt-rendered-item-key-cont">
                        <span className="rt-rendered-item-key-text">{key}</span>
                        <div className="rt-rendered-item-value-text">{item.keys[key]}</div>
                    </div>)
                }
            })
        }
        console.log(keyItems)
        return <div key={index} style={{ cursor: onClickFunc ? "pointer" : "", borderTop: index != 0 ? "1px solid gray" : "", borderBottom: index === data.length - 1 ? "1px solid gray" : "" }} className="rt-rendered-item-cont">
            <ComponentBeforeKeys item={item} onOpenPopup={onOpenPopup} onClickFunc={onClickFunc} />
            <div className="rt-fields-cont">
                {keyItems}
            </div>
        </div>
    })

    return (
        <div className="rt-item-list-cont">
            {renderedRows.length < 1 ?
                <div className="rt-message-cont">
                    <span className="rt-message-span">{loading ? "Cargando registros..." : "No hay registros"}</span>
                </div>
                : renderedRows}
        </div >
    )

}


export default RowsTable