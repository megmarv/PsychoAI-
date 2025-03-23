import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';  // ✅ Import the new Navbar
import UserInfo from './UserInfo';
import Reports from './Reports';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar /> {/* ✅ Includes a reusable navigation bar */}

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<h2>Welcome to Admin Dashboard</h2>} />
          <Route path="userinfo" element={<UserInfo />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  }
};

export default AdminDashboard;
