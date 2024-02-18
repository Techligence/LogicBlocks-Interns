// FlagButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const ExecutionButton = ({ onClick }) => {
  return (
    <IconButton aria-label="play" onClick={onClick}>
      <PlayArrowIcon style={{ color: 'purple' }} />
    </IconButton>
  );
};

export default ExecutionButton;
