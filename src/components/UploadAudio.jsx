// UploadAudio.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { FileContext } from "../contexts/fileContext.jsx";
import AudioWaveform from "./AudioWaveform"; // Import your AudioWaveform component
import Sidebar from "./Sidebar";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setAudioState, setAudioArray, setActiveWaveform } from "../features/soundTabReducers.js";
import { setIsPlaying } from "../features/audioSlice.js";
import { v4 as uuidv4 } from 'uuid';
import RecordAudio from "./recordAudio/RecordAudio.jsx";


const UploadAudio = () => {
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const { fileURL, setFileURL } = useContext(FileContext);
  const [file, setFile] = useState(null);
  const audioState = useSelector((state) => state.soundTab.audioState);
  const { showAudioWaveform, fileName } = audioState;
  const audioArray = useSelector(state => state.soundTab.audioArray);
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
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (file) {
      setFileURL(file);
    }
  }, [file, setFileURL]);

  const handleButtonClick = () => {
    inputFile.current.click();
  };
  const handleRecordClick = () => {
    openPopup(); // Assuming `openPopup` handles opening the recording popup
}; 

  const handleFileUpload = (e) => {
    const name = e.target.files[0].name;
    setFile(URL.createObjectURL(e.target.files[0]));

    //redux actions   
    dispatch(setIsPlaying(false));

    //Adding to array
    const newSound = {
      id: uuidv4(),
      fileName: name.slice(0, name.length - 4),
      audioUrl: URL.createObjectURL(e.target.files[0]),
    };
    const updatedAudioArray = [
      ...audioArray,
      newSound
    ];
    dispatch(setAudioArray(updatedAudioArray));    

    dispatch(setActiveWaveform(newSound));
    if (updatedAudioArray.length === 1) {
      dispatch(
        setAudioState({
          showAudioWaveform: true,
          fileName: name.slice(0, name.length - 4),
        })
      );
    }
  };

  const handleDelete = async (id) => {
    const updatedAudioArray = audioArray.filter((audioItem) => audioItem.id !== id);
    dispatch(setAudioArray(updatedAudioArray));    

    if (updatedAudioArray.length === 0) {
      dispatch(setAudioState({
        showAudioWaveform: false,
        fileName: "",
      }))
      dispatch(setActiveWaveform({}));
    }
    else {
      dispatch(setActiveWaveform(updatedAudioArray[0]));
    }
  };

  const handleSaveAudio = (audioSrc) => {
    // setFileURL(audioSrc);
    // dispatch(setAudioState({
    //   showAudioWaveform: true,      
    //   fileName: "RecordedAudio", // You may set a default name for the recorded audio
    // }));
    dispatch(setIsPlaying(false));
    const newSound = {
      id: uuidv4(),
      fileName: "Recorded Audio",
      audioUrl: audioSrc,
    };
    const updatedAudioArray = [
      ...audioArray,
      newSound
    ];
    dispatch(setAudioArray(updatedAudioArray));
    dispatch(setActiveWaveform(newSound));
    if (updatedAudioArray.length === 1) {
      dispatch(
        setAudioState({
          showAudioWaveform: true,
          fileName: "Recorded Audio",
        })
      );
    }

    closePopup();
  };

  return (
    <div className="main-container">
      <Sidebar triggerFileUpload={handleButtonClick} onDelete={handleDelete} onRecordClick={handleRecordClick}/> {/* Add the Sidebar component here */}
      <div className="content-container">
        {showAudioWaveform && <AudioWaveform />}

        <div className="upload-controls">

          {/* Upload audio button */}
          {!showAudioWaveform && (
            <>
              <i
                style={{ color: "#531A65" }}
                className="material-icons audio-icon"
              >
                library_music
              </i>
              <h1 style={{ width: "100%" }}>Upload your audio file here</h1>
            </>
          )}
        </div>
        {/* <button className="upload-btn" onClick={handleButtonClick}>
          Upload
        </button> */}

        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          accept="audio/*"
          onChange={handleFileUpload}
        />
        {/* <button className="upload-btn" onClick={openPopup}>Record</button> */}
        {isPopupOpen && <RecordAudio onClose={closePopup} onSaveAudio={handleSaveAudio} />}
      </div>
    </div>
  );
};

export default UploadAudio;
