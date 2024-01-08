//Contributed by Srushti_Ubale

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';

const BoardsSelectionModal = ({ isOpen, onClose, onSelectBoard }) => {
  const initialBoards = ["ESP32"];
  const otherBoards = [
    "Arduino Uno",
    "Arduino Mega",
    "Raspberry Pi",
    "ESP8266",
    "Particle Photon",
  ];

  const esp32ImageSrc = "/esp.jpeg";
  const [showOtherBoards, setShowOtherBoards] = useState(false);

  useEffect(() => {
    // Reset state when the modal is closed
    if (!isOpen) {
      setShowOtherBoards(false);
    }
  }, [isOpen]);

  const handleChooseAnotherBoard = () => {
    setShowOtherBoards(true);
  };
  const handleReloadSite = () => {
  window.location.reload();
};


  return (

    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalContainerStyle}>
        <CustomPaper>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CloseIcon
              onClick={onClose}
              style={{
                cursor: 'pointer',
                fontSize: '24px', 
                color: '#1565c0', 
                fontWeight:'bold',
                transition: 'transform 0.3s ease-in-out',
              }}
              sx={{
                '&:hover': {
                  transform: 'scale(1.17)', 
                  color: 'darkred', 
                },
              }}
            />
          </div>

          <Typography variant="h5" sx={titleStyle}>
            Select a Board
          </Typography>

          {/* Display initial boards */}
          {initialBoards.map((board) => (
            <Paper
              key={board}
              onClick={() => onSelectBoard(board)}
              style={cardStyle}
            >
              <img src={esp32ImageSrc} alt={board} style={imageStyle} />
              <Typography variant="h6">{board}</Typography>
              <Typography variant="body2" sx={{color:"#1565c0"}}>Description of {board} </Typography>
            </Paper>
          ))}

          {/* Or choose another board */}
          <Typography
            variant="body1"
            sx={{
              // marginTop: "3px",
              marginBottom: "8px",
              cursor: "pointer",
              color: "#1565c0",
              fontSize: "17px",
              fontWeight:"bold"
            }}
            onClick={handleChooseAnotherBoard}
          >
          Choose another board:
          </Typography>

          {/* Display other boards only when showOtherBoards is true */}
          {showOtherBoards &&
            otherBoards.map((board) => (
              <Button
                key={board}
                onClick={() => onSelectBoard(board)}
                sx={buttonStyle}
              >
                {board}
              </Button>
            ))}
        </CustomPaper>
      </Box>
    </Modal>

  );
};

export default BoardsSelectionModal;

// CSS Styles
const modalContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  animation: "fadeIn 0.3s ease-in-out",

};
const titleStyle = {
  marginBottom: '6px',
  fontWeight: 'bold',
  textAlign: 'center', 
  color: '#1565c0', 
  textShadow: '2px 2px 4px rgba(0, 0, 0.1, 0.3)',
  borderBottom: '2px solid #1565c0', 
  paddingBottom: '4px', 
};

//keyframes for animation
const fadeInAnimation = `@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`;

const cardStyle = {
  padding: "15px",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  marginBottom: "20px",
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",

  },
};


const CustomPaper = styled(Paper)({
  width: "90%",
  maxWidth: "480px",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  transition: "transform 0.2s ease-in-out",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",

  },
});

const imageStyle = {
  width: "100%",
  maxWidth: "130px",
  height: "140px",
  marginBottom: "5px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const buttonStyle = {
  display: "block",
  width: "100%",
  marginBottom: "7px",
  borderRadius: "5px",
  transition: "background-color 0.3s ease, color 0.3s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: "#1565c0",
    color: "white",
  },
};