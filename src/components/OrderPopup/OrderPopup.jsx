import React, { useEffect, useRef } from 'react'
import { X } from 'react-bootstrap-icons'
import './OrderPopup.css'

const OrderPopup = ({isOpen, onClose, info, PopupComponent, contentClass}) => {

  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref])

  if (!isOpen) {
    return null
  }

  return (
    <div className="popup">
      <div ref={ref} className={`popup-content ${contentClass||''}`}>
        <button className="close-button" onClick={onClose}><X /></button>
        <PopupComponent info={info}/>
      </div>
    </div>
  );
};

export default OrderPopup
