import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmotionAnalysisPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [focusedRatio, setFocusedRatio] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sessionID = localStorage.getItem("sessionID");
  const updateInterval = localStorage.getItem("updateInterval") || 10; // Default to 10 min

  const fetchEmotions = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/analysis/emotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionID }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Update state with backend response
      setEmotions(data.emotions);
      setFocusedRatio(data.focused_ratio);

      // Use backend's alert message directly
      setAlerts(data.alert ? [data.alert] : []);

      console.log("✅ Emotion analysis updated:", data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Automatically analyze at the set interval
  useEffect(() => {
    fetchEmotions(); // Run once on load
    const interval = setInterval(fetchEmotions, updateInterval * 60 * 1000);

    return () => clearInterval(interval);
  }, [sessionID, updateInterval]);

  const handleEndSession = async () => {
    setError("");

    try {
      // Step 1: End the session and generate the report
      const response = await fetch(`http://localhost:5000/session/end/${sessionID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to end session");

      console.log("✅ Session ended:", data);

      // Step 2: Navigate to the report page
      navigate("/report");
    } catch (err) {
      setError(err.message);
    }
  };

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
      textAlign: "center",
    },
    header: { color: "#ffcc00" },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      padding: "10px 20px",
      marginTop: "20px",
      fontSize: "1.1rem",
      cursor: "pointer",
      borderRadius: "5px",
      width: "100%",
    },
    buttonHover: { backgroundColor: "#45a049" },
    analyzeNow: {
      backgroundColor: "#ff5722",
      marginTop: "10px",
    },
    emotions: { marginTop: "20px" },
    alert: {
      backgroundColor: "#ffeb3b",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    error: { color: "red", fontWeight: "bold" },
    focusedPercentage: { fontSize: "1.5rem", fontWeight: "bold", color: "red" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Emotion Analysis</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.emotions}>
        <h3>Emotion Data:</h3>
        {Object.entries(emotions).map(([emotion, count]) => (
          <div key={emotion} style={{ marginBottom: "5px" }}>
            <strong>{emotion.charAt(0).toUpperCase() + emotion.slice(1)}:</strong> {count}
          </div>
        ))}
        <p>
          <strong>Focused Students:</strong> 
          <span style={styles.focusedPercentage}>
            {focusedRatio !== null ? (100 - focusedRatio).toFixed(2) : "N/A"}%
          </span>
        </p>
      </div>

      {/* Display backend-generated alerts */}
      {alerts.length > 0 && (
        <div style={styles.alert}>
          <h3>Alerts:</h3>
          {alerts.map((alert, index) => <p key={index}>{alert}</p>)}
        </div>
      )}

      {/* Analyze Now Button */}
      <button
        style={{ ...styles.button, ...styles.analyzeNow }}
        onClick={fetchEmotions}
      >
        Analyze Now
      </button>

      {/* End Session Button */}
      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleEndSession}
      >
        End Session
      </button>
    </div>
  );
};

export default EmotionAnalysisPage;
