import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/CustSidebar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Customer Dashboard</h1>
        <p className="dashboard-subtitle">Welcome to BootCampAuto Customer Portal</p>

        {/* Welcome Card - Unchanged */}
        <div className="info-card">
          <div className="card-header">
            <h2>Welcome</h2>
            <div className="decorative-line"></div>
          </div>
          <p className="mission-statement">
            "At BootCampAuto, we're committed to providing transparent, high-quality automotive services. 
            This portal gives you full control over your vehicle maintenance needs with easy scheduling, 
            real-time updates, and complete service history at your fingertips."
          </p>
        </div>

        {/* System Overview - Modified */}
        <div className="info-card">
          <div className="card-header">
            <h2>Portal Features</h2>
            <div className="decorative-line"></div>
          </div>
          <div className="features-grid">
            <div 
              className="feature-item" 
              onClick={() => navigate('/customer/request-service')}
              style={{ cursor: 'pointer' }}
            >
              <span className="feature-icon">🔧</span>
              <h3>Request Service</h3>
              <p>Schedule maintenance or repairs for your vehicle at your convenience</p>
            </div>
            
            <div 
              className="feature-item"
              onClick={() => navigate('/customer/service-history')}
              style={{ cursor: 'pointer' }}
            >
              <span className="feature-icon">📋</span>
              <h3>Service History</h3>
              <p>View complete records of past services and maintenance</p>
            </div>
            
            <div 
              className="feature-item"
              onClick={() => navigate('/customer/contact-us')}
              style={{ cursor: 'pointer' }}
            >
              <span className="feature-icon">📞</span>
              <h3>Contact Us</h3>
              <p>Reach our support team with questions or special requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;