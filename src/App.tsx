import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/client/Dashboard";
import LeadRegister from "./pages/client/LeadRegister";

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route
          path="/lead"
          element={<LeadRegister />}
        />

      </Routes>

    </BrowserRouter>
  );
}