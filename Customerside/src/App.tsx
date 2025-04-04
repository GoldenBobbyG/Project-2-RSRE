import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RequestService from './pages/RequestService';
import ServiceHistory from './pages/ServiceHistory';
import ContactUs from './pages/ContactUs';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/request-service" element={<RequestService />} />
        <Route path="/service-history" element={<ServiceHistory />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;