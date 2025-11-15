const API_URL_EVENTS = 'http://localhost:3000/api/events';

export const eventService = {
  // Récupérer tous les événements
  async getEvents() {
    const response = await fetch(`${API_URL_EVENTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des événements');
    }
    
    return await response.json();
  },

  // Créer un événement (optionnel)
  async creerEvent(eventData) {
    const response = await fetch(`${API_URL_EVENTS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  }
};