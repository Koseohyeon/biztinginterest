import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/client/Dashboard";
import DashboardLogin from "./pages/client/DashboardLogin";
import AttentionIndex from "./pages/client/AttentionIndex";
import ParticipationPage from "./pages/client/ParticipationPage"

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<AttentionIndex />} />

        <Route
          path="/Dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/DashboardLogin"
          element={<DashboardLogin />}
        />

          <Route
          path="/AttentionIndex"
          element={<AttentionIndex />}
        />

          <Route
          path="/ParticipationPage"
          element={<ParticipationPage />}
        />
      </Routes>

      

    </BrowserRouter>
  );
}