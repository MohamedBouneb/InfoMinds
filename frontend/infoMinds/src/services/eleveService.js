

const API_URL = 'http://localhost:3000/api/eleves';

export const eleveService = {

  async searchElevesByName(nom) {
    const response = await fetch(`${API_URL}/recherche/${encodeURIComponent(nom)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la recherche des élèves');
    }
    return await response.json();
  },

  

  // Inscrire un nouvel élève
  async inscrireEleve(eleveData) {
    const response = await fetch(`${API_URL}/inscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eleveData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  },

  // Récupérer la liste des élèves
  async getEleves() {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des élèves');
    }
    
    return await response.json();
  }
};