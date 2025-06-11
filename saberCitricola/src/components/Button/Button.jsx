import React, { forwardRef } from 'react';
import './Button.css';

const Button = forwardRef(({ id, className = '', text, icon, onClick, isHidden, title }, ref) => {
  //if(isHidden) if(isHidden()) return <></>
  
  return (
    <button ref={ref} id={id} type='button' className={`button ${className}`} onClick={onClick} hidden={isHidden ? isHidden() : ''} title={title}>
      {icon ? <span className="button-icon">{icon}</span> : null}
      {text}
    </button>
  )
})

export default Button
