// ZoomOutButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const ZoomOut = ({ onClick }) => {
  return (
    <IconButton aria-label="zoom-out" onClick={onClick}>
      <ZoomOutIcon />
    </IconButton>
  );
};

export default ZoomOut;
