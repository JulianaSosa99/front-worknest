import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        "https://api-management-freelancers.azure-api.net/tareas/api/tareas",
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
        `https://api-management-freelancers.azure-api.net/tareas/api/tareas/${id}`,
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
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-10"> {/* Hacemos el contenedor más ancho */}
        <div className="card shadow-lg p-4">
          {/* Encabezado */}
          <h2 className="text-center fw-bold mb-3">📋 Planificador de Tareas</h2>

          {/* Mensaje de Error */}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {/* Botón para Crear Nueva Tarea */}
          <div className="text-center mb-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/crear-tarea")}
            >
              ➕ Crear Nueva Tarea
            </button>
          </div>

          {/* Lista de Tareas */}
          {tareas.length === 0 ? (
            <div className="alert alert-info text-center">
              No hay tareas registradas.
            </div>
          ) : (
            <ul className="list-group">
              {tareas.map((tarea) => (
                <li
                  key={tarea.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <span className="me-2">📌</span>
                    <div>
                      <strong>{tarea.nombre}</strong>
                      <br />
                      {tarea.descripcion} | {tarea.fechaInicio} - {tarea.fechaFin} |{" "}
                      Estado:{" "}
                      <span className="badge bg-secondary">{tarea.estado}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() =>
                        navigate(`/update-tarea/${tarea.id}`, {
                          state: { tarea },
                        })
                      }
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardTareas;
