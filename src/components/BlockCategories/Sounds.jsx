// BlocklyBlocksAndCategory.js
import Blockly from "blockly";
import { setIsPlaying, setVolume } from "../../state/reducers/audioSlice";
import { useDispatch } from "react-redux";
import { javascriptGenerator } from 'blockly/javascript';
// import { FileContext } from "../../contexts/fileContext";
// import { useContext } from "react";


// Category definition
export const Sounds = `
  <category name="Sounds" colour="">
    <block type="play_sound"></block>
    <block type="stop_sound"></block>
    <block type="change_by_effect"></block>
    <block type="set_by_effect"></block>
    <block type="clear_sound_effects"></block>
    <block type="change_volume_by"></block>
    <block type="set_volume_to"></block>
  </category>
`;



// Define the 'play_sound' block
Blockly.Blocks["play_sound"] = {
  init: function () {
    this.appendDummyInput().appendField("Play Sound");
    this.appendDummyInput()
      .appendField("Sound Name:")
      .appendField(new Blockly.FieldTextInput("defaultsound"), "SOUND_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Play a sound");
  }, 
};
// Generator code for 'play_sound' block
javascriptGenerator["play_sound"] = function (block) {
  var soundName = block.getFieldValue("SOUND_NAME");      
  var code = `  
    const audio = new Audio(fileURL);
    audio.play();
  `;
  console.log(code);
  return code;
};



Blockly.Blocks["stop_sound"] = {
  init: function () {
    this.appendDummyInput().appendField("Stop Sound");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Stop the currently playing sound");
  },
};

// Generator code for 'stop_sound' block
javascriptGenerator["stop_sound"] = function (block) {
  var code = " audio.pause(); \n audio.currentTime = 0;";
  console.log(code);
  return code;
};

// Define the 'change_by_effect' block
Blockly.Blocks["change_by_effect"] = {
  init: function () {
    this.appendDummyInput().appendField("Change Sound by Effect");
    this.appendDummyInput()
      .appendField("Effect Type:")
      .appendField(new Blockly.FieldTextInput("pitch"), "EFFECT_TYPE");
    this.appendDummyInput()
      .appendField("Amount:")
      .appendField(new Blockly.FieldNumber(10), "AMOUNT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Change the sound by a specified effect");
  },
};

// Generator code for 'change_by_effect' block
javascriptGenerator["change_by_effect"] = function (block) {
  var effectType = block.getFieldValue("EFFECT_TYPE");
  var amount = block.getFieldValue("AMOUNT");
  var code = `
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  function pan(direction, ${amount}) {
    const panNode = audioContext.createStereoPanner();
    
    // Connect the panNode to the audioContext destination
    panNode.connect(audioContext.destination);
    
    // Set the pan value based on the direction and amount
    panNode.pan.value = direction === 'right' ? ${amount} : -${amount};
    
    // Connect the audioSource to the panNode
    const audioSource = audioContext.createBufferSource();
    audioSource.connect(panNode);

    // Start playing the audio source (replace this with your actual audio source)
    audioSource.start();

    // Stop the audio source after a certain duration (adjust as needed)
    audioSource.stop(audioContext.currentTime + 2);
  }
  function changePitch(${amount}) {
    // Use the Web Audio API to change the pitch
    var pitchEffect = audioContext.createPitchShift();
    pitchEffect.pitch = ${amount}; // Set the pitch shift amount

    // Connect the audio source to the pitch shifter
    const sourceNode = audioContext.createBufferSource();
    sourceNode.disconnect();
    sourceNode.connect(pitchEffect);

    // Connect the pitch shifter to the audio context destination
    pitchEffect.connect(audioContext.destination);
  }

  switch (${effectType}) {
    case 'pitch':
      changePitch(${amount});
      break;
    case 'panRight':
      pan('right', ${amount});
      break;
    case 'panLeft':
      pan('left', ${amount});
      break;
    // Add more cases for other effects if needed
    default:
      console.error('Unknown effect type:', ${effectType});
  }
  `;
  console.log(code);
  return code;
};

// Define the 'set_by_effect' block
Blockly.Blocks["set_by_effect"] = {
  init: function () {
    this.appendDummyInput().appendField("Set Sound by Effect");
    this.appendDummyInput()
      .appendField("Effect Type:")
      .appendField(new Blockly.FieldTextInput("pitch"), "EFFECT_TYPE");
    this.appendDummyInput()
      .appendField("Value:")
      .appendField(new Blockly.FieldNumber(50), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set the sound by a specified effect");
  },
  // Generator code for 'set_by_effect' block
  generateCode: function (block) {
    var effectType = block.getFieldValue("EFFECT_TYPE");
    var value = block.getFieldValue("VALUE");
    return `setSoundByEffect("${effectType}", ${value});\n`;
  },
};

// Define the 'clear_sound_effects' block
Blockly.Blocks["clear_sound_effects"] = {
  init: function () {
    this.appendDummyInput().appendField("Clear Sound Effects");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Clear all sound effects");
  },
  // Generator code for 'clear_sound_effects' block
  generateCode: function (block) {
    return "clearSoundEffects();\n";
  },
};

// Define the 'change_volume_by' block
Blockly.Blocks["change_volume_by"] = {
  init: function () {
    this.appendDummyInput().appendField("Change Volume by");
    this.appendDummyInput()
      .appendField("Amount:")
      .appendField(new Blockly.FieldNumber(10), "AMOUNT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Change the volume by a specified amount");
  },
  // Generator code for 'change_volume_by' block
  generateCode: function (block) {
    var amount = block.getFieldValue("AMOUNT");
    return `changeVolumeBy(${amount});\n`;
  },
};

// Define the 'set_volume_to' block
Blockly.Blocks["set_volume_to"] = {
  init: function () {
    this.appendDummyInput().appendField("Set Volume to");
    this.appendDummyInput()
      .appendField("Volume:")
      .appendField(new Blockly.FieldNumber(50), "VOLUME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set the volume to a specified value");
  },
  // Generator code for 'set_volume_to' block
  generateCode: function (block) {
    var volume = block.getFieldValue("VOLUME");
    return `setVolumeTo(${volume});\n`;
  },
};

