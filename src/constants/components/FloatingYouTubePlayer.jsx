import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideTrailer } from "../../redux/slices/trailerSlice";
export const FloatingYouTubePlayer = ({ videoId }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(hideTrailer());
    }
  };
  const { showTrailer } = useSelector((state) => state.trailer);
  const dispatch = useDispatch();
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 9999,
      padding: "20px",
    },
    container: {
      position: "relative",
      width: "100%",
      maxWidth: "1000px",
    },
    videoWrapper: {
      position: "relative",
      width: "100%",
      paddingBottom: "56.25%", 
    },
    iframe: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "4px",
    },
    closeButton: {
      position: "absolute",
      top: "-16px",
      right: "-16px",
      backgroundColor: "white",
      border: "none",
      borderRadius: "50%",
      width: "32px",
      height: "32px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.container}>
        <div style={styles.videoWrapper}>
          <iframe
            style={styles.iframe}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <button
          onClick={() => dispatch(hideTrailer())}
          style={styles.closeButton}
        >
          ✖
        </button>
      </div>
    </div>
  );
};
