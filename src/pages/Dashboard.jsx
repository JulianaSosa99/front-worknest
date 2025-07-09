import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get(
        `https://api-getaway-freelancer.azure-api.net/citas/api/citas/freelancer/citas`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCitas(response.data);
    } catch (err) {
      setError("Error al cargar las citas.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api-getaway-freelancer.azure-api.net/citas/api/citas/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCitas();
    } catch (err) {
      setError("Error al eliminar la cita.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }} // Fondo gris claro
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "95%", // Más ancho
          maxWidth: "1800px", // Máximo tamaño en pantallas grandes
          minHeight: "550px", // Evita que sea muy pequeña
        }}
      >
        <h2 className="text-center mb-4">
          📅 <strong>Dashboard de Citas</strong>
        </h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="text-center mb-3">
          <button className="btn btn-primary" onClick={() => navigate("/crear-cita")}>
            ➕ Crear Nueva Cita
          </button>
        </div>

        <ul className="list-group">
          {citas.map((cita) => (
            <li
              key={cita.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ fontSize: "1.1rem", padding: "15px" }}
            >
              <div>
                <strong>{cita.descripcion}</strong>
                <br />
                📅 {cita.fechaHora} - 👤 {cita.cliente} ({cita.emailCliente})
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/update-cita/${cita.id}`, { state: { cita } })}
                >
                  ✏️ Editar
                </button>

                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cita.id)}>
                  🗑️ Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
