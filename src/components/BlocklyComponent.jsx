// Updated BlocklyComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import Blockly from "blockly";
import { Logic } from "./BlockCategories/Logic";
import { Loops } from "./BlockCategories/Loops";
import { Math } from "./BlockCategories/Math";
import { Text } from "./BlockCategories/Text";
import initializeBlockly from "./InitializeBlockly"; // import the function
import { Sounds } from "./BlockCategories/Sounds";
import { javascriptGenerator } from "blockly/javascript";
import { store } from "../store/store";
import { setIsPlaying, setVolume } from "../state/reducers/audioSlice";
import { WaveSurferContext } from "../contexts/waveSurferContext";
import { useContext } from "react";
const audioContext = new (window.AudioContext)();
import { FileContext } from "../contexts/fileContext.jsx";

function arrayBufferToDataURL(buffer) {
  const blob = new Blob([buffer], { type: 'audio/wav' }); // Adjust the MIME type if needed
  const url = URL.createObjectURL(blob);
  return url;
}

const BlocklyComponent = () => {
  const {wavesurferObj, setWavesurferObj} = useContext(WaveSurferContext);
  const [isWavesurferReady, setIsWavesurferReady] = useState(false);

  const {fileURL, setFileURL} = useContext(FileContext);

  const blocklyRef = useRef(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const workspace = Blockly.getMainWorkspace();

  const generateCode = async () => {
    javascriptGenerator.addReservedWords("code");
    var code = javascriptGenerator.workspaceToCode(workspace);
    setGeneratedCode(code);
    await eval(`(async () => { ${code} })();`);
  };

  // To handle Wavesurfer object
  useEffect(() => {
    if(wavesurferObj){
      setIsWavesurferReady(true);
    }
  },[wavesurferObj]);

  // function playSound(){
  //   if(isWavesurferReady){
  //     console.log(wavesurferObj.backend.buffer);

  //     // const oldAudioBuffer = wavesurferObj.backend.buffer;
  //     // const newBuffer = audioContext.createBuffer(
  //     //   oldAudioBuffer.numberOfChannels,
  //     //   oldAudioBuffer.length / oldAudioBuffer.numberOfChannels,
  //     //   oldAudioBuffer.sampleRate
  //     // )
      

  //     // for(let channel = 0; channel < newBuffer.numberOfChannels; channel++){
  //     //   const channelData = newBuffer.getChannelData(channel);
  //     //   for(let i = 0; i < newBuffer.length; i++){
  //     //     channelData[i] = oldAudioBuffer[i * oldAudioBuffer.numberOfChannels + channel];
  //     //   }
  //     // }

  //     // const source = audioContext.createBufferSource();
  //     // source.buffer = newBuffer;

  //     // source.connect(audioContext.destination);
  //     // console.log("I am playing");
  //     // source.start();  

  //     // source.onerror = function (event) {
  //     //   console.error('Error playing audio:', event);
  //     // };
      
  //     const audio = new Audio(fileURL);
  //     audio.play();
  //   }
  //   else
  //     console.log("Wavesurfer not ready");
  // }  
  

  useEffect(() => {    
      // Initialize Blockly with English
      Blockly.setLocale("en");
      // Construct the complete toolbox XML
      const toolboxXml = `
        <xml id="toolbox" style="display: none">
          ${Logic}
          ${Loops}
          ${Math}
          ${Text}
          ${Sounds}
        </xml>
      `;

      if(!blocklyRef.current){
        initializeBlockly(toolboxXml); // Initialize Blockly using the separate function
        blocklyRef.current = true;
      }

      // Ensure that the workspace is ready before adding the change listener
    const workspaceReadyInterval = setInterval(() => {
      const currentWorkspace = Blockly.getMainWorkspace();
      if (currentWorkspace) {
        clearInterval(workspaceReadyInterval);

        // Set up event listener for block click events
        currentWorkspace.addChangeListener(function (event) {
          if (event.type === Blockly.Events.BLOCK_CLICK) {
            // Handle block click event
            const block = currentWorkspace.getBlockById(event.blockId);
            if (block) {
              block.handleClick_();
            }
          }
        });
      }
    }, 100);
    
  }, [blocklyRef]);

  return (
    <div style={{ width: "100%", height: "480px" }}>
      <h1
        style={{
          display: "inline-block",
          fontSize: "14px",
          marginRight: "500px",
        }}
      >
        Blockly Toolbox
      </h1>
      <h1 style={{ display: "inline-block", fontSize: "14px" }}>
        Blockly Workspace
      </h1>
      <div
        className="highlighted"
        id="blocklyDiv"
        style={{ height: "100%", width: "100%", position: "relative" }}
      ></div>
      <button onClick={generateCode}>Generate Code</button>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
        <br></br>
        {generatedCode}
      </pre>
    </div>
  );
};

export default BlocklyComponent;
