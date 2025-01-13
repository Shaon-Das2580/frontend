import React, { useState } from "react";
import api from "../api";
import "./VideoUpload.css";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
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
      console.error("Upload error:", err);
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
      />
      <textarea
        className="upload-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="upload-file-input"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default VideoUpload;
