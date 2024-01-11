import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCode } from '../features/codeSlice';

const GenerateCodeBox = () => {
  
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const { jsCode, pythonCode } = useSelector(selectCode);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <>
    <div className="GenerateCodeBox" style={{ padding: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "300px",
      margin: "auto"
      }}>

      <label htmlFor="languageDropdown" className="language-label" style={{display: "block",
         marginBottom: "8px",
         fontSize: "16px",
         fontWeight: "bold",
         color: "#333" /* Change the color as needed */
      }}>
        Choose Language:
      </label>
      <select
        id="languageDropdown"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="language-dropdown"
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: "#f5f5f5",
          color: "#333",
        }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>

      {/* Content for the box below the language dropdown */}
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
        {selectedLanguage === 'javascript' ? jsCode : pythonCode}
      </pre>
    </div>
    </>
  );
};

export default GenerateCodeBox;
