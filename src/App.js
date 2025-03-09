import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SessionPage from "./components/SessionPage";
import EmotionAnalysisPage from "./components/EmotionAnalysis";
import ReportPage from "./components/ReportPage";
import AdminDashboard from "./components/AdminDashboard"; // ✅ Load Admin Dashboard
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/session" element={<ProtectedRoute component={SessionPage} />} />
        <Route path="/emotionanalysis" element={<ProtectedRoute component={EmotionAnalysisPage} />} />
        <Route path="/report" element={<ProtectedRoute component={ReportPage} />} />

        {/* Admin Route - Show Admin Dashboard */}
        <Route path="/admin/*" element={<ProtectedRoute component={AdminDashboard} role="admin" />} />

        {/* Default Route - Redirect to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
