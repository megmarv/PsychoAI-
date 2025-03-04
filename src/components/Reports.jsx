import React, { useState } from 'react';

const Reports = () => {
  // Dummy report data updated to reflect the new structure
  const [reports] = useState([
    {
      reportID: 1,
      sessionID: 1,
      generatedAt: 'Sat, 01 Mar 2025 14:49:36 GMT',
      suggestions: 'Focus improvement suggestions made during session:\nNo alerts issued',
      summary: 'Session engagement analysis: The average focus ratio was 63.27%.',
    },
    {
      reportID: 2,
      sessionID: 2,
      generatedAt: 'Sun, 02 Mar 2025 14:49:36 GMT',
      suggestions: 'Focus improvement suggestions made during session:\nIncrease breaks to boost engagement.',
      summary: 'Session engagement analysis: The average focus ratio was 58.12%.',
    },
    {
      reportID: 3,
      sessionID: 3,
      generatedAt: 'Mon, 03 Mar 2025 14:49:36 GMT',
      suggestions: 'Focus improvement suggestions made during session:\nInteractive Q&A to enhance focus.',
      summary: 'Session engagement analysis: The average focus ratio was 72.89%.',
    },
  ]);

  return (
    <div style={styles.container}>
      <h2>Reports</h2>
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
              <td style={styles.td}>{report.generatedAt}</td>
              <td style={styles.td}>{report.summary}</td>
              <td style={styles.td}>{report.suggestions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    padding: '10px',
    backgroundColor: '#2d3b4e',
    color: 'white',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  }
};

export default Reports;
