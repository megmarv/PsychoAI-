import React, { useState, useEffect } from "react";
import "./Reports.css"; // ✅ Import CSS file

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:5000/report/all");
      if (!response.ok) throw new Error("Failed to fetch reports");

      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reports-container">
      <h2 className="reports-heading">Reports</h2>

      {error && <p className="reports-error">{error}</p>}

      {reports.length === 0 ? (
        <p className="reports-no-reports">No reports available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Lecture Title</th>
                <th>Teacher</th>
                <th>Generated At</th>
                <th>Summary</th>
                <th>Suggestions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.lectureTitle}</td>
                  <td>{report.teacher}</td>
                  <td>{new Date(report.generatedAt).toLocaleString()}</td>
                  <td>{report.summary}</td>
                  <td>{report.suggestions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
