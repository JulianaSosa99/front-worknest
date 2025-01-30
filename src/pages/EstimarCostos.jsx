import React, { useState, useEffect } from "react";
import axios from "axios";

const EstimarCostos = () => {
  const [estimaciones, setEstimaciones] = useState([]);
  const [formulario, setFormulario] = useState({
    nombreProyecto: "",
    nombreEmpresa: "",
    valorPorHora: "",
    cantidadHoras: "",
    cantidadDias: "",
    descripcion: "",
  });
  const [token, setToken] = useState("");

  // Cargar token del localStorage al cargar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Obtener estimaciones al cargar el componente
  useEffect(() => {
    if (token) {
      obtenerEstimaciones();
    }
  }, [token]);

  const obtenerEstimaciones = async () => {
    try {
      const response = await axios.get(
        "https://api-management-freelancers.azure-api.net/estimador/api/estimaciones",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEstimaciones(response.data);
    } catch (error) {
      console.error("Error al listar las estimaciones:", error);
      alert("No se pudo cargar las estimaciones. Verifique su conexión.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://api-management-freelancers.azure-api.net/estimador/api/estimaciones",
        { ...formulario },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Estimación creada con éxito.");
      setFormulario({
        nombreProyecto: "",
        nombreEmpresa: "",
        valorPorHora: "",
        cantidadHoras: "",
        cantidadDias: "",
        descripcion: "",
      });
      obtenerEstimaciones(); // Recargar las estimaciones después de crear una nueva
    } catch (error) {
      console.error("Error al crear la estimación:", error);
      alert("Hubo un error al crear la estimación. Inténtelo de nuevo.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center fw-bold mb-4">📊 Estimar Costos</h1>
      
      {/* Estructura en columnas */}
      <div className="row">
        {/* Formulario a la izquierda */}
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h4 className="text-center mb-3">📝 Nueva Estimación</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Nombre del Proyecto</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombreProyecto"
                  value={formulario.nombreProyecto}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Nombre de la Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombreEmpresa"
                  value={formulario.nombreEmpresa}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Valor por Hora</label>
                <input
                  type="number"
                  className="form-control"
                  name="valorPorHora"
                  value={formulario.valorPorHora}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Cantidad de Horas</label>
                <input
                  type="number"
                  className="form-control"
                  name="cantidadHoras"
                  value={formulario.cantidadHoras}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Cantidad de Días</label>
                <input
                  type="number"
                  className="form-control"
                  name="cantidadDias"
                  value={formulario.cantidadDias}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Descripción</label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  value={formulario.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                ➕ Crear Estimación
              </button>
            </form>
          </div>
        </div>

        {/* Lista de estimaciones a la derecha */}
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h4 className="text-center mb-3">📌 Listado de Estimaciones</h4>
            {estimaciones.length > 0 ? (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th>Empresa</th>
                    <th>Valor x Hora</th>
                    <th>Costo Total</th>
                  </tr>
                </thead>
                <tbody>
                  {estimaciones.map((estimacion) => (
                    <tr key={estimacion.id}>
                      <td>{estimacion.nombreProyecto}</td>
                      <td>{estimacion.nombreEmpresa}</td>
                      <td>${estimacion.valorPorHora}</td>
                      <td>
                        <span className="badge bg-success">${estimacion.costoTotal}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-muted">No hay estimaciones disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimarCostos;
