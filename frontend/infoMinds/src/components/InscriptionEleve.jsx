import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Alert,
} from "@mui/material";
import { eleveService } from "../services/eleveService";

const InscriptionEleve = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await eleveService.inscrireEleve(formData);
      setMessage(result.message);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        role: "",
      });
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ display: "flex", borderRadius: 3, overflow: "hidden" }}>
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
            INFOMINDS, club d'informatique et de robotique pour des événements et des ateliers éducatifs.
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
            Bienvenue à mes élèves et à mes administrateurs, rejoignez notre équipe.
          </Typography>

          {message && (
            <Alert
              severity={message.includes("Erreur") ? "error" : "success"}
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Mot de passe"
              name="motDePasse"
              type="password"
              value={formData.motDePasse}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Rôle"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
            >
              <MenuItem value="">-- Choisir un rôle --</MenuItem>
              <MenuItem value="eleve">Élève</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default InscriptionEleve;
