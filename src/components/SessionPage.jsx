import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionPage.css"; // ✅ Import CSS file

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

  return (
    <div className="session-container">
      <h2 className="session-header">Start a Session</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Lecture Title"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          className="session-input"
        />
        <input
          type="number"
          placeholder="Update Interval (minutes)"
          value={updateInterval}
          onChange={(e) => setUpdateInterval(e.target.value)}
          min="1"
          className="session-input"
        />
        <button className="session-button" onClick={handleStartSession}>
          Start Session
        </button>
      </div>
      {error && <p className="session-error">{error}</p>}
    </div>
  );
};

export default SessionPage;
