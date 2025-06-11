import {url, headers} from "./consts.js"
import {useApiRequest} from "./apiRequest.js"

// SELECT - Obtiene todos los renglones de Kairos que coincidan con las licitaciones activas
export const useObtenerEquivalenciaKairos = () => {
  const apiRequest = useApiRequest()
  return async () =>
    await apiRequest(`${url}/compras/lista-kairos`, {method: "GET", headers})
}

// SELECT - Obtiene todos los renglones de Kairos que coincidan con las licitaciones activas
export const useObtenerEquivalenciaKairosConFiltros = () => {
  const apiRequest = useApiRequest()
  return async (filtros) =>
    await apiRequest(`${url}/compras/lista-kairos`, {
      method: "POST",
      headers,
      body: JSON.stringify({filtros}),
    })
}

// POST - Crea compras para una licitación
export const useCrearComprasLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion, idUsuario, compras) =>
    await apiRequest(`${url}/compras/licitacion/${idLicitacion}`, {
      method: "POST",
      headers,
      body: JSON.stringify({idUsuario, compras}),
    })
}

// POST - Crea una nueva compra
export const useCrearNuevaCompra = () => {
  const apiRequest = useApiRequest()
  return async (compra) =>
    await apiRequest(`${url}/compras`, {
      method: "POST",
      headers,
      body: JSON.stringify(compra),
    })
}

// SELECT - Obtiene todos los datos, con los filtros aplicados
/* export const useObtenerComprasConFiltros = () => {
  const apiRequest = useApiRequest()
  return async (filtros) =>
    await apiRequest(`${url}/compras/lista-kairos`, {
      method: "POST",
      headers,
      body: JSON.stringify({filtros}),
    })
} */
