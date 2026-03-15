  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Dashboard from "./pages/client/Dashboard";
  import DashboardLogin from "./pages/client/DashboardLogin";
  import AttentionIndex from "./pages/client/AttentionIndex";

  // admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCompanyList from "./pages/admin/AdminCompanyList";
import AdminTermsManager from "./pages/admin/AdminTermsManager";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminUserManagement from "./pages/admin/AdminUserManagement";


  export default function App() {

    return (
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<AdminDashboard />} />

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


           {/* admin */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/AdminCompanyList"
          element={<AdminCompanyList />}
        />


        <Route
          path="/admin/terms"
          element={<AdminTermsManager />}
        />
          <Route
          path="/admin/AdminLogs"
          element={<AdminLogs />}
        />
          <Route
          path="/admin/AdminUserManagement"
          element={<AdminUserManagement />}
        />
        
        </Routes>

        

        

      </BrowserRouter>
    );
  }