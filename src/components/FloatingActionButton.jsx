import React, { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';


const FloatingActionButton = ({ onSelect }) => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const actions = [
    { icon: <PetsIcon/>, name: 'Choose a Sprite' },
    { icon: <WallpaperIcon />, name: 'Choose a Backdrop' },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: 'absolute', bottom: 16, right: 16 }} 
      icon={<SpeedDialIcon />}
      onClose={() => setSpeedDialOpen(false)}
      onOpen={() => setSpeedDialOpen(true)}
      open={speedDialOpen}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            onSelect(action.name);
            setSpeedDialOpen(false);
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default FloatingActionButton;
