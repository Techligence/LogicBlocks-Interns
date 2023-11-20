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


const formStyles = {
  container: {
    position: 'absolute',
    zIndex: 1,
    background: '#FFFFFF',
    maxWidth: '360px',
    margin: '0 auto 100px',
    padding: '45px',
    textAlign: 'center',
    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
  },
  input: {
    fontFamily: 'Roboto, sans-serif',
    outline: '0',
    background: '#f2f2f2',
    width: '100%',
    border: '0',
    margin: '0 0 15px',
    padding: '15px',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  button: {
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'uppercase',
    outline: '0',
    background: '#1977d3',
    width: '100%',
    border: '0',
    padding: '15px',
    color: '#FFFFFF',
    fontSize: '14px',
    transition: 'all 0.3 ease',
    cursor: 'pointer',
  },
  message: {
    margin: '15px 0 0',
    color: '#b3b3b3',
    fontSize: '12px',
  },
  messageLink: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

const Header = () => {
  const [projectName, setProjectName] = useState('Project_Name');
  const [autoSaving, setAutoSaving] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const fileInputRef = useRef(null);
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBoardSelectionModalOpen, setIsBoardSelectionModalOpen] = useState(false);
  const navigateTo = useNavigate();

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
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


  const handleOpenSignInModal = () => {
    setOpenSignInModal(true);
  };

  const handleCloseSignInModal = () => {
    setOpenSignInModal(false);
  };

  const handleOpenSignUpModal = () => {
    setOpenSignUpModal(true);
  };

  const handleCloseSignUpModal = () => {
    setOpenSignUpModal(false);
  };

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

  const loadBlocksFromXml = (xmlString, parentBlock = null) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
    const workspace = Blockly.getMainWorkspace();
  
    const processBlock = (blockNode, parentBlock) => {
      const type = blockNode.getAttribute('type');
      const id = blockNode.getAttribute('id');
  
      // Check if block ID already exists in the workspace
      if (!workspace.getBlockById(id)) {
        const block = Blockly.Xml.domToBlock(blockNode, workspace);
        if (block) {
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

          <Box sx={{ flexGrow: 1 }} />

          <img src="trial_sprite_nobkg.png" alt="Logo" style={{ height: '50px' }} />
          <input
            ref={fileInputRef}
            type="file"
            accept=".xml"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />

          <Button color="inherit" onClick={handleOpenSignInModal}>
            {isSignedIn ? 'Sign Out' : 'Sign In'}
          </Button>
          
          <Modal
            open={openSignInModal}
            onClose={handleCloseSignInModal}
            aria-labelledby="signin-modal-title"
            aria-describedby="signin-modal-description"
          >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', ...formStyles.container }}>
              <h2 id="signin-modal-title" align="center">Sign In</h2>
              <div id="signin-modal-description">
                <input
                  type="text"
                  placeholder="Username"
                  style={formStyles.input}
                  value={signInUsername}
                  onChange={(e) => setSignInUsername(e.target.value)}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  style={formStyles.input}
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
                <br />
                <Button variant="contained" style={formStyles.button} onClick={handleSignIn}>
                  {isSignedIn ? 'Sign Out' : 'Sign In'}
                </Button>
                <div style={formStyles.message}>
                  Not registered? <a href="#" style={formStyles.messageLink} onClick={handleOpenSignUpModal}>Create an account</a>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal
            open={openSignUpModal}
            onClose={handleCloseSignUpModal}
            aria-labelledby="signup-modal-title"
            aria-describedby="signup-modal-description"
          >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', ...formStyles.container }}>
              <h2 id="signup-modal-title" align="center">Sign Up</h2>
              <div id="signup-modal-description">
                <input type="text" placeholder="Enter Your Name" style={formStyles.input} />
                <br />
                <input type="password" placeholder="Enter New Password" style={formStyles.input} />
                <br />
                <input type="text" placeholder="email address" style={formStyles.input} />
                <br />
                <Button variant="contained" style={formStyles.button} onClick={handleSignUp}>
                  Create
                </Button>
                <div style={formStyles.message}>
                  Already registered? <a href="#" style={formStyles.messageLink} onClick={handleOpenSignInModal}>Sign In</a>
                </div>
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