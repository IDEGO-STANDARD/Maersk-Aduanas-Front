import React, { useState } from 'react';
import './TooltipElement.css';


const TooltipElement = ({ children, tooltipText }) => {
    const [tooltip, setTooltip] = useState({ display: 'none', top: '0px', left: '0px' });

    const handleMouseMove = (e) => {
        setTooltip({ display: 'block', top: `${e.clientY}px`, left: `${e.clientX}px` });
    };

    const handleMouseLeave = () => {
        setTooltip({ display: 'none', top: '0px', left: '0px' });
    };

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
