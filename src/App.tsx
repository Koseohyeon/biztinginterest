
  import { HashRouter, Routes, Route } from "react-router-dom";
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
import KakaoMomentTermsModal from"./pages/moment/KakaoMomentTermsModal"

//privacy
import NPassPrivacyPolicy from"./privacy/NPassPrivacyPolicy"

  export default function App() {
  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<KakaoMomentTermsModal />} />
        <Route path="*" element={<AttentionIndex />} />

        <Route path="/MomentIndex" element={<MomentIndex />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/DashboardLogin" element={<DashboardLogin />} />
        <Route path="/AttentionIndex" element={<AttentionIndex />} />

        {/* admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/company" element={<AdminCompanyList />} />
        <Route path="/admin/terms" element={<AdminTermsManager />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />

        {/* moment */}
        <Route path="/moment/description" element={<MomentDescription />} />
        <Route path="/moment/KMTermsModal" element={<KakaoMomentTermsModal />} />

        {/*보안*/}
          <Route path="/pricacy/npassprivacypolicy" element={<NPassPrivacyPolicy />} />

      </Routes>
    </HashRouter>
  );
}