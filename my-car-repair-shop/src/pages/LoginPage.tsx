import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <h1>BootCampAuto</h1>
          <div className="logo-underline" />
        </div>
        
        <h2>Welcome to BootCampAuto Management System</h2>
        <p>Please select your account type to continue</p>
        
        <div className="login-buttons">
          <button className="login-button employee-button" onClick={() => navigate('/employee')}>
            <span className="button-icon">👨‍🔧</span>Employee
          </button>
          <button className="login-button customer-button" onClick={() => navigate('/customer')}>
            <span className="button-icon">👤</span>Customer
          </button>
        </div>

        <div className="login-footer">
          <p>© 2025 BootCampAuto. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;