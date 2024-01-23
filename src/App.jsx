import {BrowserRouter as Router ,Routes, Route, } from 'react-router-dom'
import Home from './page/Home';
import Receipt from './page/Receipt';
import Invoice from './page/Invoice';
import Pdf from './page/Pdf';
import Login from './page/Login';
import UserDashboard from './page/UserDashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App
