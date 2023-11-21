import { MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState} from 'react';
import CameraError from './CameraError'


const CameraToggle = ({ camera, setCamera}) => {

  // const {extractedVideoRef} =Canvas();
  
  // console.log("Outside Use",extractedVideoRef)

  const [isCameraError,issetCameraError] = useState(false)

  // useEffect(() => {
   
  //   // console.log("inside Use",extractedVideoRef);
  // }, [extractedVideoRef]);  
  const startCamera = () =>{
      navigator.mediaDevices.getUserMedia({video:true,audio:false})
      .then(stream =>{
        const  extractedVideoRef = document.getElementById("VideoFeed")
        if (extractedVideoRef){
       
          extractedVideoRef.srcObject = stream;

        }
        setCamera(true)
      })
      .catch(error =>{
        console.error('Error accessing media devices.', error);
        issetCameraError(true)
      })
  }

  const stopCamera = () =>{
    
   const extractedVideoRef =document.getElementById("VideoFeed")
    if(extractedVideoRef) {
      
      extractedVideoRef.srcObject = null;
    }
    setCamera(false);
  };

  const closeCameraError =() =>{

    issetCameraError(false);
  }


  const jsx =  (
    <div>
          <MenuItem>
            <ListItemIcon>
              <CameraAltIcon color={camera ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Camera" />
            <Switch checked={camera} onChange={() => (camera ? stopCamera() : startCamera())} />
          </MenuItem>
          {isCameraError && <CameraError onClose={closeCameraError} />}
        </div>
        
        
        )


  return jsx;
};

export default CameraToggle;