import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import UserInfo from './UserInfo';
import Reports from './Reports';
import CheersGif from './dashpic.gif';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-panel">
      <AdminNavbar />

      <div className="admin-panel-content">
        <Routes>
          {/* ✅ Show GIF only on the main dashboard page */}
          <Route 
            path="/" 
            element={
              <div className="admin-home">
                <h2>Welcome to Admin Dashboard</h2>
                <img src={CheersGif} alt="Celebration" className="admin-panel-gif" />
              </div>
            } 
          />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
