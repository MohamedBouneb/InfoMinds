import { useState, useEffect } from 'react';
import { eleveService } from '../services/eleveService';

const ListeEleves = () => {
  const [eleves, setEleves] = useState([]);
  const [elevesFiltres, setElevesFiltres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recherche, setRecherche] = useState('');

  const chargerEleves = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await eleveService.getEleves();
      setEleves(data.eleves || []);
      setElevesFiltres(data.eleves || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les élèves par nom
  const filtrerEleves = (terme) => {
    setRecherche(terme);
    
    if (!terme.trim()) {
      setElevesFiltres(eleves);
      return;
    }

    const resultats = eleves.filter(eleve =>
      eleve.nom.toLowerCase().includes(terme.toLowerCase()) ||
      eleve.prenom.toLowerCase().includes(terme.toLowerCase())
    );
    
    setElevesFiltres(resultats);
  };

  useEffect(() => {
    chargerEleves();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Liste des Élèves</h2>

      {/* BARRE DE RECHERCHE */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={recherche}
          onChange={(e) => filtrerEleves(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: '10px'
          }}
        />
        <small style={{ color: '#666' }}>
          {recherche ? `${elevesFiltres.length} élève(s) trouvé(s)` : `${eleves.length} élève(s) au total`}
        </small>
      </div>
      
      

      {error && (
        <div style={{ color: 'red', marginBottom: '15px' }}>
          Erreur: {error}
        </div>
      )}

      {elevesFiltres.length === 0 && !loading ? (
        <p>{recherche ? `Aucun élève trouvé pour "${recherche}"` : 'Aucun élève inscrit pour le moment.'}</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {elevesFiltres.map((eleve) => (
            <div 
              key={eleve._id}
              style={{
                border: '1px solid #e44343ff',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3>{eleve.prenom} {eleve.nom}</h3>
              <p><strong>Email:</strong> {eleve.email}</p>
              <p><strong>Date d'inscription:</strong> {new Date(eleve.dateInscription).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListeEleves;