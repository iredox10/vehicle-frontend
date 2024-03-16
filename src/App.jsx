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
import TestInvoice from './page/TestInvoice';
import WebhookUser from './page/WebhookUser';
import CompleteReg from './page/CompleteReg';
import WebhookReceipt from './page/WebhookReceipt';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complete-reg/:id" element={<CompleteReg />} />
        <Route path="/test" element={<TestInvoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/receipt/:id" element={<Receipt />} />
        <Route path="/webhook-receipt/:id" element={<WebhookReceipt />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        {/* <Route path="/invoice" element={<TestInvoice />} /> */}
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/user-dashboard/:id" element={<UserDashboard />} />
        <Route path="/webhook-user-dashboard/:id" element={<WebhookUser />} />
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
