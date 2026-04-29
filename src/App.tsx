
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
import NPassPrivacyPolicy2 from "./privacy/NPassPrivacyPolicy1.1";
import PrivacyV11Document2 from "./privacy/PrivacyV11Document1.1";
import ClauseStaticDocument from "./privacy/ClauseStaticDocument";
//Latte
import LatteEventPage from"./pages/client/LatteEventPage"

  export default function App() {
  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<NPassPrivacyPolicy2 />} />
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

        {/* Latte */}
        <Route path="/moment/LatteEventPage" element={<LatteEventPage />} />

        {/*보안*/}
          <Route path="/pricacy/npassprivacypolicy" element={<NPassPrivacyPolicy />} />
          <Route path="/pricacy/NPassPrivacyPolicy2" element={<NPassPrivacyPolicy2 />} />
          <Route path="/pricacy/PrivacyV11Document2" element={<PrivacyV11Document2 />} />
          <Route path="/pricacy/ClauseStaticDocument" element={<ClauseStaticDocument />} />
      </Routes>
    </HashRouter>
  );
}