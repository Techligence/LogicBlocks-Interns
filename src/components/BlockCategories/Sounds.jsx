// BlocklyBlocksAndCategory.js
import Blockly from "blockly";

// Block definitions
Blockly.Blocks["play_sound"] = {
  init: function () {
    this.appendDummyInput().appendField("Play Sound");
    this.appendDummyInput()
      .appendField("Sound Name:")
      .appendField(new Blockly.FieldTextInput("meow"), "SOUND_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Play a sound");
  },
};

Blockly.Blocks["stop_all_sounds"] = {
  init: function () {
    this.appendDummyInput().appendField("Stop All Sounds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Stops all currently playing sounds.");
  },
};

Blockly.Blocks["clear_sound"] = {
  init: function () {
    this.appendDummyInput().appendField("Clear Sound");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Clears the currently playing sound.");
  },
};

// // JavaScript code generation for the blocks
// Blockly.JavaScript["play_sound"] = function (block) {
//   const soundName = block.getFieldValue("SOUND_NAME");
//   // Add JavaScript code to handle the behavior of playing the specified sound
//   return `playSound('${soundName}');`;
// };

// Blockly.JavaScript["stop_all_sounds"] = function (block) {
//   // Add JavaScript code to handle the behavior of stopping all sounds
//   return "stopAllSounds();";
// };

// Blockly.JavaScript["clear_sound"] = function (block) {
//   // Add JavaScript code to handle the behavior of clearing the currently playing sound
//   return "clearSound();";
// };

// Category definition
export const Sounds = `
  <category name="Sounds" colour="#FFD43E" categorystyle="sound_category">
    <block type="play_sound"></block>
    <block type="stop_all_sounds"></block>
    <block type="clear_sound"></block>
  </category>
`;
