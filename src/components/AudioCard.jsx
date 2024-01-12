import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAudioState, setActiveWaveform } from "../state/reducers/soundTabReducers";
import { FileContext } from "../contexts/fileContext";
import { useContext } from "react";


const AudioCard = (props) => {
    const dispatch = useDispatch();
    const audioState = useSelector(state => state.soundTab.audioState);
    const {showAudioWaveform, showDefaultAudioWaveform, fileName} = audioState;
    const audioArray = useSelector(state => state.soundTab.audioArray);

    const {fileURL, setFileURL} = useContext(FileContext);

    function handleDelete(e){
        e.stopPropagation();
        props.onDelete(props.id);        
    }

    function handleClick(){
        const obj = audioArray.find((audioItem) => {
            return audioItem.id == props.id;
        })
        console.log(obj);
        // setFileURL(obj.audioUrl);
        dispatch(setActiveWaveform(obj));

    }

    return (
        <div style={{
            height: "100px",
            width: "100px",
            backgroundColor: "#facc57",
            borderRadius: "20px",
            border: "1px solid white",
            margin: "1rem auto",
            position: "relative",
            textAlign: "center",
        }} onClick={handleClick}>

            <p style={{
                fontSize: "12px",
                position: "absolute",
                top: "35%",
                left: "5%"
            }}>{props.file}</p>

            <button
                onClick={handleDelete}
                style={{
                    position: "absolute",
                    top: "5%",
                    right: "5%",
                    fontSize: "12px",
                }}
            >
                Delete
            </button>
        </div>
    )
}

export default AudioCard;