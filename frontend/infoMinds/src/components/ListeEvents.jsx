import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

const ListeEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [nouveauEvent, setNouveauEvent] = useState({ 
    titre: '',
    description: ''
  });

  const chargerEvents = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await eventService.getEvents();
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ajouterEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await eventService.creerEvent(nouveauEvent);
      setNouveauEvent({ titre: '', description: '' });
      setShowForm(false); 
      chargerEvents(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNouveauEvent({
      ...nouveauEvent,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    chargerEvents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2> Liste des Événements</h2>
      
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={chargerEvents}
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Chargement...' : ' Actualiser'}
        </button>
        
        
        <button 
          onClick={() => setShowForm(!showForm)}
          disabled={loading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showForm ? ' Annuler' : ' Ajouter Événement'}
        </button>
      </div>

      
      {showForm && (
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          marginBottom: '20px'
        }}>
          <h3>Nouvel event</h3>
          <form onSubmit={ajouterEvent}>
            <div style={{ marginBottom: '10px' }}>
              <label>Titre:</label>
              <input
                type="text"
                name="titre"
                value={nouveauEvent.titre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginTop: '5px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label>Description:</label>
              <textarea
                name="description"
                value={nouveauEvent.description}
                onChange={handleChange}
                required
                rows="3"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginTop: '5px',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              style={{
                padding: '8px 15px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Création...' : ' Créer Événement'}
            </button>
          </form>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          Erreur: {error}
        </div>
      )}

      {events.length === 0 && !loading ? (
        <p>Aucun événement pour le moment.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {events.map((event) => (
            <div 
              key={event._id}
              style={{
                border: '1px solid #17a2b8',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <h3 style={{ color: '#17a2b8', margin: '0 0 10px 0' }}>
                {event.titre}
              </h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                <strong>Créé le:</strong> {new Date(event.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListeEvents;