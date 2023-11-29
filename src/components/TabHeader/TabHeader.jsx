import "./TabHeader.css"

function TabHeader({title}) {


    return (
        <div className="tab-header-main-cont">
            <span className="tab-header-title">{title}</span>
        </div>
    )
}

export default TabHeader