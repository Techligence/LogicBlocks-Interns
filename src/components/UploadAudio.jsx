// UploadAudio.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../contexts/fileContext.jsx";
import AudioWaveform from "./AudioWaveform"; // Import your AudioWaveform component

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
    </div>
  );
};

export default UploadAudio;
