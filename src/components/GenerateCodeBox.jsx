import React, { useState } from 'react';

const GenerateCodeBox = ({ jsCode, pythonCode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="GenrateCodeBox" style={{ display: 'flex' }}>
      {/* Left side with generated code */}
      <div style={{ flex: 1 }}>
        <div className="Title" style={{ backgroundColor: 'grey', padding: '8px', marginBottom: '8px' }}>
          Generated Code
          <label htmlFor="languageDropdown" style={{ marginLeft: '100px', marginBottom: '8px', padding: '8px' }}>
            Choose:
          </label>
          <select
            id="languageDropdown"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            style={{ fontSize: 'large', marginLeft: '8px' }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>

        {/* Content for the box below Canvasbox */}
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {selectedLanguage === 'javascript' ? jsCode : pythonCode}
        </pre>
      </div>
    </div>
  );
};

export default GenerateCodeBox;
