import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAudioState,
  setActiveWaveform,
} from "../state/reducers/soundTabReducers";
import { FileContext } from "../contexts/fileContext";
import { useContext } from "react";

const AudioCard = (props) => {
  const dispatch = useDispatch();
  const audioState = useSelector((state) => state.soundTab.audioState);
  const { showAudioWaveform, showDefaultAudioWaveform, fileName } = audioState;
  const audioArray = useSelector((state) => state.soundTab.audioArray);

  const { fileURL, setFileURL } = useContext(FileContext);

  function handleDelete(e) {
    e.stopPropagation();
    props.onDelete(props.id);
  }

  function handleClick() {
    const obj = audioArray.find((audioItem) => {
      return audioItem.id == props.id;
    });
    console.log(obj);
    // setFileURL(obj.audioUrl);
    dispatch(setActiveWaveform(obj));
  }

  return (
    <div className="card" onClick={handleClick}>
      <img
        src="/soundicon.png" // Replace with the actual path to your image
        alt="Small Image"
        style={{
          width: "50px", // Adjust the width of the image
          height: "50px",
          borderRadius: "17px",
          marginBottom: "30px", // Adjust the height of the image
        }}
      />
      <p
        style={{
          fontSize: "14px",
          position: "absolute",
          top: "60%",
          left: "8%",
          width: "100px",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {props.file}
      </p>

      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          fontSize: "12px",
          border: "none",
          background: "transparent",
        }}
      >
        <img
          src="/delete_120.png" // Replace 'path/to/delete-image.png' with the actual path to your delete image
          alt="Delete"
          style={{
            width: "20px", // Set a fixed width for the image
            height: "20px", // Set a fixed height for the image
          }}
        />
      </button>
    </div>
  );
};

export default AudioCard;
