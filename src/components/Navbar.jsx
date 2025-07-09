import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function PlanificarTareas() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Función para obtener las tareas
  const fetchTareas = async () => {
    try {
      const response = await axios.get("https://api-getaway-freelancer.azure-api.net/planificador/api/tareas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTareas(response.data);
    } catch (err) {
      setError("Error al cargar las tareas.");
    }
  };

  // Cargar las tareas al montar el componente
  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Planificar Tareas</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <ul className="list-group">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{tarea.nombre}</strong>
                <br />
                {tarea.descripcion}
                <br />
                <span className="badge bg-info">{tarea.estado}</span>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => alert("Editar tarea aún en desarrollo.")}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => alert("Eliminar tarea aún en desarrollo.")}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlanificarTareas;
