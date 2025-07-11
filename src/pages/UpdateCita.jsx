import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UpdateCita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    descripcion: "",
    fechaHora: "",
    cliente: "",
    emailCliente: "",
  });

  const [error, setError] = useState("");
  const [citas, setCitas] = useState([]);
  const token = localStorage.getItem("token");

  console.log("🚩 useLocation state:", state);

  useEffect(() => {
    const cargarDatosCita = async () => {
      if (state?.cita) {
        console.log("✅ Cargando cita desde state:", state.cita);
        const cita = { ...state.cita };
        if (cita.fechaHora) {
          cita.fechaHora = cita.fechaHora.slice(0, 16);
        }
        setFormData(cita);
        console.log("📦 formData cargado desde state:", cita);
      } else {
        try {
          const response = await axios.get(
            `https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const cita = response.data;
          if (cita.fechaHora) {
            cita.fechaHora = cita.fechaHora.slice(0, 16);
          }
          setFormData(cita);
          console.log("✅ Cargando cita desde backend:", cita);
        } catch (err) {
          console.error("❌ Error al cargar la cita:", err);
          setError("No se pudo cargar la cita.");
        }
      }
    };

    cargarDatosCita();
  }, [state, id, token]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get(
          "https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
    console.log(`✏️ Campo editado → ${id}: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const isFechaHoraConflicto = () => {
    return citas.some(
      (cita) =>
        cita.id !== parseInt(id) && cita.fechaHora === formData.fechaHora
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("🚀 Enviando formData:", formData);

    if (isFechaHoraConflicto()) {
      setError("La fecha/hora seleccionada ya está ocupada. Por favor, elige otra.");
      return;
    }

    try {
      await axios.put(
        `https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      setError("Error al actualizar la cita. Verifica los datos.");
      console.error("❌ Error al actualizar la cita:", err.response?.data || err.message);
    }
  };

  // Mostrar "cargando" si aún no hay datos clave
  if (!formData.descripcion && !formData.cliente) {
    return <div className="cita-container"><p style={{ color: "#fff" }}>Cargando cita...</p></div>;
  }

  return (
    <div className="cita-container">
      <div className="cita-card">
        <h2 className="cita-title">Actualizar Cita</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="formulario-cita" onSubmit={handleUpdate}>
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
            <label htmlFor="fechaHora">Fecha y Hora</label>
            <input
              type="datetime-local"
              id="fechaHora"
              value={formData.fechaHora || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="cliente">Cliente</label>
            <input
              type="text"
              id="cliente"
              value={formData.cliente || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="emailCliente">Correo del Cliente</label>
            <input
              type="email"
              id="emailCliente"
              value={formData.emailCliente || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Actualizar</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCita;
