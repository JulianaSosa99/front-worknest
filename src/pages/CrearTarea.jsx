import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="container mt-5">
      <h2>Crear Nueva Tarea</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={formData.nombre}
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
            value={formData.descripcion}
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
            value={formData.fechaInicio}
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
            value={formData.fechaFin}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            id="estado"
            className="form-select"
            value={formData.estado}
            onChange={handleInputChange}
          >
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN_PROGRESO">EN PROGRESO</option>
            <option value="COMPLETADA">COMPLETADA</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default CrearTarea;
