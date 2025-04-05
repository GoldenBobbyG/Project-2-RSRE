import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard: React.FC = () => (
  <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <h1>Dashboard</h1>
      <p>Welcome to BootCampAuto Management System</p>

      <div className="info-card">
        <div className="card-header">
          <h2>Our Mission</h2>
          <div className="decorative-line" />
        </div>
        <p className="mission-statement">
          "As a BootCampAuto Employee, we empower you with cutting-edge tools to deliver exceptional automotive services, 
          combining technical expertise with customer-focused solutions for seamless workshop operations."
        </p>
      </div>

      <div className="info-card">
        <div className="card-header">
          <h2>System Features</h2>
          <div className="decorative-line" />
        </div>
        <div className="features-grid">
          <Link to="/employee/scheduled-maintenance" className="feature-item" style={{ textDecoration: 'none' }}>
            <span className="feature-icon">📅</span>
            <h3>Scheduled Maintenance</h3>
            <p>Manage and track upcoming vehicle service appointments</p>
          </Link>
          <Link to="/employee/current-maintenance" className="feature-item" style={{ textDecoration: 'none' }}>
            <span className="feature-icon">🔧</span>
            <h3>Current Work</h3>
            <p>Monitor ongoing repairs and technician assignments</p>
          </Link>
          <Link to="/employee/order-parts" className="feature-item" style={{ textDecoration: 'none' }}>
            <span className="feature-icon">📦</span>
            <h3>Parts Management</h3>
            <p>Order essential parts</p>
          </Link>
          <Link to="/employee/records" className="feature-item" style={{ textDecoration: 'none' }}>
            <span className="feature-icon">📊</span>
            <h3>Records</h3>
            <p>Access vehicle service history and documentation</p>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;