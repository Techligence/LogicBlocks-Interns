// CameraError.js
import React, { useState } from 'react';
import './CameraError.css';

const CameraError = ({ onClose }) => {
  const [showError, setShowError] = useState(true);

  const dismissError = () => {
    setShowError(false);
    onClose(); 
  };

  return (
    showError && (
      <div className='extension-overlay'>
        <div className="extension-inner">
          <h2>Camera Not Detected</h2>
          <p>The camera is not accessible. Please turn on the camera or use a different device.</p>
          <span className="close-btn" onClick={dismissError}>Dismiss</span>
        </div>
      </div>
    )
  );
};

export default CameraError;
