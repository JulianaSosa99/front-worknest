import React, { useState, useEffect } from "react";
import axios from "axios";
import "./estimar-costos.css";

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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      obtenerEstimaciones();
    }
  }, [token]);

  const obtenerEstimaciones = async () => {
    try {
      const response = await axios.get(
        "https://work-nest-estimaciones.onrender.com/api/estimaciones",
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
      alert("No se pudo cargar las estimaciones.");
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
        "https://work-nest-estimaciones.onrender.com/api/estimaciones",
        
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
      obtenerEstimaciones();
    } catch (error) {
      console.error("Error al crear la estimación:", error);
      alert("Hubo un error al crear la estimación.");
    }
  };

  return (
    <div className="estimar-container">
      <div className="container">
        <h1 className="estimar-title">📊 Estimar Costos</h1>
        <div className="row">
          {/* Formulario */}
          <div className="col-md-6">
            <div className="estimar-card">
              <h4 className="estimar-subtitle">📝 Nueva Estimación</h4>
              <form className="estimar-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Nombre del Proyecto</label>
                  <input
                    type="text"
                    name="nombreProyecto"
                    value={formulario.nombreProyecto}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Nombre de la Empresa</label>
                  <input
                    type="text"
                    name="nombreEmpresa"
                    value={formulario.nombreEmpresa}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Valor por Hora</label>
                  <input
                    type="number"
                    name="valorPorHora"
                    value={formulario.valorPorHora}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Cantidad de Horas</label>
                  <input
                    type="number"
                    name="cantidadHoras"
                    value={formulario.cantidadHoras}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Cantidad de Días</label>
                  <input
                    type="number"
                    name="cantidadDias"
                    value={formulario.cantidadDias}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="estimar-btn">
                  ➕ Crear Estimación
                </button>
              </form>
            </div>
          </div>

          {/* Listado */}
          <div className="col-md-6">
            <div className="estimar-card">
              <h4 className="estimar-subtitle">📌 Listado de Estimaciones</h4>
              {estimaciones.length > 0 ? (
                <table className="estimar-table">
                  <thead>
                    <tr>
                      <th>Proyecto</th>
                      <th>Empresa</th>
                      <th>Valor/Hora</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimaciones.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nombreProyecto}</td>
                        <td>{item.nombreEmpresa}</td>
                        <td>${item.valorPorHora}</td>
                        <td>
                          <span className="estimar-badge">
                            ${item.costoTotal}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-muted">
                  No hay estimaciones disponibles.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimarCostos;
