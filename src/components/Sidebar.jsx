// Sidebar.jsx
import React, { useState } from "react";
import AudioCard from "./AudioCard";
import { useSelector, useDispatch } from "react-redux";
import { setAudioArray } from "../state/reducers/soundTabReducers.js";

const Sidebar = (props) => {
  const [isFabHovered, setIsFabHovered] = useState(false);

  const audioArray = useSelector((state) => state.soundTab.audioArray);
  const dispatch = useDispatch();

  function handleCardDelete(id) {
    props.onDelete(id);
  }
  return (
    <div
      style={{
        backgroundColor: "#D6EAF8",
        color: "white",
        position: "absolute",
        top: 0,
        left: 0,
        height: "480px",        
        width: "18%" /* Adjust the width as needed */,
        minWidth: "120px",
        zIndex: "1",
        margin: "0",
        padding: "0",
        textAlign: "center",
      }}
    >
      {audioArray.map((audioItem) => {
        const { id, fileName, audioUrl } = audioItem;
        return (
          <AudioCard
            file={fileName}
            key={id}
            id={id}
            onDelete={handleCardDelete}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        onMouseEnter={() => setIsFabHovered(true)}
        onMouseLeave={() => setIsFabHovered(false)}
      >
        {isFabHovered && (
          <>
            <span
              onClick={props.triggerFileUpload}
              style={{
                margin: "6px 8px",
                cursor: "pointer",
                animation: "comeIn 0.5s ease-in-out",
              }}
            >
              <i className="fas fa-upload fa-lg fa-xl custom-icon-color"></i>
            </span>
            <span
              onClick={props.onRecordClick}
              style={{
                margin: "18px 12px",
                animation: "comeIn 0.5s ease-in-out",
                cursor: "pointer",
              }}
            >
              <i className="fa-solid fa-microphone fa-xl custom-icon-color"></i>
            </span>
          </>
        )}

        <button
          style={{
            backgroundColor: "#16589a",
            color: "white",
            border: "none",
            padding: "12px 17px",
            borderRadius: "50%",            
            transition: "background-color 0.9s ease-in-out",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
