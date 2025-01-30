import { useNavigate } from "react-router-dom";
import "./MainPage.css"; // Importamos el CSS

function MainPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
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
            onClick={() => navigate("/estimar-costos")}
          >
            Estimar Costos
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
