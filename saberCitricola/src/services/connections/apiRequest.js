import {useAlert} from "../AlertContext.jsx"

export const useApiRequest = () => {
  const {setIsAlertOpen, setAlertMessage} = useAlert()

  return async (url, options) => {
    try {
      const response = await fetch(url, {...options, credentials: "include"})

      if (!response.ok) {
        const errorData = await response.json()
        setAlertMessage(errorData.mensaje || "Error desconocido en el servidor")
        setIsAlertOpen(true)
        return null
      }

      return await response.json()
    } catch (error) {
      setAlertMessage("Error al conectar con el servidor.")
      setIsAlertOpen(true)
      return null
    }
  }
}
