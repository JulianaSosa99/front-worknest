import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Cita.css";

function CrearCita() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descripcion: "",
    fechaHora: "",
    cliente: "",
    emailCliente: "",
  });
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get(
          "https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCitas(response.data);
      } catch (err) {
        console.error("Error al cargar las citas:", err.message);
      }
    };
    fetchCitas();
  }, [token]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const isFechaHoraConflicto = () => {
    return citas.some((cita) => cita.fechaHora === formData.fechaHora);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (isFechaHoraConflicto()) {
      setError("La fecha y hora seleccionada ya están ocupadas.");
      return;
    }

    try {
      await axios.post(
        "https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const msg = err.response?.data || err.message;
      if (msg.includes("fecha ya está agendada")) {
        setError("Esta fecha ya tiene una cita asignada.");
      } else {
        setError("Error al crear la cita. Verifica los datos.");
      }
    }
  };

  return (
    <div className="cita-container">
      <div className="cita-card">
        <h2 className="cita-title">Crear Nueva Cita</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Cita creada correctamente</div>}

        <form onSubmit={handleSubmit} className="formulario-cita">
          <div className="input-group">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              id="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Ej. Reunión de seguimiento"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="fechaHora">Fecha y Hora</label>
            <input
              type="datetime-local"
              id="fechaHora"
              value={formData.fechaHora}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="cliente">Cliente</label>
            <input
              type="text"
              id="cliente"
              value={formData.cliente}
              onChange={handleInputChange}
              placeholder="Ej. Juan Pérez"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="emailCliente">Correo del Cliente</label>
            <input
              type="email"
              id="emailCliente"
              value={formData.emailCliente}
              onChange={handleInputChange}
              placeholder="cliente@ejemplo.com"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Cita
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearCita;
