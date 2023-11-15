import React from 'react';
import { MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CameraToggle = ({ camera, setCamera }) => {
  return (
    <MenuItem>
      <ListItemIcon>
        <CameraAltIcon color={camera ? 'primary' : 'inherit'} />
      </ListItemIcon>
      <ListItemText primary="Camera" />
      <Switch checked={camera} onChange={() => setCamera(!camera)} />
    </MenuItem>
  );
};

export default CameraToggle;
