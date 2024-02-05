// ArduinoCodeBox.js
import React from 'react';

const ArduinoCodeBox = () => {
  // Your Arduino code goes here
  const arduinoCode = `
    void setup() {
      // Setup code
    }

    void loop() {
      // Loop code
    }
  `;

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
    </div>
  );
};

export default ArduinoCodeBox;
