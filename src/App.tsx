import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/client/Dashboard";
import LeadRegister from "./pages/client/LeadRegister";
import DashboardLogin from "./pages/client/DashboardLogin";
import AttentionIndex from "./pages/client/attentionIndex";


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route
          path="/lead"
          element={<LeadRegister />}
        />

        <Route
          path="/DashboardLogin"
          element={<DashboardLogin />}
        />

          <Route
          path="/AttentionIndex"
          element={<AttentionIndex />}
        />
      </Routes>

      

    </BrowserRouter>
  );
}