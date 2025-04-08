import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Login Page
import LoginPage from './pages/LoginPage';

// Customer Pages
import CustDashboard from './pages/CustDashboard';
import RequestService from './pages/RequestService';
import ServiceHistory from './pages/ServiceHistory';
import ContactUs from './pages/ContactUs';

// Employee Pages
import EmpDashboard from './pages/Dashboard';
import ScheduledMaintenance from './pages/ScheduledMaintenance';
import CurrentMaintenance from './pages/CurrentMaintenance';
import OrderParts from './pages/OrderParts';
import Records from './pages/Records';  // Now this will be used
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route (Root Path) now points to the LoginPage */}
        <Route path="/" element={<LoginPage />} />

        {/* Customer Routes */}
        <Route path="/customer" element={<CustDashboard />} />
        <Route path="/customer/request-service" element={<RequestService />} />
        <Route path="/customer/service-history" element={<ServiceHistory />} />
        <Route path="/customer/contact-us" element={<ContactUs />} />

        {/* Employee Routes */}
        <Route path="/employee" element={<EmpDashboard />} />
        <Route path="/employee/scheduled-maintenance" element={<ScheduledMaintenance />} />
        <Route path="/employee/current-maintenance" element={<CurrentMaintenance />} />
        <Route path="/employee/order-parts" element={<OrderParts />} />
        {/* Add Records route */}
        <Route path="/employee/records" element={<Records />} />
      </Routes>
    </Router>
  );
};

export default App;