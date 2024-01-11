import React, { useState } from 'react';
import '../index.css'; // You can create a separate CSS file for styling

const SidePanel = () => {
    const [isPanelVisible, setPanelVisibility] = useState(true);
  
    const togglePanel = () => {
      setPanelVisibility(!isPanelVisible);
    };
  
    return (
      <div className={`panel-container ${isPanelVisible ? 'panel-visible' : 'panel-hidden'}`}>
        <button className="outside-button" onClick={togglePanel}>
          {isPanelVisible ? '<' : '>'}
        </button>
        <div className={`side-panel ${isPanelVisible ? 'visible' : 'hidden'}`}>
          
        
          {/* Add your content for the side panel here */}
          <div className="panel-content">
            <p>Content goes here...</p>
            {/* You can add more content as needed */}
          </div>
        </div>
      </div>
    );
  };
  
  export default SidePanel;