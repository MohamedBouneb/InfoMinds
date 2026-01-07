import { Routes, Route, Navigate } from "react-router-dom";

import InscriptionEleve from "./components/InscriptionEleve";
import ListeEleves from "./components/ListeEleves";
import ListeEvents from "./components/ListeEvents";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header
        style={{
          backgroundColor: "#ff6b63",
          color: "white",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <h1>InfoMinds - Gestion des Élèves</h1>
        <Navbar />
      </header>

      <main>
        <Routes>
          {/* Redirection par défaut */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginForm />} />
          <Route path="/inscription" element={<InscriptionEleve />} />
          <Route path="/eleves" element={<ListeEleves />} />
          <Route path="/events" element={<ListeEvents />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
