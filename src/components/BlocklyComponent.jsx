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
import { WaveSurferContext } from "../contexts/waveSurferContext";
import { useContext } from "react";
const audioContext = new (window.AudioContext)();
import { FileContext } from "../contexts/fileContext.jsx";
import { bufferToWave } from "./bufferToWave.jsx";
import { useSelector } from "react-redux";

function getFileName(){
  const audioState = useSelector((state) => state.soundTab.audioState);
  const { showAudioWaveform, showDefaultAudioWaveform, fileName } = audioState;
  if(fileName == "")
    return "Default sound"
  else
    return fileName;
}

const BlocklyComponent = () => {
  const { wavesurferObj, setWavesurferObj } = useContext(WaveSurferContext);
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
    if (wavesurferObj) {
      setIsWavesurferReady(true);
      console.log(wavesurferObj);
    }
  }, [wavesurferObj]);

  function playSound(){
    if(isWavesurferReady){
      console.log(wavesurferObj.backend.buffer);

      // const oldAudioBuffer = wavesurferObj.backend.buffer;
      // const newBuffer = audioContext.createBuffer(
      //   oldAudioBuffer.numberOfChannels,
      //   oldAudioBuffer.length / oldAudioBuffer.numberOfChannels,
      //   oldAudioBuffer.sampleRate
      // )


      // for(let channel = 0; channel < newBuffer.numberOfChannels; channel++){
      //   const channelData = newBuffer.getChannelData(channel);
      //   for(let i = 0; i < newBuffer.length; i++){
      //     channelData[i] = oldAudioBuffer[i * oldAudioBuffer.numberOfChannels + channel];
      //   }
      // }

      // const source = audioContext.createBufferSource();
      // source.buffer = newBuffer;

      // source.connect(audioContext.destination);
      // console.log("I am playing");
      // source.start();  

      // source.onerror = function (event) {
      //   console.error('Error playing audio:', event);
      // };
      var abuffer = wavesurferObj.backend.buffer;
      var length = abuffer.length;
      const audioUrl = bufferToWave(abuffer, 0, length);
      return audioUrl;     
    }
    else
      console.log("Wavesurfer not ready");
  }  


  function pan(direction, value) {
    const panNode = audioContext.createStereoPanner();

    // Connect the panNode to the audioContext destination
    panNode.connect(audioContext.destination);

    // Set the pan value based on the direction and amount
    panNode.pan.value = direction === 'right' ? value : - value;

    // Connect the audioSource to the panNode
    const audioSource = audioContext.createBufferSource();
    audioSource.connect(panNode);

    // Start playing the audio source (replace this with your actual audio source)
    audioSource.start();

    // Stop the audio source after a certain duration (adjust as needed)
    audioSource.stop(audioContext.currentTime + 2);
  }

  const name = getFileName();
  useEffect(() => {
    // Wait for the Blockly workspace to be ready    
    const intervalId = setInterval(() => {
      
      const workspace = Blockly.getMainWorkspace();
      if (workspace) {
        // Blockly workspace is ready
        clearInterval(intervalId);

        // Get the current block definition
        const oldDefinition_play = Blockly.Blocks['play_sound'];
        const oldDefinition_start = Blockly.Blocks['start_sound'];
        

        // Create a new block definition with the updated field value
        const newDefinition_play = {
          ...oldDefinition_play,
          init: function () {
            this.appendDummyInput().appendField("Set Sound");
            this.appendDummyInput()
              .appendField("Sound Name:")
              .appendField(new Blockly.FieldTextInput(`${name}`), "SOUND_NAME");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("Play a sound");
          },
        };
        const newDefinition_start = {
          ...oldDefinition_start,
          init: function () {
            this.appendDummyInput().appendField("Start Sound");
            this.appendDummyInput()
              .appendField("Sound Name:")
              .appendField(new Blockly.FieldTextInput(`${name}`), "SOUND_NAME");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("Start playing a sound");
          },
        }

        // Unregister the old block
        delete Blockly.Blocks['play_sound'];
        delete Blockly.Blocks['start_sound'];
        Blockly.Blocks['play_sound'] = newDefinition_play;
        Blockly.Blocks['start_sound'] = newDefinition_start;

        // Clear the workspace and add the new block
        workspace.clear();        
      }
    }, 100); // Check every 100 milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once on mount

  
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

    if (!blocklyRef.current) {
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
