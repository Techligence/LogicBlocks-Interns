import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Blockly from 'blockly';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import BoardsSelectionModal from './BoardsSelectionModal';
import GoogleButton from 'react-google-button'


const formStyles = {
  container: {
    position: 'absolute',
    zIndex: 1,
    background: '#fff',
    maxWidth: '450px',
    width: '420px',
    height: '500px',
    padding: '45px',
    textAlign: 'center',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
  },
  input: {
    appearance: 'none',
    border: 'none',
    outline: 'none',
    borderBottom: '.2em solid #1977d3',
    
    borderRadius: '.2em .2em 0 0',
    margin: '0',
    fontSize: '14px',
    padding: '.4em',
    width: '60%',
    color: '#1977d3',
    '::placeholder': {
      color: '#1977d3', 
    },
  },
  
  label: {
    display: 'block',
    textAlign: 'center', 
    width: '60%',
    marginTop: '30px', 
    marginBottom: '0', 
  },

  icon: {
    position: 'relative',
    float: 'left',
    width: '20px',
    top: '2px',
  },
  button: {
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'uppercase',
    outline: '0',
    background: '#1977d3',
    width: '40%',
    border: '0',
    padding: '15px',
    color: '#FFFFFF',

    fontSize: '14px',
    transition: 'all 0.3 ease',
    cursor: 'pointer',
    margin: '25px',
  },
  message: {
    margin: '15px 0 0',
    color: '#b3b3b3',
    fontSize: '12px',
  },
  heading:{
      fontFamily: 'Roboto, sans-serif',
      fontSize:'30px',

  },
  
  messageLink: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

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
const Header = () => {
  const [projectName, setProjectName] = useState('Project_Name');
  const [autoSaving, setAutoSaving] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);
  const [isBoardSelectionModalOpen, setIsBoardSelectionModalOpen] = useState(false);
  const navigateTo = useNavigate();
  const [openSignInModal, setOpenSignInModal] = React.useState(false);
  const [openSignUpModal, setOpenSignUpModal] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };
  const handleOpenSignInModal = () => {
    setOpenSignInModal(true);
  };

  const handleCloseSignInModal = () => {
    setOpenSignInModal(false);
  };
  const handleOpenSignUpModal = () => {
    setOpenSignUpModal(true);
  };
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  const handleCloseSignUpModal = () => {
    setOpenSignUpModal(false);
  };
  const modalContainerStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '100',
    background: '#FFFFFF',
    maxWidth: '360px',
    width: '80%',
    padding: '45px',
    textAlign: 'center',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
  };

 

  const toggleBoardSelectionModal = () => {
    setIsBoardSelectionModalOpen(!isBoardSelectionModalOpen);
  };

  const handleBoardSelection = (board) => {
    // Navigate to the selected board component
    navigateTo(`/boards/${board}`);

    // Update state or context with the selected board
    setProjectName(board); // For demonstration, update projectName with the selected board
    setIsBoardSelectionModalOpen(false); // Close the modal
  };


  const handleAutoSave = () => {
    const workspace = Blockly.getMainWorkspace();
    const xmlDom = Blockly.Xml.workspaceToDom(workspace);
    const workspaceXml = Blockly.Xml.domToText(xmlDom);

    localStorage.setItem('autoSavedWorkspace', workspaceXml);
    setAutoSaving(true);

    setTimeout(() => setAutoSaving(false), 2000);
  };

  useEffect(() => {
    const autoSaveInterval = setInterval(handleAutoSave, 30000);

    return () => clearInterval(autoSaveInterval);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const saveWorkspace = () => {
  //   const workspace = Blockly.getMainWorkspace();
  //   const xmlDom = Blockly.Xml.workspaceToDom(workspace);
  //   const workspaceXml = Blockly.Xml.domToText(xmlDom);

  //   const sb3Xml = `<xml xmlns="http://www.w3.org/1999/xhtml">
  //     <variables></variables>
  //     ${workspaceXml}
  //   </xml>`;

  //   const fileName = 'saved_workspace.xml';
  //   const blob = new Blob([sb3Xml], { type: 'application/xml' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   alert('Workspace saved in XML format!');
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const loadedData = e.target.result;

  //       try {
  //         const blocklyWorkspace = Blockly.getMainWorkspace();
  //         blocklyWorkspace.clear();

  //         const parser = new DOMParser();
  //         const xmlDoc = parser.parseFromString(loadedData, 'text/xml');

  //         Blockly.Xml.domToWorkspace(xmlDoc, blocklyWorkspace);

  //         alert('Workspace loaded!');
  //       } catch (error) {
  //         alert('Error loading workspace: ' + error.message);
  //       }
  //     };
  //     reader.readAsText(file);
  //   } else {
  //     alert('No file selected.');
  //   }
  // };

  // const loadWorkspace = () => {
  //   const fileInput = document.createElement('input');
  //   fileInput.type = 'file';
  //   fileInput.accept = '.xml';
  //   fileInput.style.display = 'none';

  //   document.body.appendChild(fileInput);

  //   fileInput.addEventListener('change', async (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();

  //       reader.onload = async (e) => {
  //         const loadedData = e.target.result;

  //         try {
  //           const parser = new DOMParser();
  //           const xmlDoc = parser.parseFromString(loadedData, 'text/xml');

  //           console.log('Loaded XML:', loadedData);

  //           handleLoadedBlocks(xmlDoc);

  //           alert('Workspace loaded!');
  //         } catch (error) {
  //           alert('Error loading workspace: ' + error.message);
  //         }
  //       };

  //       reader.readAsText(file);
  //     }

  //     document.body.removeChild(fileInput);
  //   });

  //   fileInput.click();
  // };

  // const handleLoadedBlocks = (xmlDoc) => {
  //   try {
  //     Blockly.getMainWorkspace().clear();

  //     Blockly.Xml.domToWorkspace(xmlDoc, Blockly.getMainWorkspace());

  //     const projectName = xmlDoc.querySelector('projectName');
  //     if (projectName) {
  //       setProjectName(projectName.textContent);
  //     }
  //   } catch (error) {
  //     alert('Error handling loaded blocks: ' + error.message);
  //   }
  // };


  

  
  const handleSignIn = () => {
    // Add your sign-in logic here (e.g., validate credentials)
    // For demonstration purposes, let's assume a simple check
    if (signInUsername === 'demo' && signInPassword === 'password') {
      setIsSignedIn(true);
      handleCloseSignInModal();
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = () => {
    // Add your sign-up logic here (e.g., create a new user)
    // For demonstration purposes, let's assume a simple success
    alert('Account created successfully!');
    handleCloseSignUpModal();
  };
  const handleLoadFromFile = () => {
    fileInputRef.current.click();
    handleCloseMenu();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const xmlContent = e.target.result;
          loadBlocksFromXml(xmlContent);
        } catch (error) {
          console.error('Error loading file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const loadBlocksFromXml = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const workspace = Blockly.getMainWorkspace();
  
    // Get the block positions from the 'block-positions' attribute
    const blockPositionsString = xmlDoc.documentElement.getAttribute('block-positions');
    if (!blockPositionsString) {
      console.error('No block positions found in the XML.');
      return;
    }
  
    // Convert the block positions from string to object
    const blockPositions = JSON.parse(blockPositionsString);
  
    const processBlock = (blockNode, parentBlock) => {
      const type = blockNode.getAttribute('type');
      const id = blockNode.getAttribute('id');
  
      // Check if block ID already exists in the workspace
      if (!workspace.getBlockById(id)) {
        // Create Blockly block based on XML attributes and content
        const block = Blockly.Xml.domToBlock(blockNode, workspace);
        if (block) {
          // Set the position of the block if its ID exists in blockPositions
          if (blockPositions[id]) {
            const { x, y } = blockPositions[id];
            block.moveBy(x, y);
          } else {
            // If no position data found, position it at default coordinates
            block.moveBy(10, 10); // Change this to your desired default position
          }
  
          // Connect block to the parent block if applicable
          if (parentBlock) {
            block.previousConnection.connect(parentBlock.nextConnection);
          }
  
          // Recursively process child blocks
          const childBlockNodes = blockNode.getElementsByTagName('block');
          for (let i = 0; i < childBlockNodes.length; i++) {
            processBlock(childBlockNodes[i], block);
          }
        }
      }
    };
  
    // Clear the current workspace before loading new blocks
    workspace.clear();
  
    const blockNodes = xmlDoc.getElementsByTagName('block');
    for (let i = 0; i < blockNodes.length; i++) {
      processBlock(blockNodes[i], null);
    }
  };
  

  const handleSaveToFile = () => {
    try {
      const workspace = Blockly.getMainWorkspace();
      const jsonData = Blockly.Xml.workspaceToDom(workspace);
      const blockPositions = {};
  
      const processedBlockIds = new Set(); // To track processed block IDs
  
      const processBlock = (block) => {
        const { id } = block;
        if (!blockPositions[id]) {
          blockPositions[id] = block.getRelativeToSurfaceXY();
        }
  
        // Check if the block ID has already been processed
        if (!processedBlockIds.has(id)) {
          processedBlockIds.add(id); // Mark block ID as processed
  
          block.getChildren().forEach((childBlock) => {
            processBlock(childBlock);
          });
        }
      };
  
      workspace.getAllBlocks().forEach((block) => {
        processBlock(block);
      });
  
      const fileName = projectName || 'UntitledProject';
      jsonData.setAttribute('block-positions', JSON.stringify(blockPositions));
  
      const xmlText = Blockly.Xml.domToPrettyText(jsonData);
      const blob = new Blob([xmlText], { type: 'text/xml' });
  
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${fileName}.xml`;
  
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error saving file:', error);
    }
    handleCloseMenu();
  };
  const handleReloadSite = () => {
    window.location.reload();
  };
  

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h1>LogicBlocks</h1>
          </Typography>

          <Button
            color="inherit"
            onClick={handleMenuClick}
            endIcon={<MoreVertIcon />}
            disabled={autoSaving}
          >
            Files
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleReloadSite}>New</MenuItem>
            <MenuItem onClick={handleLoadFromFile}>Load</MenuItem>
            <MenuItem onClick={handleSaveToFile}>Save</MenuItem>
          </Menu>

          <Button color="inherit">Edit</Button>
          <Button color="inherit">Tutorials</Button>
            {/* Boards Button */}
            <Button color="inherit" onClick={toggleBoardSelectionModal}>
            Boards
          </Button>
          <Button color="inherit">Connect</Button>

          <ProjectNameInput
            value={projectName}
            onChange={handleProjectNameChange}
            variant="outlined"
            placeholder="Project Name"
            InputProps={{
              startAdornment: <Typography>|</Typography>,
              endAdornment: <Typography>|</Typography>,
            }}
          />

          <Box sx={{ marginRight: '16px' }}>{autoSaving && 'Auto-saving...'}</Box>

          

         
          <input
            ref={fileInputRef}
            type="file"
            accept=".xml"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />

          {/* Spacing Element */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Logo Placeholder */}
          <img src="trial_sprite_nobkg.png" alt="Logo" style={{ height: '50px' }} />

          <Button color="inherit" onClick={handleOpenSignInModal}>Sign In</Button><br/>

          {/* Sign In Modal */}
          <Modal
            open={openSignInModal || openSignUpModal}
            onClose={openSignInModal ? handleCloseSignInModal : handleCloseSignUpModal}
            aria-labelledby={showSignUp ? 'signup-modal-title' : 'signin-modal-title'}
            aria-describedby={showSignUp ? 'signup-modal-description' : 'signin-modal-description'}
          >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', ...formStyles.container }}>
              <p id={showSignUp ? 'signup-modal-title' : 'signin-modal-title'} align="center" style={formStyles.heading}>
                {showSignUp ? 'Sign Up' : 'Sign In'}
              </p>
              <div id={showSignUp ? 'signup-modal-description' : 'signin-modal-description'}>
                {/* Conditionally render sign-in or sign-up content */}
                {showSignUp ? (
                <>
                  {/* Sign Up content */}
                  <div className="form__group">
                    <label htmlFor="emailInput" className="form__label"style={formStyles.label}>Email Address</label>
                    <input type="text" id="emailInput" className="form__field" style={formStyles.input} />
                  </div>
                  <div className="form__group">
                    <label htmlFor="usernameInput" className="form__label"style={formStyles.label}>Enter Username</label>
                    <input type="text" id="usernameInput" className="form__field" style={formStyles.input} />
                  </div>
                  <div className="form__group">
                    <label htmlFor="password" className="form__label"style={formStyles.label}> New Password</label>
                    <input type="password" id="passwordInput" className="form__field" style={formStyles.input} />
                  </div>
                  <Button variant="contained" style={formStyles.button}>Sign Up</Button><br/><center>
                  <GoogleButton
                    onClick={() => { console.log('Google button clicked') }}
                  /></center>
                  <div style={formStyles.message}>
                    Already registered?{' '}
                    <a href="#" style={formStyles.messageLink} onClick={toggleSignUp}>
                      Sign In
                    </a>
                  </div>
                </>
              ) : (
                <>
                  {/* Sign In content */}
                  <br/>
                  <div className="form__group">
                    <label htmlFor="usernameInput" className="form__label"style={formStyles.label}>Username</label>
                    <input type="text" id="usernameInput" className="form__field" style={formStyles.input} />
                  </div>
                  <div className="form__group">
                    <label htmlFor="passwordSignInInput" className="form__label"style={formStyles.label}>Password</label>
                    <input type="password" id="passwordSignInInput" className="form__field" style={formStyles.input} />
                  </div><br/>
                  <Button variant="contained" style={formStyles.button}>Sign In</Button><br/><center>
                  <GoogleButton onClick={() => { console.log('Google button clicked') }}/></center>
                  <div style={formStyles.message}>
                    Not registered?{' '}
                    <a href="#" style={formStyles.messageLink} onClick={toggleSignUp}>
                      Create an account
                    </a>
                  </div>
                </>
                )}
              </div>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
      <BoardsSelectionModal
        isOpen={isBoardSelectionModalOpen}
        onClose={() => setIsBoardSelectionModalOpen(false)}
        onSelectBoard={handleBoardSelection}
      />
    </Box>
  );
}

export default Header;