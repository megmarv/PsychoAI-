import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sessionID = localStorage.getItem("sessionID");

  // Fetch report data from the backend API
  const fetchReportData = async () => {
    setError("");
    try {
      const response = await fetch(`http://localhost:5000/report/get/${sessionID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch report");

      setReportData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (sessionID) fetchReportData();
  }, [sessionID]);

  const handleBackToSession = () => navigate("/session");

  // Styles with unique names
  const styles = {
    reportContainer: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ecf0f1", // Light background
      color: "#2d3b4e", // Darker text for contrast
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Helvetica Neue', sans-serif",
    },
    reportHeader: { textAlign: "center", color: "#2980b9", fontSize: "2.2rem", fontWeight: "600" },
    reportButton: {
      backgroundColor: "#3498db", // Blue color
      color: "white",
      border: "none",
      padding: "12px 20px",
      marginTop: "20px",
      fontSize: "1.2rem",
      cursor: "pointer",
      borderRadius: "5px",
      width: "100%",
      fontWeight: "bold",
    },
    reportButtonHover: { backgroundColor: "#2980b9" },
    reportSection: { marginBottom: "20px" },
    reportText: { marginBottom: "10px", whiteSpace: "pre-line", fontSize: "1.2rem" },
    reportParagraph: { fontSize: "1.2rem" },
    reportError: { color: "#e74c3c", fontSize: "1.2rem", fontWeight: "bold" },
    reportSmallText: { fontSize: "1rem", color: "#7f8c8d" },
    reportSubHeader: { fontSize: "1.5rem", color: "#34495e", marginBottom: "10px" },
  };

  return (
    <div style={styles.reportContainer}>
      <h2 style={styles.reportHeader}>Session Report</h2>

      {error ? (
        <p style={styles.reportError}>{error}</p>
      ) : reportData ? (
        <>
          <div style={styles.reportSection}>
            <h3 style={styles.reportSubHeader}>Report ID: {reportData.reportID}</h3>
            <p style={styles.reportParagraph}>
              <strong>Generated At:</strong> {new Date(reportData.generatedAt).toLocaleString()}
            </p>
          </div>

          <div style={styles.reportSection}>
            <h3 style={styles.reportSubHeader}>Suggestions:</h3>
            <p style={styles.reportText}>{reportData.suggestions}</p>
          </div>

          <div style={styles.reportSection}>
            <h3 style={styles.reportSubHeader}>Summary:</h3>
            <p style={styles.reportParagraph}>{reportData.summary}</p>
          </div>

          <button
            style={styles.reportButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.reportButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.reportButton.backgroundColor)}
            onClick={handleBackToSession}
          >
            Back to Session
          </button>
        </>
      ) : (
        <p style={styles.reportSmallText}>Loading report...</p>
      )}
    </div>
  );
};

export default ReportPage;
