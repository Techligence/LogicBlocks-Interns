// FlagButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';

const FlagButton = ({ onClick }) => {
  return (
    <IconButton aria-label="play" onClick={onClick}>
      <FlagIcon style={{ color: 'green' }} />
    </IconButton>
  );
};

export default FlagButton;
