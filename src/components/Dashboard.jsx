import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Dashboard.css';

// import Analytics from './Analytics';  // Example component
// import Conversations from './Conversations';  // Example component
// import CustomerProfiling from './CustomerProfiling';  // Example component
// import Channels from './Channels';  // Example component
// import Queues from './Queues';  // Example component

const Dashboard = () => {
  return (
    <Router>
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>SOCIALYST</h2>
          </div>
          <ul className="menu">
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/analytics" className="menu-link">
                <i className="fas fa-chart-bar"></i> Analytics
              </Link>
            </li>
            
            <div className="menu-section">Conversations</div>
            <li className="menu-item">
              <Link to="/conversations" className="menu-link">
                <i className="fas fa-comments"></i> Conversations
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/customer-profiling" className="menu-link">
                <i className="fas fa-user-circle"></i> Customer Profiling
              </Link>
            </li>

            <div className="menu-section">Settings</div>
            <li className="menu-item">
              <Link to="/channels" className="menu-link">
                <i className="fas fa-cogs"></i> Channels
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/queues" className="menu-link">
                <i className="fas fa-align-left"></i> Queues
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="header">
            <h2>Sales Stat</h2>
            <div className="user-profile">
              <span className="user-name">Hi, Rahman Abdul</span>
              <div className="user-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>

          <div className="content-placeholder">
            <Routes>
              <Route path="/" element={<h3>Dashboard Overview</h3>} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/customer-profiling" element={<CustomerProfiling />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/queues" element={<Queues />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
