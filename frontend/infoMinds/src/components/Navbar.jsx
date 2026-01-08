import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate ajouté

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Initialisation

  const buttonStyle = (path) => ({
    marginRight: "10px",
    padding: "10px 20px",
    backgroundColor: location.pathname === path ? "#427A76" : "#174143",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirection vers login
  };

  return (
    <nav style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}>
      <Link to="/eleves" style={buttonStyle("/eleves")}>
        Voir les Élèves
      </Link>

      <Link to="/events" style={buttonStyle("/events")}>
        Liste des Événements
      </Link>

      {/* Bouton logout à droite */}
      <button
        onClick={handleLogout}
        style={{
          marginLeft: "auto", // pousse le bouton à droite
          padding: "10px 20px",
          backgroundColor: "#d9534f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
