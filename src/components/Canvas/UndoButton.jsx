// UndoButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';

const UndoButton = ({ onClick }) => {
  return (
    <IconButton aria-label="undo" onClick={onClick}>
      <UndoIcon style={{ color: 'skyblue' }} />
    </IconButton>
  );
};

export default UndoButton;
