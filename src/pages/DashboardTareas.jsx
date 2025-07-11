import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function DashboardTareas() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTareas();
  }, []);

  const fetchTareas = async () => {
    try {
      const response = await axios.get(
        "https://api-getaway-freelancer.azure-api.net/planificador/api/tareas",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTareas(response.data);
    } catch (err) {
      setError("Error al cargar las tareas.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api-getaway-freelancer.azure-api.net/planificador/api/tareas/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTareas();
    } catch (err) {
      setError("Error al eliminar la tarea.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>📋 <strong>Planificador de Tareas</strong></h2>

        {error && <div className="alert-danger">{error}</div>}

        <div className="mb-4">
          <button className="btn btn-primary" onClick={() => navigate("/crear-tarea")}>
            ➕ Crear Nueva Tarea
          </button>
        </div>

        {tareas.length === 0 ? (
          <div className="alert alert-info">No hay tareas registradas.</div>
        ) : (
          <ul className="list-group">
            {tareas.map((tarea) => (
              <li key={tarea.id} className="list-group-item">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="text-start">
                    <strong>📌 {tarea.nombre}</strong><br />
                    {tarea.descripcion} | {tarea.fechaInicio} - {tarea.fechaFin} |{" "}
                    Estado: <span className="badge bg-secondary">{tarea.estado}</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/update-tarea/${tarea.id}`, { state: { tarea } })}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(tarea.id)}
                    >
                      🗑 Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardTareas;
