// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { styled } from '@mui/material/styles';

// import { useSelector } from 'react-redux';

// const ProjectNameInput = styled(TextField)({
//   maxWidth: '200px',
//   '& .MuiInputBase-input': {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     border: 'none',
//   },
// });

// export default function Header() {

//   const language = useSelector(state => state.language);

//   // Add state management for project name if needed
//   const [projectName, setProjectName] = React.useState('Project_Name');

//   const handleProjectNameChange = (event) => {
//     setProjectName(event.target.value);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 , width: '100%'}}>
//       <AppBar position="static">
//         <Toolbar>
//           {/* LogicBlocks Title */}
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           <h1>{language === 'en' ? 'LogicBlocks' : 'Blocs Logiques'}</h1>
//           </Typography>

//           {/* Navigation Buttons */}
//           <div className="nav-button">
//           <Button className="btn" color="inherit">{language === 'en' ? 'Files' : 'Fichiers'}</Button>
//           <Button className="btn" color="inherit">{language === 'en' ? 'Edit' : 'Modifier'}</Button>
//           <Button className="btn" color="inherit">{language === 'en' ? 'Tutorials' : 'Tutoriels'}</Button>
//           <Button className="btn" color="inherit">{language === 'en' ? 'Boards' : 'Cartes'}</Button>
//           <Button className="btn" color="inherit">{language === 'en' ? 'Connect' : 'Connecter'}</Button>
//           </div> 
          
//           {/* Editable Project Name */}
//           <ProjectNameInput
//             value={projectName}
//             onChange={handleProjectNameChange}
//             variant="outlined"
//             placeholder={language === 'en' ? 'Project Name' : 'Nom du Projet'}
//             InputProps={{
//               startAdornment: <Typography>|</Typography>,
//               endAdornment: <Typography>|</Typography>,
//             }}
//           />

//           {/* Spacing Element */}
//           <Box sx={{ flexGrow: 1 }} />

//           {/* Logo Placeholder */}
//           <img src="trial_sprite_nobkg.png" alt="Logo" style={{ height: '50px' }} />

//           {/* Sign In Button */}
//           <Button color="inherit">{language === 'en' ? 'Sign In' : 'Se Connecter'}</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// =========================================

// // Modified Header.jsx
// import React, { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { styled } from '@mui/material/styles';
// import { useSelector } from 'react-redux';
// import { GrLanguage } from 'react-icons/gr'; // Import the language icon

// const ProjectNameInput = styled(TextField)({
//   maxWidth: '200px',
//   '& .MuiInputBase-input': {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     border: 'none',
//   },
// });

// export default function Header() {
//   const language = useSelector(state => state.language);
//   const [projectName, setProjectName] = useState('Project_Name');
//   const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown

//   const handleProjectNameChange = (event) => {
//     setProjectName(event.target.value);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <Box sx={{ flexGrow: 1, width: '100%' }}>
//       <AppBar position="static">
//         <Toolbar>
//           {/* LogicBlocks Title */}
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             <h1>{language === 'en' ? 'LogicBlocks' : 'Blocs Logiques'}</h1>
//           </Typography>

//           {/* Navigation Buttons */}
//           <div className="nav-button">
//             <Button className="btn" color="inherit">{language === 'en' ? 'Files' : 'Fichiers'}</Button>
//             <Button className="btn" color="inherit">{language === 'en' ? 'Edit' : 'Modifier'}</Button>
//             <Button className="btn" color="inherit">{language === 'en' ? 'Tutorials' : 'Tutoriels'}</Button>
//             <Button className="btn" color="inherit">{language === 'en' ? 'Boards' : 'Cartes'}</Button>
//             <Button className="btn" color="inherit">{language === 'en' ? 'Connect' : 'Connecter'}</Button>
//           </div> 

//           {/* Editable Project Name */}
//           <ProjectNameInput
//             value={projectName}
//             onChange={handleProjectNameChange}
//             variant="outlined"
//             placeholder={language === 'en' ? 'Project Name' : 'Nom du Projet'}
//             InputProps={{
//               startAdornment: <Typography>|</Typography>,
//               endAdornment: <Typography>|</Typography>,
//             }}
//           />

//           {/* Language Dropdown */}
//           <label htmlFor="languageDropdown" onClick={toggleDropdown}>
//             <GrLanguage />
//           </label>
//           {isDropdownOpen && (
//             <select
//               id="languageDropdown"
//               value={language}
//               onChange={(e) => handleLanguageChange(e.target.value)}
//               style={{
//                 padding: '5px',
//                 top: '77px',
//                 left: '1079px',
//                 marginLeft: '3px',
//                 position: 'absolute',
//               }}
//             >
//               <option value="en">English</option>
//               <option value="fr">French</option>
//             </select>
//           )}

//           {/* Spacing Element */}
//           <Box sx={{ flexGrow: 1 }} />

//           {/* Logo Placeholder */}
//           <img src="trial_sprite_nobkg.png" alt="Logo" style={{ height: '50px' }} />

//           {/* Sign In Button */}
//           <Button color="inherit">{language === 'en' ? 'Sign In' : 'Se Connecter'}</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }


// Modified Header.jsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { GrLanguage } from 'react-icons/gr';
import { setLanguage } from '../features/languageSlice';
import * as en from 'blockly/msg/en'; // Import English messages
import * as fr from 'blockly/msg/fr'; // Import French messages

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  const language = useSelector((state) => state.language);
  const [projectName, setProjectName] = useState('Project_Name');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch(); // Add this line to get access to dispatch function

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const toggleLanguage = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
    updateBlocklyLocale(selectedLanguage);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (selectedLanguage) => {
    toggleDropdown();
    toggleLanguage(selectedLanguage);
  };

  const updateBlocklyLocale = (lang) => {
    const languageMap = {
      en,
      fr,
    };
    Blockly.setLocale(languageMap[lang]);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageItemClick = (selectedLanguage) => {
    handleClose();
    handleLanguageChange(selectedLanguage);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
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

          {/* Language Dropdown */}
          <div style={{ position: 'relative', marginLeft: '8px' }}>
          <Button
              onClick={handleClick}
              startIcon={<GrLanguage style={{ color: 'black' }} />}
            >
              {language === 'en' ? 'English' : 'Français'}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleLanguageItemClick('en')}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageItemClick('fr')}>Français</MenuItem>
            </Menu>
            {/* <label htmlFor="languageDropdown" onClick={() => handleLanguageChange(language)}>
              <GrLanguage />
            </label> */}
            {/* {isDropdownOpen && (
              <select
                id="languageDropdown"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                style={{
                  position: 'absolute',
                  padding: '5px',
                  top: '-3px',
                  left: '30px',
                }}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            )} */}
          </div>

          {/* Spacing Element */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Logo Placeholder */}
          <img src="trial_sprite_nobkg.png" alt="Logo" style={{ height: '50px' }} />

          {/* Sign In Button */}
          <Button color="inherit">
            {language === 'en' ? 'Sign In' : 'Se Connecter'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

