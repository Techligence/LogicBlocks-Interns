// UndoButton.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';

const UndoButton = ({ onClick, disabled }) => {
  return (
    <IconButton aria-label="undo" onClick={onClick} disabled={disabled}>
      <UndoIcon style={{ color: disabled ? 'gray' : 'skyblue' }} />
    </IconButton>
  );
};
export default UndoButton;
