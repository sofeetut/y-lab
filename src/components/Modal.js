import React from 'react'
import './Modal.css'

function Modal({ isVisible, data, onClose }) {
  return !isVisible ? null : (
    <div className='modal-wrapp' onClick={onClose}>
      <div
        className={data.error ? 'modal modal-error' : 'modal'}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Result window</h3>
        <span className='modal-close' onClick={onClose}>
          &times;
        </span>
        <p>{data.error?.message || data.message}</p>
      </div>
    </div>
  )
}

export default Modal
