import React, { useState } from 'react';
import { MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CameraToggle = () => {

  const [camera, setCamera] = useState(false);
  
  const startCamera = () => {
    const constraints = {
      video: true,
      audio: false
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const videoElement = document.getElementById('cameraFeed');
        if (videoElement) {
          videoElement.srcObject = stream;
        }
        setCamera(true);
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
        alert("The Camera is Not Accessable. Kindly On the Camera or Use a Different Device")
      });
  };

  const stopCamera = () => {
    const videoElement = document.getElementById('cameraFeed');
    if (videoElement) {
      videoElement.srcObject = null;
    }
    setCamera(false);
  };

  return (
    <div>
      <MenuItem>
        <ListItemIcon>
          <CameraAltIcon color={camera ? 'primary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText primary="Camera" />
        <Switch checked={camera}  onChange={() => camera ? stopCamera()  : startCamera()} />
      </MenuItem>
    </div>
  );
};

export default CameraToggle;
