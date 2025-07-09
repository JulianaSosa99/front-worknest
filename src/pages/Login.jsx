import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../pages/Login.css"; // Archivo CSS para mejorar el diseño
import "/black_on_white.png"

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(`Input cambiado: ${id} = ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión con:", formData);

    try {
      const response = await axios.post(
        "https://api-getaway-freelancer.azure-api.net/login/api/freelancer/login",
        formData
      );
      console.log("Respuesta del login:", response);
      console.log("Token recibido:", response.data.token);

      localStorage.setItem("token", response.data.token);
      console.log("Token guardado en localStorage.");

      navigate("/main");
    } catch (err) {
      console.error("Error durante el login:", err);
      if (err.response) {
        console.error("Detalles del error:", err.response.status, err.response.data);
      }
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/black_on_white.png" alt="Logo" className="login-logo" />
        <h2 className="text-center">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input
              type="email"
              id="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              value={formData.contrasena}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <p className="mt-3 text-center">¿No tienes cuenta?</p>
        <button className="btn btn-success w-100" onClick={() => navigate("/register")}>
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Login;
