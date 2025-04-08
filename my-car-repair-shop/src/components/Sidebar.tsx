import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-dashboard">
        <Link to="/employee" className="sidebar-link">
          Dashboard
        </Link>
      </div>
      <div className="sidebar-menu">
        <Link to="/employee/scheduled-maintenance" className="sidebar-link">
          Scheduled Maintenance
        </Link>
        <Link to="/employee/current-maintenance" className="sidebar-link">
          Current Maintenance
        </Link>
        <Link to="/employee/order-parts" className="sidebar-link">
          Order Parts
        </Link>
        {/* New Records Link */}
        <Link to="/employee/records" className="sidebar-link">
          Maintenance Records
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;