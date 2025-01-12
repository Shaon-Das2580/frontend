import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect the root route ("/") to the AuthPage */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* AuthPage for login and signup */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Add more routes here if needed */}
        {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
