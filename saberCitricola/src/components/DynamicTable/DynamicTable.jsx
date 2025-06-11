import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react"
import "./DynamicTable.css"
import Button from "../Button/Button"
import Modal from "../Modal/Modal"
import Deleteable from "../../components/DeleteableElement/Deleteable"

const DynamicTable = forwardRef(
  (
    {
      columns,
      rows,
      onClickRow,
      height,
      onCellChange,
      filters,
      setFilters,
      isCellPhone = false,
      defaultSort = null,
    },
    ref
  ) => {
    const [data, setData] = useState(rows)
    const [sortConfig, setSortConfig] = useState({
      key: null,
      direction: "asc",
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [colModal, setColModal] = useState(null)
    const [posModal, setPosModal] = useState(50)
    const [newFilter, setNewFilter] = useState("")
    const [colsWithFilters, setColsWithFilters] = useState([])
    //const [columnsState, setColumnsState] = useState(columns)

    if (!onClickRow) onClickRow = () => {}

    const handleInputChange = (rowIndex, colId, value) => {
      const updatedData = data.map((row, index) => {
        if (index === rowIndex) {
          return {...row, [colId]: value}
        }
        return row
      })
      setData(updatedData)
      if (onCellChange) {
        onCellChange(rowIndex, colId, value)
      }
    }

    useImperativeHandle(ref, () => ({
      getData: () => data, // Método para obtener los datos actuales
    }))

    useEffect(() => {
      setData(rows) // Sincroniza las filas externas con el estado interno
    }, [rows])

    useEffect(() => {
      const filteredData = applyFilters(filters)
      const sortedData = sortData(filteredData, sortConfig)
      setData(sortedData)
    }, [rows, filters, sortConfig])

    useEffect(() => {
      if (defaultSort) {
        setSortConfig(defaultSort)
      }
    }, [defaultSort]) // Se ejecuta cuando cambia defaultSort
    // Función para ordenar los datos

    // Función para aplicar filtros
    const applyFilters = (filters) => {
      if (!filters || !Array.isArray(rows)) return rows || []

      return rows.filter((item) => {
        return Object.entries(filters).every(([key, values]) => {
          if (!values || values.length === 0) {
            return true // Si no hay filtros para esta columna, incluir la fila
          }
          const itemValue = (item[key] || "").toString().toLowerCase()
          return values.some((value) => {
            const normalizedValue = value.toString().toLowerCase()
            return itemValue.includes(normalizedValue) // Filtro inclusivo
          })
        })
      })
    }

    const extraerNumerosRenglon = (renglon) => {
      const partes = renglon.split(" ")
      const principal = parseInt(partes[0]) // Número principal (1, 2, 3, etc.)
      const alternativo = partes.includes("ALT") ? parseInt(partes[2] || 1) : 0 // Número alternativo (1, 2, etc.)
      return {principal, alternativo}
    }

    // Función para ordenar datos
    const sortData = (data2, sortConfig) => {
      if (!Array.isArray(data2)) {
        console.error("data2 no es un array:", data2)
        return []
      }

      if (!sortConfig.key) return data2

      const column = columns.find((col) => col.id === sortConfig.key)
      if (!column) return data2

      return [...data2].sort((a, b) => {
        const aValue = a[sortConfig.key] || ""
        const bValue = b[sortConfig.key] || ""

        // Extraer números principales y alternativos
        const {principal: aPrincipal, alternativo: aAlternativo} =
          extraerNumerosRenglon(aValue)
        const {principal: bPrincipal, alternativo: bAlternativo} =
          extraerNumerosRenglon(bValue)

        // Determinar el orden basado en la dirección (asc o desc)
        const direction = sortConfig.direction === "asc" ? 1 : -1

        // Ordenar primero por el número principal
        if (aPrincipal < bPrincipal) return -1 * direction
        if (aPrincipal > bPrincipal) return 1 * direction

        // Si los números principales son iguales, ordenar por el número alternativo
        if (aAlternativo < bAlternativo) return -1 * direction
        if (aAlternativo > bAlternativo) return 1 * direction

        return 0
      })
    }

    const handleSort = (key, direction) => {
      setSortConfig({key, direction})
    }

    const handleCloseModal = () => {
      setNewFilter("") // Limpia el campo de entrada después de agregar
      setIsModalOpen(false)
    }

    const toggleDropdown = (col, rect) => {
      setPosModal(rect)
      setColModal(col)
      setNewFilter("") // Limpia el campo de entrada después de agregar
      setIsModalOpen(true)
    }

    const removeEmptyArrays = (filters) =>
      Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) => !(Array.isArray(value) && value.length === 0)
        )
      )

    const handleDeleteElement = (index, category) => {
      setFilters((prevFilters) =>
        removeEmptyArrays({
          ...prevFilters,
          [category]: prevFilters[category].filter((_, i) => i !== index),
        })
      )
    }

    const handleAddFilter = () => {
      if (colModal && newFilter.trim() !== "") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [colModal.id]: prevFilters[colModal.id]
            ? [...prevFilters[colModal.id], newFilter]
            : [newFilter], // Si no existe la lista, la crea
        }))
        setNewFilter("") // Limpia el campo de entrada después de agregar
      }
    }

    useEffect(() => {
      const updatedData = applyFilters(filters)
      setData(updatedData)

      if (filters) {
        const colsFilters = Object.keys(filters).filter(
          (key) => filters[key].length > 0
        )
        setColsWithFilters(colsFilters)
      }
    }, [filters])

    const inputRef = useRef(null)

    useEffect(() => {
      if (isModalOpen) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }, 100)
      }
    }, [isModalOpen])

    return (
      <div style={{height}}>
        <div className="scroll-container">
          <table className="dinamicTable">
            <HeaderTable
              columns={columns}
              toggleDropdown={toggleDropdown}
              colsWithFilters={colsWithFilters}
              //setColumnsState={setColumnsState}
            />
            <BodyTable
              data={data}
              columns={columns}
              handleInputChange={handleInputChange}
              onClickRow={onClickRow}
            />
          </table>
        </div>
        <Modal
          isCellPhone={isCellPhone}
          selectedId={colModal}
          position={posModal}
          type={"ofTable"}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={colModal ? colModal.name : ""}
        >
          <ul>
            <li onClick={() => handleSort(colModal.id, "asc")}>
              ↑ Ordenar Ascendente
            </li>
            <li onClick={() => handleSort(colModal.id, "desc")}>
              ↓ Ordenar Descendente
            </li>
            <p>FILTROS:</p>
            <div className="modal-filter-input-container">
              <input
                ref={inputRef}
                type="text"
                placeholder="Agregar filtro"
                value={newFilter}
                onChange={(e) => setNewFilter(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddFilter()
                  }
                }}
                className="modal-filter-input"
              />
              <button
                className="modal-filter-button"
                onClick={handleAddFilter}
                title="Agregar filtro"
              >
                +
              </button>
            </div>
            <div id="filterContent" className="filterContent">
              <div className="scroll-container">
                {colModal === null ? (
                  <>NO HAY FILTROS PARA LA COLUMNA</>
                ) : (
                  filters[colModal.id] &&
                  filters[colModal.id].map((value, index) => (
                    <Deleteable
                      key={index}
                      txtValue={value}
                      onClick={() => handleDeleteElement(index, colModal.id)}
                    />
                  ))
                )}
              </div>
            </div>
          </ul>
        </Modal>
      </div>
    )
  }
)

export default DynamicTable

const HeaderTable = ({
  columns,
  toggleDropdown,
  colsWithFilters,
  /* setColumnsState, */
}) => {
  /*  const [columnWidths, setColumnWidths] = useState(
    columns.reduce((acc, col) => ({...acc, [col.id]: col.width || "150px"}), {})
  ) */
  /* useEffect(() => {
    console.log(columnWidths)
    setColumnsState((prevCols) =>
      prevCols.map((col) => ({
        ...col,
        width: columnWidths[col.id],
      }))
    )
  }, [columnWidths]) */

  /* const handleMouseDown = (event, colId) => {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = parseInt(columnWidths[colId], 10)

    const handleMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX)
      if (newWidth > 50) {
        // Evita anchos muy pequeños
        setColumnWidths((prev) => ({...prev, [colId]: `${newWidth}px`}))
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  } */

  return (
    <thead>
      <tr className="rowHeaderTable">
        {columns.map((col) => {
          if (col.visible === false) return null
          const buttonRef = useRef(null) // Referencia al botón

          const handleButtonClick = () => {
            if (buttonRef.current) {
              const rect = buttonRef.current.getBoundingClientRect()
              // Pasa la posición junto con la columna
              toggleDropdown(col, rect)
            }
          }

          return (
            <th key={col.id} style={{width: col.width}} className="tblHead">
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              > */}
              <p>{col.name}</p>
              {col.options && (
                <Button
                  ref={buttonRef}
                  className={
                    colsWithFilters.includes(col.id)
                      ? "btnTableHeader btnFiltered"
                      : "btnTableHeader"
                  }
                  onClick={handleButtonClick}
                />
              )}
              {/* </div> */}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

const BodyTable = ({data, columns, handleInputChange, onClickRow}) => {
  if (data === undefined) return <tbody></tbody>

  const [styles, setStyles] = useState([])

  useEffect(() => {
    // Función para obtener los estilos de todas las filas y columnas
    const obtenerEstilos = async () => {
      const nuevosEstilos = await Promise.all(
        data.map(async (row) => {
          const rowStyles = await Promise.all(
            columns.map(async (col) => {
              if (col.cellStyle) {
                const estilo = await col.cellStyle(row)
                return estilo
              }
              return null
            })
          )
          return rowStyles
        })
      )
      setStyles(nuevosEstilos)
    }

    obtenerEstilos()
  }, [data, columns]) // Dependencias: ejecutará cada vez que cambien `data` o `columns`

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex} className="tableRow" onClick={() => onClickRow(row)}>
          {columns.map((col, colIndex) => {
            if (col.visible === false) return null

            const cellStyle = styles[rowIndex]
              ? styles[rowIndex][colIndex]
              : null

            return (
              <td
                key={`${rowIndex}-${col.id}`}
                className={
                  cellStyle
                    ? ""
                    : col.editable === false || row.cellsEditable === false
                    ? "noEditableCell"
                    : "editableCell"
                }
                style={cellStyle}
              >
                {col.id.startsWith("btn") ? (
                  <Button
                    className={`${col.id} btnImg`}
                    icon={<img src={col.ico} alt={col.name} />}
                    ariaLabel={col.name}
                    onClick={() => col.onclick(row)}
                  />
                ) : col.editable && row.cellsEditable !== false ? (
                  <CellTable
                    row={row}
                    col={col}
                    rowIndex={rowIndex}
                    onCellChange={handleInputChange}
                  />
                ) : col.value ? (
                  <CalculatedCell row={row} col={col} />
                ) : (
                  <>{row[col.id] || ""}</>
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

const CalculatedCell = ({row, col}) => {
  const [cellContent, setCellContent] = useState(row[col.id] || "")

  // Manejar la lógica de value
  useEffect(() => {
    const fetchValue = async () => {
      if (typeof col.value === "function") {
        const newValue = await col.value(row)
        setCellContent(newValue)
      } else {
        setCellContent(row[col.id] || "")
      }
    }
    fetchValue()
  }, [row, col])

  return <>{cellContent}</>
}

const CellTable = ({row, col, rowIndex, onCellChange}) => {
  const [cellContent, setCellContent] = useState(row[col.id] || "")
  /* const [cellStyle, setCellStyle] = useState('') */
  const textAreaRef = useRef(null)

  // Manejar la lógica de value
  useEffect(() => {
    const fetchValue = async () => {
      if (typeof col.value === "function") {
        const newValue = await col.value(row)
        setCellContent(newValue)
      } else {
        setCellContent(row[col.id] || "")
      }
    }
    fetchValue()
    const changeValue = async () => {
      if (typeof col.onChange === "function") {
        col.onChange(row)
      }
    }
    changeValue()
  }, [row, col])
  const handleInputChange = (e) => {
    const value = e.target.value

    // Validación: Si la columna es numérica, solo permitir números
    if (col.type === "number") {
      if (!/^\d*\.?\d*$/.test(value)) return // Permite solo números y un punto decimal
    }

    setCellContent(value)
    adjustTextareaHeight(e.target)

    if (onCellChange) {
      onCellChange(rowIndex, col.id, value)
    }
  }

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    if (textAreaRef.current) {
      adjustTextareaHeight(textAreaRef.current)
    }
  }, [cellContent]) // Ajusta el tamaño cada vez que `cellText` cambia

  return (
    <textarea
      ref={textAreaRef}
      value={cellContent}
      className="inpCell"
      onChange={handleInputChange}
    />
  )
}
