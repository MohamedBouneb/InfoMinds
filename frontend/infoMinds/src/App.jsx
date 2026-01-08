import { Routes, Route, Navigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import InscriptionEleve from "./components/InscriptionEleve";
import Home from "./components/Home";
import ListeEleves from "./components/ListeEleves";
import ListeEvents from "./components/ListeEvents";
import PrivateRoute from "./components/routes/PrivateRoute"; 
//import AdminRoute from "./components/AdminRoute"; 
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>

      {/* AVANT connexion */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/inscription" element={<InscriptionEleve />} />
      </Route>

      {/* PRÈS connexion */}
      <Route element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route path="/home" element={<Home />} />
        <Route path="/eleves" element={<ListeEleves />} />
        <Route path="/events" element={<ListeEvents />} />
      </Route>

    </Routes>
  );
}

export default App;
