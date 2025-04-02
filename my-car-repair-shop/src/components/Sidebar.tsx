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
        <Link to="/scheduled-maintenance" className="sidebar-link">
          Scheduled Maintenance
        </Link>
        <Link to="/current-maintenance" className="sidebar-link">
          Current Maintenance
        </Link>
        <Link to="/order-parts" className="sidebar-link">
          Order Parts
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
