import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sessionID = localStorage.getItem("sessionID");

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

  // Styles
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#2d2d2d",
      color: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    header: { textAlign: "center", color: "#ffcc00", fontSize: "2rem" },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      padding: "15px 20px",
      marginTop: "20px",
      fontSize: "1.2rem",
      cursor: "pointer",
      borderRadius: "5px",
      width: "100%",
    },
    buttonHover: { backgroundColor: "#45a049" },
    reportSection: { marginBottom: "20px" },
    reportText: { marginBottom: "10px", whiteSpace: "pre-line", fontSize: "1.2rem" },
    paragraph: { fontSize: "1.2rem" },
    error: { color: "red", fontSize: "1.2rem", fontWeight: "bold" },
    smallText: { fontSize: "1rem" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Session Report</h2>

      {error ? (
        <p style={styles.error}>{error}</p>
      ) : reportData ? (
        <>
          <div style={styles.reportSection}>
            <h3>Report ID: {reportData.reportID}</h3>
            <p style={styles.paragraph}><strong>Generated At:</strong> {reportData.generatedAt}</p>
          </div>

          <div style={styles.reportSection}>
            <h3 style={styles.paragraph}>Suggestions:</h3>
            <p style={styles.reportText}>{reportData.suggestions}</p>
          </div>

          <div style={styles.reportSection}>
            <h3 style={styles.paragraph}>Summary:</h3>
            <p style={styles.paragraph}>{reportData.summary}</p>
          </div>

          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={handleBackToSession}
          >
            Back to Session
          </button>
        </>
      ) : (
        <p style={styles.smallText}>Loading report...</p>
      )}
    </div>
  );
};

export default ReportPage;
