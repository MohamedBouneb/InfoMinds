import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import nécessaire
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate(); // ✅ Initialisation ici
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Gestion des champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Afficher / cacher mot de passe
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/eleves/login",
        {
          email: formData.email,
          motDePasse: formData.password,
        }
      );

      // Stockage token et user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.eleve));

      // Redirection selon rôle
      const role = response.data.eleve.role;
      if (role === "admin") navigate("/admin"); // Admin → /admin
      else navigate("/home"); // Élève → /home

      setSuccess("Connexion réussie ✅ Bienvenue !");
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Partie gauche */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#ff6b63",
            color: "white",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Gestion académique
          </Typography>
          <Typography sx={{ opacity: 0.8, textAlign: "center" }}>
            INFOMINDS, club d'informatique et de robotique pour des événements et
            des ateliers éducatifs.
          </Typography>
        </Box>

        {/* Partie droite */}
        <Box
          sx={{
            flex: 1.5,
            p: 5,
            backgroundColor: "#f5e9e6",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Bienvenue sur InfoMinds, connectez-vous pour continuer.
          </Typography>

          {/* Message d'erreur */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Message de succès */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mot de passe"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Link href="/inscription" variant="body2">
                Pas de compte ? S'inscrire
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
