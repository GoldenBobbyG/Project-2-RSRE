import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-dashboard">
        <Link to="/" className="sidebar-link">
          Dashboard
        </Link>
      </div>
      <div className="sidebar-menu">
        <Link to="/request-service" className="sidebar-link">
          Request Service
        </Link>
        <Link to="/service-history" className="sidebar-link">
          Service History
        </Link>
        <Link to="/contact-us" className="sidebar-link">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;