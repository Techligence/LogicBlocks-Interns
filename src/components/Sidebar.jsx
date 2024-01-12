// Sidebar.jsx
import React, { useState } from "react";
import AudioCard from "./AudioCard";
import { useSelector, useDispatch } from "react-redux";
import {setAudioArray} from "../state/reducers/soundTabReducers.js";


const Sidebar = (props) => {
    const audioArray = useSelector(state => state.soundTab.audioArray);
    const dispatch = useDispatch();

    function handleCardDelete(id){        
        props.onDelete(id);
    }
    return (
        <div style={{
            backgroundColor: "#6bb3fa",
            color: "white",
            position: "absolute",
            top: 0,
            left: 0,
            height: "480px",
            width: "18%", /* Adjust the width as needed */
            minWidth: "120px",
            zIndex: "1",
            margin: "0",
            padding: "0",
            textAlign: "center",
        }}>            
            {audioArray.map((audioItem) => {
                const {id, fileName, audioUrl} = audioItem;
                return (
                    <AudioCard file={fileName} key={id} id={id} onDelete={handleCardDelete}/>
                )
            })}            
            <button onClick={props.triggerFileUpload} style={{
                position: "absolute", 
                bottom: "10px",
                margin: "5px auto"
            }}>Upload</button>
        </div>
    );
};

export default Sidebar;
