import { url, headers } from './consts.js';
import { useApiRequest } from './apiRequest.js';

// GET - Obtiene todas las facturas
export const useObtenerFacturas = () => {
    const apiRequest = useApiRequest();
    return async () => await apiRequest(`${url}/facturas`, { method: 'GET', headers });
};

// POST - Obtiene facturas por provincias
export const useObtenerFacturasProvincias = () => {
    const apiRequest = useApiRequest();
    return async (provincias) =>
        await apiRequest(`${url}/facturas/provincias`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ provincias }),
        });
};

// GET - Obtiene una factura por número de factura
export const useObtenerFactura = () => {
    const apiRequest = useApiRequest();
    return async (nroFactura) =>
        await apiRequest(`${url}/facturas/${nroFactura}`, { method: 'GET', headers });
};

// POST - Agrega una observación a una factura
export const useAgregarObservacion = () => {
    const apiRequest = useApiRequest();
    return async ({ nro_factura, op_exp, habilitado_pago, sello, observaciones, fecha_entrega, idUsuario }) =>
        await apiRequest(`${url}/facturas/observaciones`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ nro_factura, op_exp, habilitado_pago, sello, observaciones, fecha_entrega, idUsuario }),
        });
};

// GET - Obtiene todas las facturas
export const useObtenerNegativo = () => {
    const apiRequest = useApiRequest();
    return async () => await apiRequest(`${url}/facturas/negativos/`, { method: 'GET', headers });
};

// SELECT - Obtiene todos los datos, con los filtros aplicados
export const useObtenerFacturasConFiltros = () => {
    const apiRequest = useApiRequest()
    return async (filtros) => await apiRequest(`${url}/facturas/filtros`, {
        method: "POST",
        headers,
        body: JSON.stringify({filtros}),
      })
  }
  // REQ BODY:  { filtros: { RAZON_SOCI: [ 'PARAN' ] } }
  // REQ BODY:  { filtros: {} }
  // REQ BODY:  { filtros: { RAZON_SOCI: [ 'paran' ] } }