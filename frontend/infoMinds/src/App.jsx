import { useState } from 'react';
import InscriptionEleve from './components/InscriptionEleve';
import ListeEleves from './components/ListeEleves';
import './App.css';
import ListeEvents from './components/ListeEvents';
import LoginForm from './components/LoginForm';





function App() {
  const [activeView, setActiveView] = useState('inscription');

  return (
    
    <div className="App">
      <header style={{
        backgroundColor: '#ff6b63',
        color: 'white',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <h1> InfoMinds - Gestion des Eleves</h1>
        <nav style={{ marginTop: '1rem' }}>
          <button 
            onClick={() => setActiveView('inscription')}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: activeView === 'inscription' ? '#427A76' : '#174143',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Inscrire un Élève
          </button>
          <button 
            onClick={() => setActiveView('LoginForm')}
            style={{
              padding: '10px 25px',
              backgroundColor: activeView === 'LoginForm' ? '#427A76' : '#174143',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            LoginForm
          </button>
          <button 
            onClick={() => setActiveView('liste')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeView === 'liste' ? '#427A76' : '#174143',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Voir les Élèves
          </button>
          <button 
            onClick={() => setActiveView('events')}
            style={{
              padding: '10px 25px',
              backgroundColor: activeView === 'events' ? '#427A76' : '#174143',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Liste des Événements
          </button>
          
          
        </nav>
      </header>

      <main>
        {activeView === 'inscription' && <InscriptionEleve />}
        {activeView === 'liste' && <ListeEleves />}
        {activeView === 'events' && <ListeEvents />}
        {activeView === 'LoginForm' && <LoginForm />}
      </main>
    </div>
  );
}

export default App;