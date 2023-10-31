// FullScreen.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const FullScreen = ({ onClick }) => {
  return (
    <IconButton aria-label="fullscreen" onClick={onClick}>
      <FullscreenIcon />
    </IconButton>
  );
};

export default FullScreen;
