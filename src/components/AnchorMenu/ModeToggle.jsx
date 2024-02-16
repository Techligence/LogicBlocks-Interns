import React from 'react';
import { MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';

const ModeToggle = ({ mode, setMode }) => {
  return (
    <MenuItem>
      <ToggleButtonGroup value={mode} exclusive onChange={(e, newMode) => setMode(newMode)}
        sx={{
          width: "300px"
        }}>
        <ToggleButton sx={{ width: "33%" }} value="Hardware">Hardware</ToggleButton>
        <ToggleButton sx={{ width: "33%" }} value="Software">Software</ToggleButton>
        <ToggleButton sx={{ width: "33%" }} value="Lab">Lab</ToggleButton>
      </ToggleButtonGroup>
    </MenuItem>
  );
};

export default ModeToggle;
