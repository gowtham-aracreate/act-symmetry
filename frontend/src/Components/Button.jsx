import React from 'react'

const Button = ({ id, type, className, onClick, children }) => {
  return (
    <button id={id} type={type} className={`cursor-pointer bg-blue-600 ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button