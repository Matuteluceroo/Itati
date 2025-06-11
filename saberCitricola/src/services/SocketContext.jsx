import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => useContext(SocketContext)
// AQUI ANDA PERFECTO

/// /// ///
export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null)
    const [notificaciones, setNotificaciones] = useState([])
    const [currentUser, setCurrentUser] = useState(() => {
        // Intenta obtener el usuario desde localStorage al cargar la página
        const savedUser = localStorage.getItem('currentUser')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const url = localStorage.getItem('url_send')
    //console.log("URL: ", url)
    let thisUrl = null
    if(url !== null){
        thisUrl = url.substring(0,url.length-4)
    }

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
        } else {
            localStorage.removeItem('currentUser')
        }
    }, [currentUser])

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser')
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser)
            setCurrentUser(parsedUser)
            connectSocket(parsedUser, thisUrl) // Asegúrate de colocar la URL correcta
        }
    }, []) // Se ejecuta una sola vez cuando se monta el componente

    const connectSocket = (userData, url_send) => {
        if (socketRef.current && socketRef.current.connected) {
            console.warn("El socket ya está conectado.")
            return
        }

        //console.log("Conectando con los datos de usuario:", userData)
        setCurrentUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))  // Guardar en localStorage

        const newSocket = io(url_send, {
            transports: ['websocket'],
            reconnection: true, // Habilita la reconexión automática
            reconnectionAttempts: 10, // Intentos de reconexión
            reconnectionDelay: 2000, // Intervalo entre intentos
        })

        newSocket.on('connect', () => {
            console.log('Conexión exitosa:', newSocket.id)
            newSocket.emit('register', userData)
        })

        newSocket.on('nuevaNotificacion', (mensaje) => {
            setNotificaciones((prev) => [...prev, mensaje]);

            //console.log("NOTIFICACIONES: ",notificaciones)
        })

        newSocket.on('disconnect', () => {
            console.log('Desconectado del servidor.')
            socketRef.current = null
        })

        socketRef.current = newSocket
    }

    const disconnectSocket = () => {
        if (socketRef.current) {
            socketRef.current.disconnect()
            socketRef.current = null
            setCurrentUser(null)
            setNotificaciones([])
            localStorage.removeItem('currentUser')
            console.log('Socket desconectado correctamente.')
        }
    }

    const enviarNotificacion = (receptorId, mensaje) => {
        if (socketRef.current) {
            socketRef.current.emit('enviarNotificacion', { receptorId, mensaje })
            console.log(`Notificación enviada a ${receptorId}: ${mensaje.mensaje}`)
        } else {
            console.error('No hay conexión activa con el servidor.')
        }
    }

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        if (!socketRef.current) return
    
        socketRef.current.on('connect', () => {
            console.log("Re-conectado al servidor")
        })
    
        socketRef.current.on('disconnect', () => {
            console.log("Intentando reconectar...")
            setTimeout(() => {
                if (currentUser) {
                    connectSocket(currentUser, thisUrl)
                }
            }, 5000) // Intenta reconectar después de 5 segundos
        })
    }, [socketRef.current])
    

    return (
        <SocketContext.Provider value={{
            socket: socketRef.current,
            connectSocket,
            disconnectSocket,
            enviarNotificacion,
            notificaciones,
            currentUser
        }}>
            {children}
        </SocketContext.Provider>
    )
}
