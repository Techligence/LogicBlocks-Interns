import React from 'react';
import './Extension.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image1 from './1.png'
import image2 from './2.png'

const Extension = ({ onClose }) => {
  return (
      <div className='extension-overlay'>
      <nav>
        <div className="back-button" onClick={onClose}>Back</div>
        <div className="extension-title"><h1>Choose an Extension</h1></div>
      </nav>
      <div className='card_main'>
        <div className='card'>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image1}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Music
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Play Instruments and Drums.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    

    <div className='card'>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image2}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pen
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Draw with the sprites.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>


    <div className='card'>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image1}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Video Sensing
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sense motion with the camera
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    <div className='card'>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image2}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Text to Speech
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Make the projects talk.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    </div>
      </div>
  
  );
};

export default Extension;