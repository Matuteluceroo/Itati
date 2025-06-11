import {url, headers} from "./consts.js"
import {useApiRequest} from "./apiRequest.js"

export const useObtenerLicitaciones = () => {
  const apiRequest = useApiRequest()
  return async () =>
    await apiRequest(`${url}/licitaciones`, {method: "GET", headers})
}

export const useObtenerLicitacionesZona = () => {
  const apiRequest = useApiRequest()
  return async (idZona) =>
    await apiRequest(`${url}/licitaciones/zona/${idZona}`, {
      method: "GET",
      headers,
    })
}

export const useObtenerLicitacionByID = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion) =>
    await apiRequest(`${url}/licitaciones/${idLicitacion}`, {
      method: "GET",
      headers,
    })
}

export const useCrearLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (dataLicitacion) =>
    await apiRequest(`${url}/licitaciones`, {
      method: "POST",
      headers,
      body: JSON.stringify(dataLicitacion),
    })
}
// POST {{baseUrl}}/api/prodstarot
// Content-Type: application/json
 
// {
//   "listaCodigos": ["49", "1"]
// }
export const useListaCodigos = () => {
  const apiRequest = useApiRequest()
  return async (listaCodigos) =>
    await apiRequest(`${url}/prodstarot`, {
      method: "POST",
      headers,
      body: JSON.stringify(listaCodigos),
    })
}

export const useModificarLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion, dataLicitacion) =>
    
    await apiRequest(`${url}/licitaciones/${idLicitacion}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(dataLicitacion),
    })
}

export const useEliminarLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion) =>
    await apiRequest(`${url}/licitaciones/${idLicitacion}`, {
      method: "DELETE",
      headers,
    })
}

export const useCrearRenglonesLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion, renglones) =>
    await apiRequest(`${url}/renglones/licitacion/${idLicitacion}`, {
      method: "POST",
      headers,
      body: JSON.stringify({renglones}),
    })
}

export const useModificarRenglonesLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion, renglones) =>
    await apiRequest(`${url}/renglones/licitacion/${idLicitacion}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({renglones}),
    })
}

export const useEliminarRenglonesLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion) =>
    await apiRequest(`${url}/renglones/licitacion/${idLicitacion}`, {
      method: "DELETE",
      headers,
    })
}

export const useCrearRenglon = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion, datos) => {
    const { renglon, cantidad, descripcion, codigoTarot } = datos
    await apiRequest(`${url}/renglones/${idLicitacion}`, {
      method: "POST",
      headers,
      body: JSON.stringify({renglon, cantidad, descripcion, codigoTarot}),
    })
  }
}

export const useCrearRenglonAlternativo = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion, datos) => {
    const { renglon, cantidad, descripcion, codigoTarot, alternativo } = datos
    return await apiRequest(`${url}/renglones/alternativo/${idLicitacion}`, {
      method: "POST",
      headers,
      body: JSON.stringify({renglon, cantidad, descripcion, codigoTarot, alternativo}),
    })
  }
}

export const useEliminarRenglon = () => {
  const apiRequest = useApiRequest()
  return async (idRenglon) =>
    await apiRequest(`${url}/renglones/${idRenglon}`, {
      method: "DELETE",
      headers,
    })
}

export const useObtenerClientesZona = () => {
  const apiRequest = useApiRequest()
  return async (idZona) =>
    await apiRequest(`${url}/clientes/zona/${idZona}`, {method: "GET", headers})
}

export const useObtenerNombreTarot = () => {
  const apiRequest = useApiRequest()
  return async (codTarot) =>
    await apiRequest(`${url}/prodstarot/${codTarot}`, {method: "GET", headers})
}

export const useAsociarUsuarioLicitacion = () => {
  const apiRequest = useApiRequest()
  return async (idLicitacion, idUsuario) =>
    await apiRequest(`${url}/usuarios/asociar-licitacion/${idUsuario}`, {
      method: "POST",
      headers,
      body: JSON.stringify({idLicitacion}),
    })
}
