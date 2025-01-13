import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "./VideoPlayback.css";

const VideoPlayback = () => {
  const { videoId } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    fetchVideoDetails();
    fetchRating();
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      const videoResponse = await api.get(`/videos/${videoId}/play`);
      setVideoUrl(videoResponse.data.url);

      const commentsResponse = await api.get(`/videos/${videoId}/comments`);
      setComments(commentsResponse.data);

      const ratingResponse = await api.get(`/videos/${videoId}/rate`);
      setRating(ratingResponse.data.averageRating || 0);
      setUserRating(ratingResponse.data.userRating || 0);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  const fetchRating = async () => {
    try {
      const ratingResponse = await api.get(`/videos/${videoId}/rate`);
      setRating(ratingResponse.data.averageRating || 0);
      setUserRating(ratingResponse.data.userRating || 0);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;

    try {
      const response = await api.post(`/videos/${videoId}/comments`, { comment: newComment });
      const newCommentData = response.data;
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleRateVideo = async (newRating) => {
    try {
      const response = await api.post(`/videos/${videoId}/rate`, { rating: newRating });
      setUserRating(newRating);
      setRating(response.data.averageRating);
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error rating video:", error);
    }
  };

  return (
    <div className="video-playback-container">
      <h1 className="video-title">Video Playback</h1>
      {videoUrl ? (
        <video controls autoPlay className="video-player">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="loading-message">Loading video...</p>
      )}
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p className="no-comments-message">No comments yet</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <strong>{comment.user?.username || "Anonymous"}:</strong> {comment.comment}
              </li>
            ))}
          </ul>
        )}
        <textarea
          className="comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="submit-comment-button" onClick={handleAddComment}>
          Submit
        </button>
      </div>
      <div className="rating-section">
        <h3>Rate this Video</h3>
        <p>Average Rating: {rating.toFixed(1)} / 5</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${userRating >= star ? "selected" : ""}`}
            onClick={() => handleRateVideo(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayback;
