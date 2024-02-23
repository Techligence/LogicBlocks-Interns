import React from 'react';
import { MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch, useSelector } from 'react-redux';
import { setCameraOn } from '../../features/cameraSlice';

const CameraToggle = ({ camera, setCamera }) => {
  const isCameraOn = useSelector((state) => state.camera.isCameraOn);
  const dispatch = useDispatch();

  const handleToggleCamera = () => {
    dispatch(setCameraOn(!isCameraOn));
    console.log(isCameraOn);
  };

  return (
    <MenuItem>
      <ListItemIcon>
        <CameraAltIcon color={camera ? 'primary' : 'inherit'} />
      </ListItemIcon>
      <ListItemText primary="Camera" />
      <Switch checked={isCameraOn} onChange={handleToggleCamera} />
    </MenuItem>
  );
};

export default CameraToggle;
