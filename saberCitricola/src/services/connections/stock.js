import {url, headers} from "./consts.js"
import {useApiRequest} from "./apiRequest.js"

// GET - Obtiene todo el stock
export const useObtenerStock = () => {
  const apiRequest = useApiRequest()
  return async () => await apiRequest(`${url}/stock`, {method: "GET", headers})
}

// GET - Obtiene todo el stock
export const useObtenerStockDeLicitacion = () => {
    const apiRequest = useApiRequest()
    return async (idLicitacion) => await apiRequest(`${url}/stock/${idLicitacion}`, {method: "GET", headers})
  }
