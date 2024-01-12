// UploadAudio.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../contexts/fileContext.jsx";
import AudioWaveform from "./AudioWaveform.jsx"; // Import your AudioWaveform component
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setAudioState } from "../state/reducers/soundTabReducers.js";
import { setIsPlaying } from "../state/reducers/audioSlice.js";
import RecordAudio from "./recordAudio/RecordAudio.jsx";


const UploadAudio = () => {
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const { fileURL, setFileURL } = useContext(FileContext);
  const [file, setFile] = useState(null);
  const audioState = useSelector((state) => state.soundTab.audioState);
  const { showAudioWaveform, showDefaultAudioWaveform, fileName } = audioState;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  //For rendering default music
  useEffect(() => {    
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [])

  useEffect(() => {
    if (file) {
      setFileURL(file);      
    }
  }, [file, setFileURL]);

  const handleButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileUpload = (e) => {
    const name = e.target.files[0].name;
    setFile(URL.createObjectURL(e.target.files[0]));  
    dispatch(setAudioState({
      showAudioWaveform: true,
      showDefaultAudioWaveform: false,
      fileName: name.slice(0, name.length - 4)
    }))
    dispatch(setIsPlaying(false));    
  };

  const handleDelete = (args) => {
    // Reset the fileURL and hide the AudioWaveform
    setFile(null);
    if (args === "default") {
      dispatch(setAudioState({
        ...audioState,
        showDefaultAudioWaveform: false
      }))
    }
    else {
      dispatch(setAudioState({
        ...audioState,
        showAudioWaveform: false
      }))
    }
  };

  const handleSaveAudio = (audioSrc) => {
    setFileURL(audioSrc);
    dispatch(setAudioState({
      showAudioWaveform: true,
      showDefaultAudioWaveform: false,
      fileName: "RecordedAudio", // You may set a default name for the recorded audio
    }));
    dispatch(setIsPlaying(false));
    closePopup();
  };

  return (
    <div style={{ position: "relative" }}>
      {showDefaultAudioWaveform && <AudioWaveform />}

      {showAudioWaveform && <AudioWaveform filename={fileName} />}

      {/* Delete default audio button */}
      {showDefaultAudioWaveform && (
        <button
          title="default_delete"
          className="controls"
          onClick={() => handleDelete("default")}
        >
          <i className="material-icons">delete</i>

        </button>
      )}

      {/* Delete audio button */}
      {showAudioWaveform && (
        <button
          title="delete"
          className="controls"
          onClick={handleDelete}
        >
          <i className="material-icons">delete</i>

        </button>
      )}

      {/* Upload audio button */}
      {!showAudioWaveform && !showDefaultAudioWaveform && (
        <>
          <i style={{ color: "#531A65" }} className="material-icons audio-icon">
            library_music
          </i>
          <h1>Upload your audio file here</h1></>)}
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
      <button className="upload-btn" onClick={openPopup}>Record</button>
      {isPopupOpen && <RecordAudio onClose={closePopup} onSaveAudio={handleSaveAudio} />}
    </div>
  );
};

export default UploadAudio;
