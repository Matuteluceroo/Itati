import React from "react"
import "./Alert.css"

const AlertOptions = ({
  isOpen,
  title = "¿Estás seguro?",
  message = "¿Querés continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <div className="alert-overlay">
      <div className="alert-modal">
        <div className="alert-icon">
          <span className="alert-x">?</span>
        </div>
        <h2 className="alert-title">{title}</h2>
        <p className="alert-message">{message}</p>
        <div className="alert-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertOptions
