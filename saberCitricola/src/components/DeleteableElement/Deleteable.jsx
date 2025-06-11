import React from "react"
import "../DeleteableElement/Deleteable.css"
import Button from "../Button/Button"

const Deleteable = ({ txtValue, onClick }) => {
  return (
    <div className="elementoFiltro">
      <b className="txtFiltro">{txtValue}</b>
      <Button
        text={"X"}
        className="btnMini"
        onClick={onClick}
        title="Eliminar filtro"
      />
    </div>
  )
}

export default Deleteable
