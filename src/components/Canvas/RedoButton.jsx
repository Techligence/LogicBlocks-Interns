  // RedoButton.jsx
  import React from 'react';
  import { IconButton } from '@mui/material';
  import RedoIcon from '@mui/icons-material/Redo';
  
  const RedoButton = ({ onClick, disabled }) => {
    return (
      <IconButton aria-label="Redo" onClick={onClick} disabled={disabled}>
        <RedoIcon style={{ color: disabled ? 'gray' : 'skyblue' }} />
      </IconButton>
    );
  };
  
  export default RedoButton;
