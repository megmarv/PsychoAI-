import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SessionPage = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [updateInterval, setUpdateInterval] = useState(10);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStartSession = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ lectureTitle, updateInterval }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      console.log("✅ Session Started:", data);

      // Save session ID & update interval in localStorage for later use
      localStorage.setItem("sessionID", data.sessionID);
      localStorage.setItem("updateInterval", updateInterval);

      // Redirect to Emotion Analysis page
      navigate("/emotionanalysis");
    } catch (err) {
      setError(err.message);
    }
  };

  // Styles (Updated for Centered Inputs)
  const styles = {
    sessionContainer: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ecf0f1",
      color: "#2d3b4e",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Helvetica Neue', sans-serif",
      textAlign: "center",
    },
    sessionHeader: { fontSize: "2rem", color: "#2980b9", fontWeight: "600", marginBottom: "20px" },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    sessionInput: {
      width: "80%", // Set width to make inputs centered
      padding: "12px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #bdc3c7",
      fontSize: "1rem",
      textAlign: "center",
    },
    sessionButton: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "12px 20px",
      marginTop: "20px",
      fontSize: "1.2rem",
      cursor: "pointer",
      borderRadius: "5px",
      width: "85%",
      fontWeight: "bold",
    },
    sessionButtonHover: { backgroundColor: "#2980b9" },
    sessionError: { color: "#e74c3c", fontSize: "1rem", fontWeight: "bold" },
  };

  return (
    <div style={styles.sessionContainer}>
      <h2 style={styles.sessionHeader}>Start a Session</h2>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Enter Lecture Title"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          style={styles.sessionInput}
        />
        <input
          type="number"
          placeholder="Update Interval (minutes)"
          value={updateInterval}
          onChange={(e) => setUpdateInterval(e.target.value)}
          min="1"
          style={styles.sessionInput}
        />
        <button
          style={styles.sessionButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.sessionButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.sessionButton.backgroundColor)}
          onClick={handleStartSession}
        >
          Start Session
        </button>
      </div>
      {error && <p style={styles.sessionError}>{error}</p>}
    </div>
  );
};

export default SessionPage;
