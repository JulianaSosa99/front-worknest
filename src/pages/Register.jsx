import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://api-getaway-freelancer.azure-api.net/login/api/freelancer/register",
        {
          nombre: name,
          correo: email,
          contrasena: password,
        }
      );
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/");
    } catch (err) {
      setError("Error al registrarse. Intenta con un correo diferente.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Crear una cuenta</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleRegister}>
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email" className="form-label">Correo</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>

        <p className="mt-3">¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></p>
      </div>
    </div>
  );
}

export default Register;
