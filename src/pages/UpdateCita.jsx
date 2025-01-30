import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateCita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState(() => {
    const cita = state?.cita || {};
    if (cita.fechaHora) {
      cita.fechaHora = cita.fechaHora.slice(0, 16); // Formato para <input>
    }
    return cita;
  });
  const [error, setError] = useState("");
  const [citas, setCitas] = useState([]); // Lista de citas para validar conflictos

  const token = localStorage.getItem("token");

  // Cargar todas las citas al iniciar el componente
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get("https://api-management-freelancers.azure-api.net/gestion/api/citas/freelancer/citas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCitas(response.data);
      } catch (err) {
        console.error("Error al cargar las citas:", err.message);
      }
    };
    fetchCitas();
  }, [token]);

  // Maneja cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Verificar si la fecha/hora está en conflicto con otra cita
  const isFechaHoraConflicto = () => {
    return citas.some(
      (cita) =>
        cita.id !== parseInt(id) && // Ignora la cita que se está actualizando
        cita.fechaHora === formData.fechaHora
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validar si la fecha/hora está en conflicto
    if (isFechaHoraConflicto()) {
      setError("La fecha/hora seleccionada ya está ocupada. Por favor, elige otra.");
      return;
    }

    try {
      console.log("Datos enviados al backend:", formData);
      await axios.put(
        `https://api-management-freelancers.azure-api.net/gestion/api/citas/freelancer/citas/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/dashboard"); // Redirige al dashboard después de actualizar
    } catch (err) {
      setError("Error al actualizar la cita. Verifica los datos.");
      console.error("Error al actualizar la cita:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Actualizar Cita</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdate}>
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
          <label htmlFor="fechaHora" className="form-label">Fecha y Hora</label>
          <input
            type="datetime-local"
            id="fechaHora"
            className="form-control"
            value={formData.fechaHora || ""}
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
            value={formData.cliente || ""}
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
            value={formData.emailCliente || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default UpdateCita;
