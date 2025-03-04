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
      localStorage.setItem("updateInterval", updateInterval); // ✅ Save interval

      // Redirect to Emotion Analysis page
      navigate("/emotionanalysis");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Start a Session</h2>
      <input
        type="text"
        placeholder="Enter Lecture Title"
        value={lectureTitle}
        onChange={(e) => setLectureTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Update Interval (minutes)"
        value={updateInterval}
        onChange={(e) => setUpdateInterval(e.target.value)}
        min="1"
      />
      <button onClick={handleStartSession}>Start Session</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SessionPage;
