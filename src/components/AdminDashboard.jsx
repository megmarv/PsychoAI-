import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import UserInfo from './UserInfo';
import Reports from './Reports';
import CheersGif from './dashpic.gif';
import Footer from './Footer'; // Add Footer import
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
                <h1>Welcome to Admin Dashboard</h1>
                <img src={CheersGif} alt="Celebration" className="admin-panel-gif" />
              </div>
            } 
          />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
      
      <Footer /> {/* Added Footer component */}
    </div>
  );
};

export default AdminDashboard;