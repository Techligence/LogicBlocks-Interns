import React from 'react';
 import { IconButton } from '@mui/material';
 import DrawIcon from '@mui/icons-material/Draw';

 const Pencil = ({ onClick,isActive }) => {
    return (
      <IconButton aria-label="pencil" color={isActive ? 'primary' : 'default'} onClick={onClick}>
        <DrawIcon />
      </IconButton>
    );
  };
  
  export default Pencil;