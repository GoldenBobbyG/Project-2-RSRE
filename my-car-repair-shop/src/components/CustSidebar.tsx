import React from 'react';
import { Link } from 'react-router-dom';
import './CustSidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-dashboard">
        <Link to="/customer" className="sidebar-link">
          Dashboard
        </Link>
      </div>
      <div className="sidebar-menu">
        <Link to="/customer/request-service" className="sidebar-link">
          Request Service
        </Link>
        <Link to="/customer/service-history" className="sidebar-link">
          Service History
        </Link>
        <Link to="/customer/contact-us" className="sidebar-link">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
