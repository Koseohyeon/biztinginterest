import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/client/Dashboard";
import DashboardLogin from "./pages/client/DashboardLogin";
import AttentionIndex from "./pages/client/AttentionIndex";


export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

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
      </Routes>

      

    </BrowserRouter>
  );
}