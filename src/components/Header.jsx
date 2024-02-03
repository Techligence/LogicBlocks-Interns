import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Blockly from 'blockly';
import { useNavigate } from 'react-router-dom';
import BoardsSelectionModal from './BoardsSelectionModal';
import { Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import './style.css';




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



export default function Header() {
  const [projectName, setProjectName] = React.useState('Project_Name');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fileInputRef = useRef(null);
  const [isBoardSelectionModalOpen, setIsBoardSelectionModalOpen] = useState(false);
  const navigateTo = useNavigate();
  const [autoSaving, setAutoSaving] = React.useState(false);
  const [openSignInModal, setOpenSignInModal] = React.useState(false);
  const [openSignUpModal, setOpenSignUpModal] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);

  const handleOpenSignInModal = () => {
    setOpenSignInModal(true);
  };

  const handleCloseSignInModal = () => {
    setOpenSignInModal(false);
  };
  const handleCloseSignUpModal = () => {
    setOpenSignUpModal(false);
  };
  const handleLoginClick = () => {
    const slider = document.querySelector(".slider");
    const formSection = document.querySelector(".form-section");

    if (slider && formSection) {
      slider.classList.remove("moveslider");
      formSection.classList.remove("form-section-move");
    }
  };
  const handleSignupClick = () => {
    const slider = document.querySelector(".slider");
    const formSection = document.querySelector(".form-section");

    if (slider && formSection) {
      slider.classList.add("moveslider");
      formSection.classList.add("form-section-move");
    }
  };
  const handleLogin = () => {
    // login is successful
    alert('Welcome! You are logged in.');
  };

  const handleSignup = () => {
    // signup is successful
    alert('Welcome! You have successfully signed up.');
  };
  useEffect(() => {
    const handleSignupClick = () => {
      const slider = document.querySelector(".slider");
      const formSection = document.querySelector(".form-section");
      
      if (slider && formSection) {
        slider.classList.add("moveslider");
        formSection.classList.add("form-section-move");
      }
    };

    const handleLoginClick = () => {
      const slider = document.querySelector(".slider");
      const formSection = document.querySelector(".form-section");

      if (slider && formSection) {
        slider.classList.remove("moveslider");
        formSection.classList.remove("form-section-move");
      }
    };

    const signup = document.querySelector(".signup");
    const login = document.querySelector(".login");

    if (signup && login) {
      signup.addEventListener("click", handleSignupClick);
      login.addEventListener("click", handleLoginClick);
    }

    // Clean up event listeners on component unmount
    return () => {
      if (signup && login) {
        signup.removeEventListener("click", handleSignupClick);
        login.removeEventListener("click", handleLoginClick);
      }
    };
  }, []);

  const toggleAutoSaving = () => {
    setAutoSaving((prevAutoSaving) => !prevAutoSaving);
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

    
  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleFileButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
 // Function to save workspace state in browser storage
 const saveWorkspaceToStorage = () => {
  try {
    const workspace = Blockly.getMainWorkspace();
    const jsonData = Blockly.Xml.workspaceToDom(workspace);
    const blockPositions = {};

    // ... (code for saving block positions remains unchanged)

    // Save workspace state to localStorage
    localStorage.setItem('workspaceState', JSON.stringify({
      xmlData: Blockly.Xml.domToPrettyText(jsonData),
      positions: blockPositions,
    }));
  } catch (error) {
    console.error('Error saving workspace to storage:', error);
  }
};

// Function to load workspace state from storage
// Function to load workspace state from storage
const loadWorkspaceFromStorage = () => {
  try {
    const workspaceState = localStorage.getItem('workspaceState');
    if (workspaceState) {
      const { xmlData, positions } = JSON.parse(workspaceState);
      const workspace = Blockly.getMainWorkspace();

      // Clear workspace before loading blocks
      workspace.clear();

      // Restore blocks on the workspace
      const xmlText = xmlData; // Assuming xmlData is already a string
      const domParser = new DOMParser();
      const xmlDoc = domParser.parseFromString(xmlText, 'text/xml');
      Blockly.Xml.domToWorkspace(xmlDoc.documentElement, workspace);

      // Restore block positions if available
      // ... (code for restoring block positions remains unchanged)
    }
  } catch (error) {
    console.error('Error loading workspace from storage:', error);
  }
};

  // Load workspace from storage when the component mounts
  React.useEffect(() => {
    loadWorkspaceFromStorage(); // Call loadWorkspaceFromStorage

    // Autosave interval setup
    const autosaveInterval = setInterval(() => {

      saveWorkspaceToStorage();
      console.log('Workspace autosaved!');
      toggleAutoSaving(); // Toggle auto-saving indicator
      setTimeout(() => toggleAutoSaving(), 2000); // Hide indicator after 2 seconds
    }, 10000); // 10 seconds interval

    // Save workspace on page refresh or before closing
    window.addEventListener('beforeunload', saveWorkspaceToStorage);

    return () => {
      clearInterval(autosaveInterval); // Clear interval on component unmount
      window.removeEventListener('beforeunload', saveWorkspaceToStorage);
    };
  }, []);

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

   
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          {/* LogicBlocks Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h1>LogicBlocks</h1>
          </Typography>

          {/* File Menu */}
          <Button
            color="inherit"
            onClick={handleFileButtonClick}
            endIcon={<ArrowDropDownIcon />}
          >
            Files
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleLoadFromFile}>Load from your computer</MenuItem>
            <MenuItem onClick={handleSaveToFile}>Save to your computer</MenuItem>
          </Menu>

          {/* Other Buttons (Edit, Tutorials, Boards, Connect) */}
          <Button color="inherit">Edit</Button>
          <Button color="inherit">Tutorials</Button>
          <Button color="inherit" onClick={toggleBoardSelectionModal}>
            Boards
          </Button>
          <Button color="inherit">Connect</Button>

          {/* Editable Project Name */}
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
<Box sx={{
  fontSize: 'small',
  position: 'fixed',
  bottom: 0,
  left: 0,
  marginRight: '16px',
  color: '#918b8b',
}}>
  {autoSaving && 'Auto-saving...'}
</Box>


        

          {/* Spacing Element */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Logo Placeholder */}
          <img src="trial_sprite_nobkg.png" alt="Logo" style={{ height: '50px' }} />

          {/* Hidden file input for loading projects */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xml"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
           <Button color="inherit" onClick={handleOpenSignInModal}>Sign In</Button><br/>

{/* Sign In Modal */}
<Modal
  open={openSignInModal || openSignUpModal}
  onClose={openSignInModal ? handleCloseSignInModal : handleCloseSignUpModal}
  aria-labelledby={showSignUp ? 'signup-modal-title' : 'signin-modal-title'}
  aria-describedby={showSignUp ? 'signup-modal-description' : 'signin-modal-description'}
>
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
  
  <div className="container">
    {/* Upper button section */}
    <div className="slider"></div>
    <div className="btn">
      <button className="login" onClick={handleLoginClick}>Login</button>
      <button className="signup" onClick={handleSignupClick}>Signup</button>
    </div>
    {/* Form section containing login and signup forms */}
    <div className="form-section">
      {/* Login form */}
        <div className="login-box">
          <input
            type="email"
            className="email ele"
            placeholder="youremail@email.com"
          />
          <input
            type="password"
            className="password ele"
            placeholder="password"
          />
          <button className="clkbtn" onClick={handleLogin}>Login</button>
        </div>
        {/* Signup form */}
        <div className="signup-box">
          <input
            type="text"
            className="name ele"
            placeholder="Enter your name"
          />
          <input
            type="email"
            className="email ele"
            placeholder="youremail@email.com"
          />
          <input
            type="password"
            className="password ele"
            placeholder="password"
          />
          <input
            type="password"
            className="password ele"
            placeholder="Confirm password"
          />
          <button className="clkbtn" onClick={handleSignup}>Signup</button>
        </div>
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