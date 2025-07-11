import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function CrearTarea() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "PENDIENTE",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api-getaway-freelancer.azure-api.net/planificador/api/tareas", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/planificar-tareas");
    } catch (err) {
      setError("Error al crear la tarea.");
    }
  };

  return (
    <div className="tarea-container">
      <div className="tarea-card">
        <h2 className="tarea-title">Crear Nueva Tarea</h2>
        <form onSubmit={handleSubmit} className="formulario-tarea">
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" value={formData.nombre} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="descripcion">Descripción</label>
            <input type="text" id="descripcion" value={formData.descripcion} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="fechaInicio">Fecha Inicio</label>
            <input type="date" id="fechaInicio" value={formData.fechaInicio} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="fechaFin">Fecha Fin</label>
            <input type="date" id="fechaFin" value={formData.fechaFin} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="estado">Estado</label>
            <select id="estado" value={formData.estado} onChange={handleInputChange}>
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="EN_PROGRESO">EN PROGRESO</option>
              <option value="COMPLETADA">COMPLETADA</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>

  );
}

export default CrearTarea;
