// RecordAudio.js
import React from 'react';
import './RecordAudio.css';
import AudioRecorder from "./AudioRecorder";

const RecordAudio = ({ onClose, onSaveAudio }) => {
  return (
    <div className="recordaudio-container">
      <div className="recordaudio">
        
        <h2>Audio Recorder</h2>
        <AudioRecorder onSaveAudio={onSaveAudio}/>
        <button onClick={onClose}>Close</button>
  
      </div>
    </div>
  );
};

export default RecordAudio;