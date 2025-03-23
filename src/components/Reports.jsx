import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports(); // Fetch reports when component loads
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/report/all');
      if (!response.ok) throw new Error('Failed to fetch reports');

      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reports</h2>

      {error && <p style={styles.error}>{error}</p>}

      {reports.length === 0 ? (
        <p style={styles.noReports}>No reports available.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Report ID</th>
                <th style={styles.th}>Session ID</th>
                <th style={styles.th}>Generated At</th>
                <th style={styles.th}>Summary</th>
                <th style={styles.th}>Suggestions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.reportID}>
                  <td style={styles.td}>{report.reportID}</td>
                  <td style={styles.td}>{report.sessionID}</td>
                  <td style={styles.td}>{new Date(report.generatedAt).toLocaleString()}</td>
                  <td style={styles.td}>{report.summary}</td>
                  <td style={styles.td}>{report.suggestions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4', // Same background color as the outer theme
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Slight shadow for a modern touch
    maxWidth: '1200px',
    margin: 'auto',
  },
  heading: {
    textAlign: 'center',
    color: '#2d3b4e', // Darker text for readability
    marginBottom: '20px',
  },
  tableWrapper: {
    maxHeight: '400px', // Max height for scrollable content
    overflowY: 'auto', // Enables vertical scrolling
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#ffffff', // White table background for contrast
    borderRadius: '8px',
    overflow: 'hidden', // Prevents overflow
  },
  th: {
    padding: '12px',
    backgroundColor: '#2d3b4e',
    color: 'white',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noReports: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '20px',
  },
};

export default Reports;
