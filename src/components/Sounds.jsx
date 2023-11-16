// Sounds.jsx
import React from "react";
import UploadAudio from "./UploadAudio";

export default function Books({ history }) {
  return (
    <div
      style={{
        width: "100%",
        height: "480px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          display: "inline-block",
          fontSize: "14px",
          marginRight: "500px",
        }}
      ></h1>

      <div
        className="highlighted"
        id="soundBlocklyDiv"
        style={{
          width: "100%",
          position: "absolute",
          top: 22.5,
          left: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <UploadAudio history={history} />
      </div>
    </div>
  );
}
