import React from 'react';
import { MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';

const ModeToggle = ({ mode, setMode }) => {
  return (
    <MenuItem>
      <ToggleButtonGroup value={mode} exclusive onChange={(e, newMode) => setMode(newMode)}>
        <ToggleButton value="Hardware">Hardware</ToggleButton>
        <ToggleButton value="Software">Software</ToggleButton>
        <ToggleButton value="Lab">Lab</ToggleButton>
      </ToggleButtonGroup>
    </MenuItem>
  );
};

export default ModeToggle;
