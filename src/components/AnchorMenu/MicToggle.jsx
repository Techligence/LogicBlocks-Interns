import React from 'react';
import { MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

const MicToggle = ({ mic, setMic }) => {
  return (
    <MenuItem>
      <ListItemIcon>
        <MicIcon color={mic ? 'primary' : 'inherit'} />
      </ListItemIcon>
      <ListItemText primary="Mic" />
      <Switch checked={mic} onChange={() => setMic(!mic)} />
    </MenuItem>
  );
};

export default MicToggle;
