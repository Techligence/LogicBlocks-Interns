// ZoomOutButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const ZoomOut = ({ onClick, disabled }) => {
  return (
    <IconButton aria-label="zoom-out" onClick={onClick} disabled={disabled}>
      <ZoomOutIcon style={{ color: disabled ? 'gray' : 'skyblue' }} />
    </IconButton>
  );
};

export default ZoomOut;
