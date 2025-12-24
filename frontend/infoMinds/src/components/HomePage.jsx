import React from 'react';
import '../components/HomePage.css';

const HomePage = () => {
  const handleLogin = () => {
    alert('Fonction de connexion à implémenter');
  };

  const handleSignup = () => {
    alert('Fonction de création de compte à implémenter');
  };

  return (
    <div className="admission-container">
      <div className="admission-content">
        <header className="admission-header">
          <h1>2026 SCHOOL ADMISSION</h1>
          <h2>NOW OPEN FOR REGISTRATION!</h2>
        </header>
        
        <div className="admission-body">
          <p className="admission-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Lorem ipsum has been the industry's standard dummy text ever since the 
            1500s, when an unknown printer took a galley.
          </p>
          
          <div className="divider"></div>
          
          <div className="contact-info">
            <h3>For More Info:</h3>
            <ul>
              <li>+ 000 122 456 789</li>
              <li>www.netfolio.com</li>
            </ul>
          </div>
          
          <div className="auth-buttons">
            <button className="btn btn-login" onClick={handleLogin}>
              Connexion
            </button>
            <button className="btn btn-signup" onClick={handleSignup}>
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;