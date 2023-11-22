// UploadAudio.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../contexts/fileContext.jsx";
import AudioWaveform from "./AudioWaveform"; // Import your AudioWaveform component
import "../index.css";

const UploadAudio = () => {
  const inputFile = useRef(null);
  const { fileURL, setFileURL } = useContext(FileContext);
  const [file, setFile] = useState(null);
  const [showAudioWaveform, setShowAudioWaveform] = useState(false);

  useEffect(() => {
    if (file) {
      setFileURL(file);
      setShowAudioWaveform(true);
    }
  }, [file, setFileURL]);

  const handleButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileUpload = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleDelete = () => {
    // Reset the fileURL and hide the AudioWaveform
    setFile(null);
    setShowAudioWaveform(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {showAudioWaveform ? (
        <AudioWaveform />
      ) : (
        <>
          <i style={{ color: "#531A65" }} className="material-icons audio-icon">
            library_music
          </i>
          <h1>Upload your audio file here</h1>
          <button className="upload-btn" onClick={handleButtonClick}>
            Upload
          </button>
          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
            accept="audio/*"
            onChange={handleFileUpload}
          />
        </>
      )}
       {showAudioWaveform && (
        <button
        title="delete"
        className="controls"
        onClick={handleDelete}
      >
        <i className="material-icons">delete</i> 
        
      </button>
      )}
    </div>
  );
};

export default UploadAudio;
