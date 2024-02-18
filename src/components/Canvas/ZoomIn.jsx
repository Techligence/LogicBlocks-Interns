// ZoomIn.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ZoomIn= ({ onClick, disabled }) => {
  return (
    <IconButton aria-label="zoom-in" onClick={onClick} disabled={disabled}>
      <ZoomInIcon style={{ color: disabled ? 'gray' : 'skyblue' }} />
    </IconButton>
  );
};

export default ZoomIn;
