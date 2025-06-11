import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import "./DynamicForm.css"

const FormItem = ({
  nombreCampo,
  labelText,
  placeholder = "",
  type = "text",
  value,
  setValue,
  options = [],
}) => {
  const handleChange = (e) => {
    if (type !== "select") {
      setValue((prevState) => ({ ...prevState, [nombreCampo]: e.target.value }))
    } else {
      const selectedValue = e.target.value // Obtiene el valor seleccionado
      const selectedLabel = e.target.options[e.target.selectedIndex].text // Obtiene el texto de la opción seleccionada

      setValue((prevState) => ({
        ...prevState,
        [nombreCampo]: selectedValue, // Guarda el valor
        optionLabel: selectedLabel,
      }))
    }
  }
  /* if (type === "select") {
        //console.log("OPTIONS: ", options)
        console.log("VALUE: -"+ value+"-")
    } */
  return (
    <div className="form-item">
      <label htmlFor={"inp-" + nombreCampo} className="lbl-form">
        {labelText + ":"}
      </label>
      {type === "select" ? (
        <select
          id={"inp-" + nombreCampo}
          className="inp-txt inp-select"
          value={value}
          onChange={handleChange}
        >
          {/* <option value="" key={"firstItem"} disabled>Seleccione una opción</option> */}
          {options.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={"inp-" + nombreCampo}
          placeholder={placeholder}
          className="inp-txt form-input"
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  )
}

const DynamicForm = forwardRef(
  ({ fields, inModal, startWhitValues = true }, ref) => {
    /* const initialValues = fields.reduce((acc, field) => {
        acc[field.nombreCampo] = field.defaultValue || "";
        return acc;
    }, {}); */

    const [formValues, setFormValues] = useState(() => {
      return fields.reduce((acc, field) => {
        acc[field.nombreCampo] = field.defaultValue || "" // Asegurar que todos los valores iniciales sean strings vacíos
        return acc
      }, {})
    })

    // Inicializa el estado con valores por defecto
    useEffect(() => {
      if (startWhitValues) {
        const newValues = fields.reduce((acc, field) => {
          acc[field.nombreCampo] =
            field.defaultValue !== undefined ? field.defaultValue : ""
          return acc
        }, {})

        setFormValues((prevValues) => ({ ...prevValues, ...newValues }))
      }
    }, [fields]) // Se ejecuta cuando `fields` cambia

    useImperativeHandle(ref, () => ({
      getFormData: () => formValues,
      setFieldValue: (nombreCampo, valor) => {
        setFormValues((prevValues) => ({
          ...prevValues,
          [nombreCampo]: valor,
        }))
      },
    }))

    return (
      <form className={inModal ? "dynamicForm-modal" : "dynamicForm"}>
        {fields.map((field) => (
          <FormItem
            key={field.nombreCampo}
            nombreCampo={field.nombreCampo}
            labelText={field.labelText}
            placeholder={field.placeholder}
            type={field.type}
            value={formValues[field.nombreCampo]}
            setValue={setFormValues}
            options={field.options || []} // Si es un select, recibe las opciones
          />
        ))}
      </form>
    )
  }
)

export default DynamicForm
