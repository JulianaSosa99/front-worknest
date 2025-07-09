import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CrearCita() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descripcion: "",
    fechaHora: "",
    cliente: "",
    emailCliente: "",
  });
  const [citas, setCitas] = useState([]); // Lista de citas para validar conflictos
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Cargar todas las citas al iniciar el componente
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get("https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCitas(response.data);
      } catch (err) {
        console.error("Error al cargar las citas:", err.message);
      }
    };
    fetchCitas();
  }, [token]);

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Verificar si la fecha/hora ya está ocupada
  const isFechaHoraConflicto = () => {
    return citas.some((cita) => cita.fechaHora === formData.fechaHora);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar conflictos de fecha/hora en el frontend
    if (isFechaHoraConflicto()) {
      setError("La fecha/hora seleccionada ya está ocupada. Por favor, elige otra.");
      return;
    }

    try {
      // Intentar crear la cita
      await axios.post("https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/dashboard"); // Redirige al dashboard después de crear la cita
    } catch (err) {
      // Manejo de errores del backend
      if (err.response?.status === 400 && err.response.data.includes("fecha ya está agendada")) {
        setError("La fecha/hora seleccionada ya está ocupada. Por favor, elige otra.");
      } else {
        setError("Error al crear la cita. Verifica los datos.");
      }
      console.error("Error al crear la cita:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Cita</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="fechaHora" className="form-label">Fecha y Hora</label>
          <input
            type="datetime-local"
            id="fechaHora"
            className="form-control"
            value={formData.fechaHora}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">Cliente</label>
          <input
            type="text"
            id="cliente"
            className="form-control"
            value={formData.cliente}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailCliente" className="form-label">Correo del Cliente</label>
          <input
            type="email"
            id="emailCliente"
            className="form-control"
            value={formData.emailCliente}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Cita</button>
      </form>
    </div>
  );
}

export default CrearCita;
