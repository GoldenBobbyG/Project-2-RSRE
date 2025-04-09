
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [authType, setAuthType] = useState('');
  const [creds, setCreds] = useState({ username: '', password: '' });
  const handleLogin = (type: string) => {
    if (authType !== type) {
      setAuthType(type);
      return;
    }
    console.log(`${type} login:`, creds);
    navigate(`/${type}`);
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <h1>BootCampAuto</h1>
          <div className="logo-underline" />
        </div>
        <h2>Welcome to BootCampAuto Management System</h2>
        <p>Please select your account type to continue</p>
        <div className="login-form">
          {authType && (
            <div className="auth-fields">
              <input
                placeholder="Username"
                onChange={e => setCreds(p => ({ ...p, username: e.target.value }))}
                className="auth-input"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={e => setCreds(p => ({ ...p, password: e.target.value }))}
                className="auth-input"
              />
            </div>
          )}
          <div className="login-buttons">
            {['employee', 'customer'].map((type) => (
              <button
                key={type}
                className={`login-button ${type}-button`}
                onClick={() => handleLogin(type)}
              >
                <span className="button-icon">
                  {type === 'employee' ? ':male-mechanic:' : ':bust_in_silhouette:'}
                </span>
                {authType === type ? `Login as ${type}` : type}
              </button>
            ))}
          </div>
        </div>
        <div className="login-footer">
          <p>© 2025 BootCampAuto. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

