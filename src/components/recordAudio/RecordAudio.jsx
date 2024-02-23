// RecordAudio.js
import React from "react";
import "./RecordAudio.css";
import AudioRecorder from "./AudioRecorder";

const RecordAudio = ({ onClose, onSaveAudio }) => {
  return (
    <div className="recordaudio-container">
      <div className="recordaudio">
        <h2>Audio Recorder</h2>
        <AudioRecorder onSaveAudio={onSaveAudio} />
        <button
          style={{
            fontFamily:
              "PlusJakartaSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Cantarell, Helvetica Neue, Ubuntu, sans-serif",
            fontSize: "1rem",
            marginTop: "10px",
            alignItems: "center",
            height: "25px",
            borderRadius: "0.4rem",
            fontWeight: "600",
            padding: "0 1.2rem",
            color: "#ddd",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0.5rem 1rem rgba(143, 142, 142, 0.15) !important",
            background: "#000000",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RecordAudio;
