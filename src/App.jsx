import {BrowserRouter as Router ,Routes, Route, } from 'react-router-dom'
import Home from './page/Home';
import Receipt from './page/Receipt';
import Invoice from './page/Invoice';
import Pdf from './page/Pdf';
import Login from './page/Login';
import UserDashboard from './page/UserDashboard';
import Admin from './page/Admin';
import AdminUserDashboard from './page/AdminUserDashboard';
import UserLicense from './page/UserLicense';
import PaymentSuccess from './page/PaymentSuccess';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/receipt/:id" element={<Receipt />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/user-dashboard/:id" element={<UserDashboard />} />
        <Route
          path="/admin-user-dashboard/:id"
          element={<AdminUserDashboard />}
        />
        <Route
          path="/payment-successfull"
          element={<PaymentSuccess />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user-license/:id" element={<UserLicense />} />
      </Routes>
    </Router>
  );
}

export default App
