import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
      await axios.put(`https://api-management-freelancers.azure-api.net/tareas/api/tareas/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/planificar-tareas");
    } catch (err) {
      setError("Error al actualizar la tarea.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Actualizar Tarea</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={formData.nombre || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <input
            type="text"
            id="descripcion"
            className="form-control"
            value={formData.descripcion || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
          <input
            type="date"
            id="fechaInicio"
            className="form-control"
            value={formData.fechaInicio || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
          <input
            type="date"
            id="fechaFin"
            className="form-control"
            value={formData.fechaFin || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            id="estado"
            className="form-select"
            value={formData.estado || "PENDIENTE"}
            onChange={handleInputChange}
          >
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN_PROGRESO">EN PROGRESO</option>
            <option value="COMPLETADA">COMPLETADA</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateTarea;
