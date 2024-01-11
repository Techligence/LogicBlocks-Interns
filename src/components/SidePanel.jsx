import React, { useState } from 'react';
import '../index.css'; // You can create a separate CSS file for styling
import GenerateCodeBox from './GenerateCodeBox';

const SidePanel = () => {
    const [isPanelVisible, setPanelVisibility] = useState(false);
  
    const togglePanel = () => {
      setPanelVisibility(!isPanelVisible);
    };
  
    return (
      <div className={`panel-container ${isPanelVisible ? 'panel-visible' : 'panel-hidden'}`}>
        <button className="outside-button" onClick={togglePanel}>
          {isPanelVisible ? '<' : '>'}
        </button>
        <div className={`side-panel ${isPanelVisible ? 'visible' : 'hidden'}`} style={{ width: isPanelVisible ? '400px' : '0' }}>
          
        
          {/* Add your content for the side panel here */}
          <div className="panel-content">
            <GenerateCodeBox />

            {/* You can add more content as needed */}
          </div>
        </div>
      </div>
    );
  };
  
  export default SidePanel;