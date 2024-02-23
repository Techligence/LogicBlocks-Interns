// RedoButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo';

const RedoButton = ({ onClick }) => {
  return (
    <IconButton aria-label="Redo" onClick={onClick}>
      <RedoIcon style={{ color: 'skyblue' }} />
    </IconButton>
  );
};

export default RedoButton;
