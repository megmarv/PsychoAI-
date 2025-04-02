// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="admin-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>AI For Education</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: pschoai@admin.com</li>
            <li>Phone: (071) 852-3418</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PsychoAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;