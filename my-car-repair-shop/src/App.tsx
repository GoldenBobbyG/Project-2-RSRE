import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ScheduledMaintenance from './pages/ScheduledMaintenance';
import CurrentMaintenance from './pages/CurrentMaintenance';
import OrderParts from './pages/OrderParts';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scheduled-maintenance" element={<ScheduledMaintenance />} />
        <Route path="/current-maintenance" element={<CurrentMaintenance />} />
        <Route path="/order-parts" element={<OrderParts />} />
      </Routes>
    </Router>
  );
};

export default App;
