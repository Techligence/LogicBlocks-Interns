// ZoomIn.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ZoomIn= ({ onClick }) => {
  return (
    <IconButton aria-label="zoom-in" onClick={onClick}>
      <ZoomInIcon />
    </IconButton>
  );
};

export default ZoomIn;
