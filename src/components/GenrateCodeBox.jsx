import React from 'react';

const NormalBox = () => {
  return (
    <div className="GenrateCodeBox">
      {/* Title with grey background */}
      <div className="Title" style={{ backgroundColor: 'grey', padding: '8px', marginBottom: '8px' }}>
        Generated Code
      </div>

      {/* Content for the box below Canvasbox */}
      This is the box below Canvasbox.
    </div>
  );
}

export default NormalBox;