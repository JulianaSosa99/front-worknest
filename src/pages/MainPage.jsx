import { useNavigate } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="main-container">
      <div className="main-card">
        <h2>Bienvenido a la Plataforma</h2>
        <p>Selecciona una opción para continuar:</p>
        <div className="d-grid gap-3">
          <button
            className="btn btn-primary"
            onClick={() => handleNavigate("/dashboard")}
          >
            Gestionar Citas
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleNavigate("/planificar-tareas")}
          >
            Planificar Tareas
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleNavigate("/estimar-costos")}
          >
            Estimar Costos
          </button>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
