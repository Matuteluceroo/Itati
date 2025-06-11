import { url, headers } from "./consts.js"
import { useApiRequest } from "./apiRequest.js"

export const useObtenerKairos = () => {
  const apiRequest = useApiRequest()
  return async () =>
    await apiRequest(`${url}/kairos`, { method: "GET", headers })
}

export const useAgregarProductoKairos = () => {
  const apiRequest = useApiRequest()
  return async (formDataProducto) =>
    await apiRequest(`${url}/kairos`, {
      method: "POST",
      headers,
      body: JSON.stringify(formDataProducto),
    })
}

export const useModificarProductoKairos = () => {
  const apiRequest = useApiRequest()
  return async (idKairos, formDataProducto) =>
    await apiRequest(`${url}/kairos/${idKairos}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(formDataProducto),
    })
}

export const useEliminarProductoKairos = () => {
  const apiRequest = useApiRequest()
  return async (idKairos) =>
    await apiRequest(`${url}/kairos/${idKairos}`, {
      method: "DELETE",
      headers,
    })
}

export const useObtenerProductoPorId = () => {
  const apiRequest = useApiRequest()
  return async (idKairos) =>
    await apiRequest(`${url}/kairos/${idKairos}`, { method: "GET", headers })
}

export const useObtenerProductoPorCodTarot = () => {
  const apiRequest = useApiRequest()
  return async (codTarot) =>
    await apiRequest(`${url}/kairos/tarot/${codTarot}`, {
      method: "GET",
      headers,
    })
}

export const useObtenerProductoPorCodAnmat = () => {
  const apiRequest = useApiRequest()
  return async (codAnmat) =>
    await apiRequest(`${url}/kairos/anmat/${codAnmat}`, {
      method: "GET",
      headers,
    })
}

export const useObtenerProductoPorCodKairos = () => {
  const apiRequest = useApiRequest()
  return async (codKairos) =>
    await apiRequest(`${url}/kairos/cod_kairos/${codKairos}`, {
      method: "GET",
      headers,
    })
}

export const useObtenerProductoPorLaboratorio = () => {
  const apiRequest = useApiRequest()
  return async (laboratorio) =>
    await apiRequest(`${url}/kairos/laboratorio/${laboratorio}`, {
      method: "GET",
      headers,
    })
}
export const useObtenerProductoPorCodTango = () => {
  const apiRequest = useApiRequest()
  return async (codTango) =>
    await apiRequest(`${url}/kairos/tango/${codTango}`, {
      method: "GET",
      headers,
    })
}