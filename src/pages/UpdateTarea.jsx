import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Cita.css"; // Reutilizamos los estilos de Cita

function UpdateTarea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState(state?.tarea || {});
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://api-getaway-freelancer.azure-api.net/planificador/api/tareas/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/planificar-tareas");
    } catch (err) {
      setError("Error al actualizar la tarea.");
    }
  };

  return (
    <div className="cita-container">
      <div className="cita-card">
        <h2 className="cita-title">Actualizar Tarea</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="formulario-cita">
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              value={formData.descripcion || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="fechaInicio">Fecha Inicio</label>
            <input
              type="date"
              id="fechaInicio"
              value={formData.fechaInicio || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="fechaFin">Fecha Fin</label>
            <input
              type="date"
              id="fechaFin"
              value={formData.fechaFin || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              value={formData.estado || "PENDIENTE"}
              onChange={handleInputChange}
            >
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="EN_PROGRESO">EN PROGRESO</option>
              <option value="COMPLETADA">COMPLETADA</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTarea;
