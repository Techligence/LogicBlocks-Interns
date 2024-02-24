import React, { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSprite, useBackdrop } from '../pages/Home';
import DrawSprite from "./DrawSprite/DrawSprite";

const exampleSprites = [
  "/sprite1.png",
  "/sprite2.png",
  "/sprite3.png",
  "/sprite4.png",
  "/sprite5.png",
  "/sprite6.png",
  "/sprite7.png",
  "/sprite8.png",
];

const exampleBackdrops = [
  '/backdrop1.png',
  '/backdrop2.png',
  '/backdrop3.png',
  '/backdrop4.png',
];

const FloatingActionButton = () => {
  const { addSprite } = useSprite();
  const { setBackdrop } = useBackdrop();
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSprite, setSelectedSprite] = useState(null);
  const [draw, setDraw] = useState(false);
  const [fileInputSpriteOpen, setFileInputSpriteOpen] = useState(false); // Change variable name
  const [selectedBackdrop, setSelectedBackdrop] = useState(null);
  const [fileInputBackdropOpen, setFileInputBackdropOpen] = useState(false);

  const actions = [
    { icon: <PetsIcon />, name: "Choose a Sprite" },
    { icon: <WallpaperIcon />, name: "Choose a Backdrop" },
  ];

  const openModal = (option) => {
    setModalOpen(true);
    setSelectedOption(option);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOption(null);

    setSearchTerm('');
    setFileInputSpriteOpen(false);
    setFileInputBackdropOpen(false);

  };

  const handleSelection = (item) => {
    if (selectedOption === 'Choose a Sprite') {
      addSprite(item);
      setSelectedSprite(item);
    } else {
      setBackdrop(item);
      setSelectedBackdrop(item);
    }
    closeModal();
    setSpeedDialOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
  
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/gif'
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        if (selectedOption === 'Choose a Sprite') {
          addSprite(dataURL);
          setSelectedSprite(dataURL);
          setFileInputSpriteOpen(false);
          exampleSprites.push(dataURL);
        } else {
          setBackdrop(dataURL);
          setSelectedBackdrop(dataURL);
          setFileInputBackdropOpen(false);
          exampleBackdrops.push(dataURL);
        }
      };
      reader.readAsDataURL(file);
      closeModal();
    } else {
      alert("Please upload a valid image file (PNG, JPEG, JPG, or GIF).");
    }
  };
  

  const handleSurpriseMe = () => {

    if (selectedOption === 'Choose a Sprite') {
      const randomIndex = Math.floor(Math.random() * exampleSprites.length);
      const randomSprite = exampleSprites[randomIndex];
      addSprite(randomSprite);
      setSelectedSprite(randomSprite);
    } else if (selectedOption === 'Choose a Backdrop') {
      const randomIndex = Math.floor(Math.random() * exampleBackdrops.length);
      const randomBackdrop = exampleBackdrops[randomIndex];
      setBackdrop(randomBackdrop);
      setSelectedBackdrop(randomBackdrop);
    }

    closeModal();
    setSpeedDialOpen(false);
  };


  const drawSprite = () => {
    setDraw(!draw);
  };

  const renderModalContent = () => {
    const displayItems = selectedOption === 'Choose a Sprite' ? exampleSprites : exampleBackdrops;
    const selectedItemImage = selectedOption === 'Choose a Sprite' ? selectedSprite : selectedBackdrop;

    const filteredItems = displayItems.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Box>
        {draw == false ? (<>
        </>) : (
          <Button onClick={drawSprite}
            style={{ position: "absolute", top: "32px", left: "20px" }}
          >
            <img
              src="/back.png"
              alt="Back"
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
        )}
        <Typography variant="h5" style={{
          textAlign: "center",
          marginBottom: "1.5rem",
        }}>
          {selectedOption === "Choose a Sprite" ? "Sprite" : "Backdrop"}{" "}
          Selection
        </Typography>
        {draw == false ? (<>
          <Button onClick={() => closeModal()}
            style={{ position: "absolute", top: "32px", left: "20px" }}
          >
            <img
              src="/back.png"
              alt="Back"
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              marginBottom: '5px',
              width: '100%',
            }}
          />

          <div style={{
            display: "flex",
            flexWrap: 'wrap',
            gap: '8px',
            width: '100%',
            maxHeight: '300px',
            overflowY: 'auto',
            justifyContent: 'center',
            marginTop: '16px',
          }}>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                style={{
                  width: '50px',
                  height: '50px',
                  margin: '10px',
                  cursor: 'pointer',
                  backgroundImage: `url(${item})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  border: selectedItemImage === item ? '2px solid #2196F3' : 'none',
                }}
                onClick={() => handleSelection(item)}
              />
            ))}
          </div>
          <div
            id="up-draw-box"
            style={{
              width: '100%',
              display: 'flex',
              gap: '10px',
              marginTop: '16px',
            }}
          >
            {selectedOption === 'Choose a Sprite' && (
              <div className="upload-div">
                <label className="label-upload" htmlFor='upload-sprite'>UPLOAD SPRITE</label>
                <input type="file" id="upload-sprite" style={{ display: "none" }} accept=".png,.jpg,.jpeg,.gif" onChange={handleFileUpload} />
              </div>
            )}

            {selectedOption === 'Choose a Backdrop' && (
              <div className="upload-div">
                <label className="label-upload" htmlFor='upload-backdrop'>UPLOAD BACKDROP</label>
                <input type="file" id="upload-backdrop" style={{ display: "none" }} accept=".png,.jpg,.jpeg,.gif" onChange={handleFileUpload} />
              </div>
            )}

            <Button onClick={handleSurpriseMe}>Surprise Me</Button>
            {selectedOption === 'Choose a Sprite' && (<>
              <Button onClick={drawSprite}>Draw Sprite</Button>
            </>)}
            {selectedOption === 'Choose a Backdrop' && (<>

              <Button onClick={drawSprite}>Draw Backdrop</Button>
            </>)}
          </div>

        </>) : (<div>
          <DrawSprite
            exampleItems={selectedOption === "Choose a Sprite" ? exampleSprites : exampleBackdrops}
            closeModal={closeModal} selectedOption={selectedOption}
          />
        </div>
        )}

      </Box>
    );
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        open={speedDialOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => openModal(action.name)}
          />
        ))}
      </SpeedDial>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="selection-box"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {renderModalContent()}
        </Box>
      </Modal>
    </>
  );
};

export default FloatingActionButton;
