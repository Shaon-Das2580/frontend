import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./VideoListing.css";

const VideoListing = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to fetch all videos
  const fetchVideos = useCallback(async () => {
    try {
      const response = await api.get("/videos");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }, []);

  // Function to handle video search
  const handleSearch = useCallback(async () => {
    try {
      const response = await api.get(`/videos/search?q=${searchQuery}`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error searching videos:", error);
    }
  }, [searchQuery]);

  // useEffect for handling search or fetching videos
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        fetchVideos();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, handleSearch, fetchVideos]);

  // Handle video click
  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  return (
    <div className="video-listing-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <ul className="video-list">
        {videos.map((video) => (
          <li
            key={video.id}
            onClick={() => handleVideoClick(video.id)}
            className="video-item"
          >
            <h2 className="video-title">{video.title}</h2>
            <p className="video-description">{video.description}</p>
          </li>
        ))}
        {videos.length === 0 && (
          <p className="no-videos-message">No videos found.</p>
        )}
      </ul>
    </div>
  );
};

export default VideoListing;
