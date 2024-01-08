import React, { useState } from 'react';
import './OrdenSintad.css';


const OrdenSintad = ({ children, tooltipText }) => {
    const [tooltip, setTooltip] = useState({ display: 'none', top: '0px', left: '0px' });

    
    return (
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {children}
            <div className="tooltip" style={tooltip}>
                {tooltipText}
            </div>
        </div>
    );
};

export default TooltipElement;
