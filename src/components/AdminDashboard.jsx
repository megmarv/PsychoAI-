import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import UserInfo from './UserInfo';
import Reports from './Reports';

const AdminDashboard = () => {
  return (
    <div>
      <nav style={styles.navbar}>
        <Link to="/admin" style={styles.navLink}>Admin Dashboard</Link>
        <Link to="/admin/userinfo" style={styles.navLink}>User Info</Link>
        <Link to="/admin/reports" style={styles.navLink}>Reports</Link>
      </nav>

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
  navbar: {
    backgroundColor: '#2d3b4e',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
  },
  navLink: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1.2rem',
  },
  container: {
    padding: '20px',
  }
};

export default AdminDashboard;
