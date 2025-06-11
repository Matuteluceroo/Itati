import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSocket } from "../services/SocketContext.jsx";

const PrivateRoute = ({ element, allowedRoles }) => {
    const { currentUser } = useSocket();
    const [isLoading, setIsLoading] = useState(true);

    // Simulación de carga del usuario desde el socket
    useEffect(() => {
        if (currentUser !== undefined) {
            setIsLoading(false);
        }
    }, [currentUser]);

    // Mientras carga, mostramos un placeholder (puede ser un spinner)
    if (isLoading) {
        return <div><h1>CARGANDO...</h1></div>
    }

    // Si el usuario no está autenticado, redirigir al login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Si el usuario no tiene los permisos adecuados, redirigir a la home
    // if (!allowedRoles.includes(currentUser.rol)) {
    //     return <Navigate to="/" replace />;
    // }

    return element;
};

export default PrivateRoute;
