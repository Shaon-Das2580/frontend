import React, { useState, useEffect } from "react";
import api from "../api";
import "./VideoUpload.css";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState(""); // State to store user role

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await api.get("/auth/user-role"); // Replace with your API endpoint for fetching user role
      setRole(response.data.role);
    } catch (err) {
      console.error("Error fetching user role:", err);
    }
  };

  const handleUpload = async () => {
    if (role !== "creator") {
      setMessage("Consumers are not eligible for uploading videos.");
      return;
    }

    if (!title || !file) {
      setMessage("Title and file are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      setMessage("Failed to upload video.");
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Video</h1>
      {message && (
        <p
          className={`upload-message ${
            message.includes("success") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
      <input
        className="upload-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={role !== "creator"} // Disable input if user is not a creator
      />
      <textarea
        className="upload-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={role !== "creator"} // Disable textarea if user is not a creator
      />
      <input
        className="upload-file-input"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={role !== "creator"} // Disable file input if user is not a creator
      />
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={role !== "creator"} // Disable button if user is not a creator
      >
        Upload
      </button>

      {role !== "creator" && (
        <p className="warning-message">
          Note: Consumers are not eligible for uploading videos.
        </p>
      )}
    </div>
  );
};

export default VideoUpload;
