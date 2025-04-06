import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Logo on the left */}
      <div style={styles.logoContainer}>
        <img src={require("../Logo/Psycho-AI.png")} alt="Logo" style={styles.logo} />
      </div>

      {/* Navigation links on the right */}
      <div style={styles.navLinks}>
        <Link to="/admin" style={styles.navLink} className="nav-hover">Admin Dashboard</Link>
        <Link to="/admin/userinfo" style={styles.navLink} className="nav-hover">User Info</Link>
        <Link to="/admin/reports" style={styles.navLink} className="nav-hover">Reports</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#000", // Black navbar
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "white",
    zIndex: 1000,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px",
    width: "auto",
  },
  navLinks: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly", // Spreads out the words more
    maxWidth: "60%", // Allows more space for links
    width: "100%",
    gap: "25px", // Increased spacing between links
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.1rem", // Slightly increased size for better spacing
    fontWeight: "bold",
    position: "relative",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingBottom: "5px",
    transition: "color 0.3s ease-in-out",
  },
};

// Inject global styles for hover effect
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .nav-hover::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 0;
    height: 3px;
    background: white;
    transition: all 0.3s ease-in-out;
    transform: translateX(-50%);
  }
  .nav-hover:hover::after {
    width: 100%;
  }
  .nav-hover:hover {
    color: #ddd;
  }
  
  @media (max-width: 768px) {
    .nav-hover {
      font-size: 1rem;
    }
    .navLinks {
      max-width: 100%; /* Ensure links fit on smaller screens */
      justify-content: center;
    }
  }
`;
document.head.appendChild(styleTag);

export default AdminNavbar;
