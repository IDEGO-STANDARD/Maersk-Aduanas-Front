import "./RowsTable.css"

const RowsTable = ({ data, onClickFunc, ComponentBeforeKeys }) => {


    const renderedRows = data.map((item, index) => {
        const keyItems = []
        {Object.keys(item.keys).forEach((key) => {
            keyItems.push(<div key={`${index}${key}`} className="rt-rendered-item-key-cont">
                <span className="rt-rendered-item-key-text">{key}</span>
                <span className="rt-rendered-item-value-text">{item.keys[key]}</span>
            </div>)
        })}

        return <div key={index} style={{cursor: onClickFunc ? "pointer" : "", borderTop: index != 0 ? "1px solid gray" : ""}} className="rt-rendered-item-cont">
            <ComponentBeforeKeys item={item} />
            <div className="rt-fields-cont" onClick={() => onClickFunc(index)}>
                {keyItems}
            </div>
        </div>
    })

    return (
        <div className="rt-item-list-cont">
            {renderedRows}
        </div >
    )

}


export default RowsTable