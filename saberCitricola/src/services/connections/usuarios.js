import { url, headers } from './consts.js';
import { useApiRequest } from './apiRequest.js';

// GET - Obtiene todos los usuarios
export const useObtenerUsuarios = () => {
    const apiRequest = useApiRequest();
    return async () => await apiRequest(`${url}/usuarios`, { method: 'GET', headers });
};

// GET - Obtiene los usuarios en línea
export const useObtenerUsuariosEnLinea = () => {
    const apiRequest = useApiRequest();
    return async () => await apiRequest(`${url}/connected-users`, { method: 'GET', headers });
};

// POST - Agrega un nuevo usuario
export const useAgregarUsuario = () => {
    const apiRequest = useApiRequest();
    return async (datos) =>
        await apiRequest(`${url}/usuarios`, {
            method: 'POST',
            headers,
            body: JSON.stringify(datos),
        });
};

// DELETE - Elimina un usuario
export const useEliminarUsuario = () => {
    const apiRequest = useApiRequest();
    return async (idUsuario) =>
        await apiRequest(`${url}/usuarios/${idUsuario}`, { method: 'DELETE', headers });
};

// PATCH - Modifica un usuario
export const useModificarUsuario = () => {
    const apiRequest = useApiRequest();
    return async (idUsuario, datos) =>
        await apiRequest(`${url}/usuarios/${idUsuario}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(datos),
        });
};

// PATCH - Cambia la contraseña de un usuario
export const useCambiarPassword = () => {
    const apiRequest = useApiRequest();
    return async (idUsuario, datos) =>
        await apiRequest(`${url}/usuarios/change-password/${idUsuario}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(datos),
        });
};

// PATCH - Restablece la contraseña de un usuario
export const useRestartPassword = () => {
    const apiRequest = useApiRequest();
    return async (idUsuario) =>
        await apiRequest(`${url}/usuarios/restart-password/${idUsuario}`, {
            method: 'PATCH',
            headers,
        });
};

export async function verificarLogin(userName, password) {
    const thisUrl = url.substring(0,url.length-4)
    
    try {
        const response = await fetch(`${thisUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, password }),
            credentials: 'include', // Incluir cookies
        });
        
        console.log(response)
        console.log(response.ok)


        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            console.log('Credenciales incorrectas')
            setError('Credenciales incorrectas');
            return null;
        }
    } catch (error) {
        setError('Error al comunicarse con el servidor');
        return null;
    }
}