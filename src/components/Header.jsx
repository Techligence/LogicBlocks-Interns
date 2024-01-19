import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';

const ProjectNameInput = styled(TextField)({
  maxWidth: '200px',
  '& .MuiInputBase-input': {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

export default function Header() {

  const language = useSelector(state => state.language);

  // Add state management for project name if needed
  const [projectName, setProjectName] = React.useState('Project_Name');

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 , width: '100%'}}>
      <AppBar position="static">
        <Toolbar>
          {/* LogicBlocks Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h1>{language === 'en' ? 'LogicBlocks' : 'Blocs Logiques'}</h1>
          </Typography>

          {/* Navigation Buttons */}
          <div className="nav-button">
          <Button className="btn" color="inherit">{language === 'en' ? 'Files' : 'Fichiers'}</Button>
          <Button className="btn" color="inherit">{language === 'en' ? 'Edit' : 'Modifier'}</Button>
          <Button className="btn" color="inherit">{language === 'en' ? 'Tutorials' : 'Tutoriels'}</Button>
          <Button className="btn" color="inherit">{language === 'en' ? 'Boards' : 'Cartes'}</Button>
          <Button className="btn" color="inherit">{language === 'en' ? 'Connect' : 'Connecter'}</Button>
          </div> 
          
          {/* Editable Project Name */}
          <ProjectNameInput
            value={projectName}
            onChange={handleProjectNameChange}
            variant="outlined"
            placeholder={language === 'en' ? 'Project Name' : 'Nom du Projet'}
            InputProps={{
              startAdornment: <Typography>|</Typography>,
              endAdornment: <Typography>|</Typography>,
            }}
          />

          {/* Spacing Element */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Logo Placeholder */}
          <img src="trial_sprite_nobkg.png" alt="Logo" style={{ height: '50px' }} />

          {/* Sign In Button */}
          <Button color="inherit">{language === 'en' ? 'Sign In' : 'Se Connecter'}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
