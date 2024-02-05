// ArduinoCodeBox.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCode } from '../features/codeSlice';

const ArduinoCodeBox = () => {
  const { arduinoCode } = useSelector(selectCode);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    // TODO: Implement code to send arduinoCode to Arduino device
    // You may use a library like serialport or a custom solution for communication
    // Example: sendToArduino(arduinoCode);
    
    // Set uploading state to show loading indicator
    setUploading(true);

    // Simulate a delay for demonstration purposes (remove in the actual implementation)
    setTimeout(() => {
      // Reset uploading state after the simulated upload is complete
      setUploading(false);
    }, 2000);
  };

  return (
    <div className="GenerateCodeBox" style={{
      padding: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "300px",
      margin: "auto"
    }}>
      <label htmlFor="arduinoCode" className="language-label" style={{
        display: "block",
        marginBottom: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333" /* Change the color as needed */
      }}>
        Arduino Code
      </label>
      {/* Content for the box below the label */}
      <pre className="code-preview" style={{
        whiteSpace: "pre-wrap",
        marginTop: "8px",
        fontSize: "14px",
        backgroundColor: "#f9f9f9",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ddd",
        color: "#333",
      }}>
        {arduinoCode}
      </pre>
      
      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {uploading ? 'Uploading...' : 'Upload to Arduino'}
      </button>
    </div>
  );
};

export default ArduinoCodeBox;
