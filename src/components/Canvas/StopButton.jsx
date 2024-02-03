// // StopButton.jsx
// import React from 'react';
// import { IconButton } from '@mui/material';
// import StopIcon from '@mui/icons-material/Stop';

// const StopButton = ({ onClick }) => {
//   return (
//     <IconButton aria-label="stop" onClick={onClick}>
//       <StopIcon style={{ color: 'red' }} />
//     </IconButton>
//   );
// };

// export default StopButton;


// StopButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';

const StopButton = ({ onClick, isStopped, onStop }) => {
  const handleStopClick = () => {
    onStop();
    onClick(); // Call the provided onClick function
  };

  return (
    <IconButton aria-label="stop" onClick={handleStopClick}>
      <StopIcon style={{ color: isStopped ? 'red' : 'inherit' }} />
    </IconButton>
  );
};

export default StopButton;



