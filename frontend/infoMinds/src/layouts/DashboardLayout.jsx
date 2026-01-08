import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <header
        style={{
          backgroundColor: "#ff6b63",
          color: "white",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <h1>InfoMinds - Gestion des eleves</h1>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
