import logo from '../../../public/logochico.png';
import "./Header.css";

export function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <img
                    src={logo}
                    alt="Logo"
                    className="header-logo"
                />
                <span className="header-title">SABER CITRICOLA</span>
            </div>
            <div className="header-right">
                <button className="header-button">Ayuda</button>
            </div>
        </header>
    )
}
export default Header;

// import React, { useEffect, useState } from "react"
// import porfileIco from "../../assets/porfile.svg"
// import notificacion from "../../assets/notification.svg"
// import logo from "../../assets/logoM.svg"
// import { useSocket } from "../../services/SocketContext.jsx"
// import Modal from "../Modal/Modal.jsx"
// import Button from "../Button/Button.jsx"
// import { useCambiarPassword } from "../../services/connections/usuarios.js"
// import "./Header.css"
// import { Link } from "react-router-dom"

// const Header = ({ Components, isCellPhone = false }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false)
//   const { currentUser, notificaciones } = useSocket()
//   const [hasNotifications, setHasNotifications] = useState(false)
//   const [profileIconScale, setProfileIconScale] = useState(1)

//   useEffect(() => {
//     setHasNotifications(notificaciones.length > 0)
//   }, [notificaciones])

//   const handleCloseModal = () => setIsModalOpen(false)
//   const handleOpenNotifications = () => setIsNotificationOpen(true)
//   const handleCloseNotifications = () => setIsNotificationOpen(false)

//   const handleProfileClick = () => {
//     setIsModalOpen(true)
//     setProfileIconScale(1.1) // Escalar el icono ligeramente
//     setTimeout(() => setProfileIconScale(1), 300) // Volver a la escala original después de 300ms
//   }

//   return (
//     <div className="row headerContent">
//       <div className="col-9 p-0">
//         <Components />
//       </div>
//       <div className="col-1 p-0 d-flex justify-content-end align-items-center">
//         <Link to="/reportes" className="btn" title="Ir a Reportes">
//           <img
//             src={logo}
//             alt="Sitio Externo"
//             style={{
//               width: "40px",
//               height: "40px",
//               transition: "transform 0.3s ease",
//               marginTop: "-15px",
//             }}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.transform = "scale(1.1)")
//             }
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           />
//         </Link>
//       </div>
//       <div
//         className={isCellPhone ? "col-4" : "col-2 p-0"}
//         style={{ maxWidth: isCellPhone ? "160px" : "" }}
//       >
//         <div className="header-actions">
//           <Button
//             className={`btnImg ${hasNotifications ? "btnRojo" : ""}`}
//             icon={
//               <img
//                 src={notificacion}
//                 alt="Notificaciones"
//                 style={{
//                   transform: `scale(${profileIconScale})`,
//                   transition: "transform 0.3s ease",
//                 }}
//               />
//             }
//             ariaLabel="Notificaciones"
//             onClick={handleOpenNotifications}
//             title="Notificaciones"
//           />
//           <Button
//             className="btnImg"
//             icon={
//               <img
//                 src={porfileIco}
//                 alt="Perfil"
//                 style={{
//                   transform: `scale(${profileIconScale})`,
//                   transition: "transform 0.3s ease",
//                 }}
//               />
//             }
//             ariaLabel="Perfil F"
//             onClick={() => setIsModalOpen(true)}
//             title="Perfil"
//           />
//         </div>
//         <p className="user-welcome">
//           {currentUser ? ` ${currentUser.usuario}` : "Usuario no identificado"}
//         </p>
//       </div>
//       <ProfileModal
//         isModalOpen={isModalOpen}
//         handleCloseModal={handleCloseModal}
//         currentUser={currentUser}
//       />
//       <NotificationModal
//         isOpen={isNotificationOpen}
//         onClose={handleCloseNotifications}
//         notificaciones={notificaciones}
//       />
//     </div>
//   )
// }

// export default Header

// // 2. Componente NotificationModal

// const NotificationModal = ({ isOpen, onClose, notificaciones }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Notificaciones">
//       <div>
//         {notificaciones.length === 0 ? (
//           <p>NO HAY NOTIFICACIONES</p>
//         ) : (
//           notificaciones.map((noti, index) => (
//             <p key={index}>
//               <b>{noti.usuario + ": "}</b> {noti.mensaje}
//             </p>
//           ))
//         )}
//       </div>
//     </Modal>
//   )
// }

// // 3. Componente ProfileModal Modificado

// const ProfileModal = ({ isModalOpen, handleCloseModal, currentUser }) => {
//   const [activeView, setActiveView] = useState("menu")
//   const [modalTitle, setModalTitle] = useState("MI PERFIL")
//   const [currentPassword, setCurrentPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const cambiarPassword = useCambiarPassword()

//   useEffect(() => {
//     if (!isModalOpen) {
//       setActiveView("menu")
//       setModalTitle("MI PERFIL")
//     }
//   }, [isModalOpen])

//   const handleViewChange = (view, title) => {
//     setActiveView(view)
//     setModalTitle(title)
//   }

//   const cambiarContrasena = async (event) => {
//     event.preventDefault()

//     if (newPassword === "") {
//       alert("Ingresar una contraseña válida")
//       return
//     }

//     if (newPassword !== confirmPassword) {
//       alert("La nueva contraseña y su confirmación no coinciden.")
//       return
//     }

//     const cambio = await cambiarPassword(currentUser.id, {
//       userName: currentUser.usuario,
//       password: currentPassword,
//       newPassword: newPassword,
//     })

//     if (cambio === null) {
//       alert("CONTRASEÑA INCORRECTA")
//       return
//     }

//     alert("CONTRASEÑA ACTUALIZADA")
//     handleViewChange("menu", "MI PERFIL")
//     handleCloseModal()
//   }

//   const renderContent = () => {
//     switch (activeView) {
//       case "cambiarContraseña":
//         return (
//           <div id="changePasswordContainer">
//             <form id="changePasswordForm" onSubmit={cambiarContrasena}>
//               <label htmlFor="currentPassword">Contraseña actual:</label>
//               <input
//                 type="password"
//                 id="currentPassword"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//               />
//               <label htmlFor="newPassword">Nueva contraseña:</label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//               <label htmlFor="confirmPassword">
//                 Confirmar nueva contraseña:
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <button type="submit" className="btnHeaderCon">
//                 Cambiar contraseña
//               </button>
//             </form>
//             <br />
//             <Button
//               className="btnHeader"
//               text="Volver"
//               onClick={() => handleViewChange("menu", "MI PERFIL")}
//             />
//           </div>
//         )

//       case "opcion3":
//         return (
//           <div>
//             <p>Contenido de la opción 3.</p>
//             <Button
//               className="btnHeader"
//               text="Volver"
//               onClick={() => handleViewChange("menu", "MI PERFIL")}
//             />
//           </div>
//         )

//       default:
//         return (
//           <div>
//             <ul>
//               <li>
//                 <Button
//                   text="Cambiar de Contraseña"
//                   className="btnSimple btnVerde"
//                   onClick={() =>
//                     handleViewChange("cambiarContraseña", "Cambiar contraseña")
//                   }
//                 />
//               </li>
//               <li>
//                 <Button
//                   text="Opción 3"
//                   className="btnSimple btnVerde"
//                   onClick={() => handleViewChange("opcion3", "Opción 3")}
//                 />
//               </li>
//             </ul>
//           </div>
//         )
//     }
//   }

//   return (
//     <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
//       {renderContent()}
//     </Modal>
//   )
// }
