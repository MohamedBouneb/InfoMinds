import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bienvenue 👋</h1>

      <button onClick={() => navigate("/InscriptionEleve")}>
        Inscription
      </button>

      <button onClick={() => navigate("/login")}>
        Connexion
      </button>
    </div>
  );
}

export default Home;
