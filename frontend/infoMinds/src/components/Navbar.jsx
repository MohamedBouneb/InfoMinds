import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const buttonStyle = (path) => ({
    marginRight: "10px",
    padding: "10px 20px",
    backgroundColor: location.pathname === path ? "#427A76" : "#174143",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none"
  });

  return (
    <nav style={{ marginTop: "1rem" }}>
      <Link to="/inscription" style={buttonStyle("/inscription")}>
        Inscrire un Élève
      </Link>

      <Link to="/login" style={buttonStyle("/login")}>
        Login
      </Link>

      <Link to="/eleves" style={buttonStyle("/eleves")}>
        Voir les Élèves
      </Link>

      <Link to="/events" style={buttonStyle("/events")}>
        Liste des Événements
      </Link>
    </nav>
  );
}

export default Navbar;
