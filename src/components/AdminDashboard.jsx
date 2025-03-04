import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';  // Make sure you import Routes and Route
import LecturerInfo from './LecturerInfo';
import Reports from './Reports';

const AdminDashboard = () => {
  return (
    <div>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.navLink}>Admin Dashboard</Link>
        <Link to="/lecturer-info" style={styles.navLink}>Lecturer Info</Link>
        <Link to="/reports" style={styles.navLink}>Reports</Link>
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/lecturer-info" element={<LecturerInfo />} />
          <Route path="/reports" element={<Reports />} />
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
