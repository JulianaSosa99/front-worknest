import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import CrearCita from "./pages/CrearCita";
import UpdateCita from "./pages/UpdateCita";
import DashboardTareas from "./pages/DashboardTareas";
import CrearTarea from "./pages/CrearTarea";
import UpdateTarea from "./pages/UpdateTarea";
import EstimarCostos from "./pages/EstimarCostos";
import Register from "./pages/Register";  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-cita" element={<CrearCita />} />
        <Route path="/update-cita/:id" element={<UpdateCita />} />
        <Route path="/planificar-tareas" element={<DashboardTareas />} />
        <Route path="/crear-tarea" element={<CrearTarea />} />
        <Route path="/update-tarea/:id" element={<UpdateTarea />} />
        <Route path="/estimar-costos" element={<EstimarCostos />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
