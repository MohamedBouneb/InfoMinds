import axios from "axios";

const API_URL = "http://localhost:5000/api/eleves";

export const eleveService = {

  // 🔍 Recherche d'élèves par nom
  async searchElevesByName(nom) {
    try {
      const response = await axios.get(
        `${API_URL}/recherche/${encodeURIComponent(nom)}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche des élèves", error);
      throw new Error("Erreur lors de la recherche des élèves");
    }
  },

  // 📝 Inscription d'un nouvel élève
  async inscrireEleve(eleveData) {
    try {
      const response = await axios.post(
        `${API_URL}/inscription`,
        eleveData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de l'inscription de l'élève";
      throw new Error(message);
    }
  },

  // 📋 Récupérer la liste des élèves
  async getEleves() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des élèves");
    }
  },

  // 🔐 Connexion d'un élève
  async loginEleve(credentials) {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      // Exemple si tu reçois un token JWT
      // localStorage.setItem("eleveToken", response.data.token);

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la connexion";
      console.error("Login failed:", message);
      throw new Error(message);
    }
  }
};
