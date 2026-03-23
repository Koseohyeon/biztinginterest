
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

//moment pages
import MomentIndex from "./pages/moment/MomentIndex"
import MomentDescription from "./pages/moment/MomentDescription"

  export default function App() {

    return (
      <BrowserRouter>

        <Routes>

        <Route path="/" element={<AttentionIndex />} />

        <Route
          path="/MomentIndex"
          element={<MomentIndex />}
        />
        <Route
          path="/Dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/DashboardLogin"
          element={<DashboardLogin />}
        />

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
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/company"
          element={<AdminCompanyList />}
        />


        <Route
          path="/admin/terms"
          element={<AdminTermsManager />}
        />
          <Route
          path="/admin/logs"
          element={<AdminLogs />}
        />
          <Route
          path="/admin/users"
          element={<AdminUserManagement />}
        />
        
        {/*모먼트  */}
         <Route
          path="/moment/description"
          element={<MomentDescription />}
        />

        </Routes>
      </BrowserRouter>
    );
  }