import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GestionarCitas() {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Recupera el token

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get(
        "https://api-management-freelancers.azure-api.net/gestion/api/citas/freelancer/citas",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCitas(response.data);
    } catch (err) {
      console.error("Error al cargar las citas:", err.response?.data || err.message);
      setError("No se pudo cargar las citas. Verifica el token.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api-management-freelancers.azure-api.net/gestion/api/citas/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCitas(); // Actualiza la lista tras eliminar
    } catch (err) {
      console.error("Error al eliminar la cita:", err.response?.data || err.message);
      setError("Error al eliminar la cita.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Gestionar Citas</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/gestionar-citas/crear")}
      >
        Crear Nueva Cita
      </button>
      <ul className="list-group">
        {citas.map((cita) => (
          <li
            key={cita.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{cita.descripcion}</strong>
              <br />
              {cita.fechaHora} - {cita.cliente} ({cita.emailCliente})
            </div>
            <div>
              <button
                className="btn btn-warning me-2"
                onClick={() => navigate(`/gestionar-citas/actualizar/${cita.id}`)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(cita.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestionarCitas;
