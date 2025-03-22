import React from 'react';
import './login.scss';

const Login = () => {
  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Patient-Clinician Portal</h1>
      </header>
      <div className="login-content">
        <div className="login-section">
          <h2>For Patients</h2>
          <p>Access your health records, communicate with your clinician, and manage your health.</p>
          <button className="login-button">Login</button>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
        <div className="login-section">
          <h2>For Clinicians</h2>
          <p>Manage patient records, communicate with patients, and provide better care.</p>
          <button className="login-button">Login with Email</button>
        </div>
      </div>
    </div>
  );
};

export default Login;