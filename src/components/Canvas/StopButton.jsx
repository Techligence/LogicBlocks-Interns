// StopButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';

const StopButton = ({ onClick }) => {
  return (
    <IconButton aria-label="stop" onClick={onClick}>
      <StopIcon style={{ color: 'red' }} />
    </IconButton>
  );
};

export default StopButton;
