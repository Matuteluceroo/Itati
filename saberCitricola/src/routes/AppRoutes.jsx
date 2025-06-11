import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import Home from "../pages/Home/Home.jsx"
import Regions from "../pages/Home/Regions.jsx"
import Comida from "../pages/Home/Comida.jsx"

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Regions />} />
      <Route
        path="/home"
        element={
          <PrivateRoute
            element={<Home />}
          />
        }
      />
      <Route
        path="/regions"
        element={
          <PrivateRoute
            element={<Regions />}
          />
        }
      />
      <Route path="/comida/:id" element={<Comida />} />

    </Routes>
  </Router>
)
export default AppRoutes
