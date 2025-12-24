import { useState } from 'react';
import { eleveService } from '../services/eleveService';

const InscriptionEleve = () => {
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    role: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await eleveService.inscrireEleve(formData);
      setMessage(result.message);
      setFormData({ nom: '', prenom: '', email: '', motDePasse: '', role: '' });
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Partie gauche */}
      <div style={styles.left}>
        <h1 style={styles.title}>Gestion académique</h1>
        <p style={styles.subtitle}> INFOMINDS, club d'informatique et de robotique pour des événements et des ateliers éducatifs.  </p>

      </div>

      {/* Partie droite */}
      <div style={styles.right}>
        <h2 style={styles.header}>Bienvenue à mes élèves et à mes administrateurs, Rejoindre notre équipe.</h2>

        {message && (
          <div style={{
            padding: '10px',
            margin: '10px 0',
            backgroundColor: message.includes('Erreur') ? '#ffebee' : '#e8f5e8',
            border: `1px solid ${message.includes('Erreur') ? '#f44336' : '#4caf50'}`,
            borderRadius: '4px'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label>Prénom :</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>Nom :</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Mot de passe :</label>
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Role :</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">-- Choisir un rôle --</option>
              <option value="eleve">Élève</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InscriptionEleve;

// ---------------------- CSS en JS ----------------------
const styles = {
  container: {
    display: 'flex',
    width: '90%',
    height: '520px',
    margin: '40px auto',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },

  // Partie gauche
  left: {
    flex: 1,
    backgroundColor: '#ff6b63',
    color: 'white',
    padding: '40px',
    position: 'relative'
  },
  title: {
    fontSize: '42px',
    marginTop: '180px'
  },
  subtitle: {
    opacity: 0.8,
    marginTop: '-10px'
  },

  // Partie droite
  right: {
    flex: 1.5,
    backgroundColor: '#f5e9e6',
    padding: '50px'
  },

  header: {
    fontSize: '24px',
    marginBottom: '30px'
  },

  form: {
    marginTop: '10px'
  },

  row: {
    display: 'flex',
    gap: '20px'
  },

  inputGroup: {
    width: '100%',
    marginBottom: '15px'
  },

  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '30px',
    border: '1px solid #ddd'
  },

  button: {
    width: '180px',
    padding: '12px',
    backgroundColor: '#ff6b63',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    marginTop: '20px',
    float: 'right'
  }
};
