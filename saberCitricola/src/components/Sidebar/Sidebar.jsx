import { useState } from "react";
import "./Sidebar.css";
import { FaChartBar, FaUsers, FaSearch, FaFileAlt, FaHeadset, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import perfil from "../../assets/images/matias.jpg";
import { useLocation } from "react-router-dom";


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <div className="sidebar-profile">
        <img src={perfil} alt="Perfil" className={`sidebar-profile-image ${isCollapsed ? "small" : ""}`} />
        {!isCollapsed && (
          <div className="sidebar-profile-info">
            <h4 className="sidebar-profile-name">Lucero Panero Matias</h4>
            <p className="sidebar-profile-role">Administrador</p>
          </div>
        )}
      </div>
      <ul className="sidebar-menu">
        <li className={`sidebar-item ${location.pathname.includes("metricas") ? "active" : ""}`}>

          <Link to="/home/metricas" className="sidebar-link">
            <div className="sidebar-content">
              <FaChartBar className="sidebar-icon" />
              {!isCollapsed && <span>Métricas</span>}
            </div>
          </Link>
        </li>
        <li className={`sidebar-item ${location.pathname.includes("mis_empleados") ? "active" : ""}`}>

          <Link to="/home/mis_empleados" className="sidebar-link">
            <div className="sidebar-content">
              <FaUsers className="sidebar-icon" />
              {!isCollapsed && <span>Mis Empleados</span>}
            </div>
          </Link>
        </li>
        <li className={`sidebar-item ${location.pathname.includes("mi_contenido") ? "active" : ""}`}>

          <Link to="/home/mi_contenido" className="sidebar-link">
            <div className="sidebar-content">
              <FaFileAlt className="sidebar-icon" />
              {!isCollapsed && <span>Mi Contenido</span>}
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
