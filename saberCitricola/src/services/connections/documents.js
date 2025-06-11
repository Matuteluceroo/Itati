import {url, headers} from "./consts.js"
import {useApiRequest} from "./apiRequest.js"

export const useGenerarPDF = async (data, nombrePDF) => {
  try {
    const response = await fetch(`${url}/generar-documento/pdf`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Error al generar el PDF")
    }

    if (response) {
      // Procesar el PDF como Blob
      const blob = await response.blob()
      const urlPDF = window.URL.createObjectURL(blob)
      window.open(urlPDF)

      const a = document.createElement("a")
      a.href = urlPDF
      a.download = `${nombrePDF}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  } catch (error) {
    console.error("Error generando el PDF:", error)
    alert("Hubo un problema generando el PDF. Intenta de nuevo.")
  }
  /* const apiRequest = useApiRequest()
  return async (data, nombrePDF) => {
    const response = await apiRequest(`${url}/generar-documento/pdf`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })

    if (response) {
      // Procesar el PDF como Blob
      const blob = await response.blob()
      const urlPDF = window.URL.createObjectURL(blob)
      window.open(urlPDF)

      const a = document.createElement("a")
      a.href = urlPDF
      a.download = `${nombrePDF}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  } */
}

export const useGenerarExcel = async (data, nombreExcel) => {
  try {
    const response = await fetch(`${url}/generar-documento/excel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Error al generar el Excel")
    }

    // Verificar si la respuesta es exitosa
    const blob = await response.blob()
    const urlExcel = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = urlExcel
    a.download = `${nombreExcel}.xlsx`
    document.body.appendChild(a)
    a.click()
    a.remove()
  } catch (error) {
    console.error("Error generando el Excel:", error)
    alert("Hubo un problema generando el Excel. Intenta de nuevo.")
  }
}
