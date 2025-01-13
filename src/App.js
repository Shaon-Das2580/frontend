import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Navbar from "./components/Navbar";
import VideoListing from "./components/VideoListing";
import VideoPlayback from "./components/VideoPlayback";
import VideoUpload from "./components/VideoUpload";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/videos" element={<VideoListing />} />
        <Route path="/videos/:videoId" element={<VideoPlayback />} />
        <Route path="/upload" element={<VideoUpload />} />
      </Routes>
    </Router>
  );
};

export default App;
