import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
Blockly.JavaScript = javascriptGenerator;
import { pythonGenerator } from "blockly/python";

import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'

// Block for FLAG_CLICKED event trigger.
Blockly.Blocks["flag_clicked_event"] = {
  init: function () {
    this.appendDummyInput().appendField("When flag clicked");
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

// JavaScript code generator for 'flag_clicked_event' block
javascriptGenerator.forBlock["flag_clicked_event"] = function (
  block,
  generator
) {
  // TODO: Assemble javascript into code variable.
  var code = `whenFlagClicked();\n`;
  return code;
};

// Python code generator
pythonGenerator.forBlock["flag_clicked_event"] = function (block, generator) {
  var code = "whenFlagClicked();\n";
  return code;
};

// flag clidked Event
const flagClickedEvent = function (block) {
  const code = `whenFlagClicked();\n`;
  // console.log(code);
  return code;
};

Blockly.JavaScript["flag_clicked_event"] = flagClickedEvent;

export { flagClickedEvent };

// Block for event trigger.
Blockly.Blocks["event_trigger"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("when")
      .appendField(new Blockly.FieldTextInput("Event_Name"), "EVENT_NAME")
      .appendField("is triggered");
    this.setNextStatement(true, null);
    this.setColour(300);
  },
};
// JavaScript code generator for 'event_trigger' block
Blockly.JavaScript["event_trigger"] = function (block) {
  const eventName = block.getFieldValue("EVENT_NAME");
  const code = `whenEventTriggered("${eventName}");\n`;
  // console.log(code);
  return code;
};
pythonGenerator.forBlock["event_trigger"] = function (block, generator) {
  const eventName = block.getFieldValue("EVENT_NAME");
  const code = `whenEventTriggered("${eventName}");\n`;
  return code;
};

// Blockly block definition for 'key_press_event'
Blockly.Blocks["key_press_event"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("When key is pressed")
      .appendField(
        new Blockly.FieldDropdown([
          ["SPACE", "KEY_SPACE"],
          ["A", "KEY_A"],
          ["B", "KEY_B"],
          ["C", "KEY_C"],
          // Add more keys as needed...
        ]),
        "KEY_NAME"
      );
    this.setNextStatement(true, null);
    this.setColour(300);
  },
};

// JavaScript code generator for 'key_press_event' block
Blockly.JavaScript["key_press_event"] = function (block) {
  const keyName = block.getFieldValue("KEY_NAME");
  const code = `whenKeyPressed("${keyName}");\n`;
  console.log("Generated Code:", code);
  return code;
};
pythonGenerator.forBlock["key_press_event"] = function (block, generator) {
  const keyName = block.getFieldValue("KEY_NAME");
  const code = `whenKeyPressed("${keyName}");\n`;
  return code;
};

// Block for SPRITE_CLICK event trigger.
Blockly.Blocks["sprite_clicked_event"] = {
  init: function () {
    this.appendDummyInput().appendField("When this sprite clicked");
    this.setNextStatement(true, null);
    this.setColour(300);
  },
};
// JavaScript code generator for 'sprite_clicked_event' block
const spriteClickedEvent = function (block) {
  const code = `whenSpriteClicked();\n`;
  // console.log(code);
  return code;
};
Blockly.JavaScript["sprite_clicked_event"] = spriteClickedEvent;
export { spriteClickedEvent };

pythonGenerator.forBlock["sprite_clicked_event"] = function (block, generator) {
  const code = `whenSpriteClicked();\n`;
  // console.log(code);
  return code;
};

// Block for BACKDROP_SWITCH event trigger.
Blockly.Blocks["when_backdrop_switches_to"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("When backdrop switches to")
      .appendField(
        new Blockly.FieldDropdown([
          ["Backdrop1", "BACKDROP1"],
          // ['Backdrop2', 'BACKDROP2'],
          // ['Backdrop3', 'BACKDROP3'],
          // Add more backdrops as needed...
        ]),
        "BACKDROP_NAME"
      );
    this.setNextStatement(true, null);
    this.setColour(300);
  },
};
// JavaScript code generator for 'when_backdrop_switches_to' block
Blockly.JavaScript["when_backdrop_switches_to"] = function (block) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `whenBackdropSwitchesTo("${backdropName}");\n`;
  // console.log(code);
  return code;
};

pythonGenerator.forBlock["when_backdrop_switches_to"] = function (
  block,
  generator
) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `whenBackdropSwitchesTo("${backdropName}");\n`;
  // console.log(code);
  return code;
};
// Block for DROPDOWN_GREATER-THAN event trigger.
Blockly.Blocks["when_dropdown_greater_than_input"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("When")
      .appendField(
        new Blockly.FieldDropdown([
          ["Loudness", "OPTION1"],
          ["Timer", "OPTION2"],
          // ['Option 3', 'OPTION3'],
          // Add more dropdown options as needed...
        ]),
        "DROPDOWN_NAME"
      )
      .appendField(">")
      .appendField(new Blockly.FieldNumber(0), "INPUT_VALUE");
    this.setNextStatement(true, null);
    this.setColour(300);
  },
};
// JavaScript code generator for 'when_dropdown_greater_than_input' block
Blockly.JavaScript["when_dropdown_greater_than_input"] = function (block) {
  const dropdownName = block.getFieldValue("DROPDOWN_NAME");
  const inputValue = block.getFieldValue("INPUT_VALUE");
  const code = `whenDropdownGreaterThanInput("${dropdownName}", ${inputValue});\n`;
  // console.log(code);
  return code;
};
pythonGenerator.forBlock["when_dropdown_greater_than_input"] = function (
  block,
  generator
) {
  const dropdownName = block.getFieldValue("DROPDOWN_NAME");
  const inputValue = block.getFieldValue("INPUT_VALUE");
  const code = `whenDropdownGreaterThanInput("${dropdownName}", ${inputValue});\n`;
  // console.log(code);
  return code;
};
// Block for WHEN_I_RECEIVE_MESSAGE event trigger.
Blockly.Blocks["when_i_receive_dropdown"] = {
  init: function () {
    this.messageOptions = [
      ["Message1", "BACKDROP1"],
      ["New Message", "NEW_MESSAGE"],
      // Add more existing options here...
    ];

    this.appendDummyInput()
      .appendField("When I receive")
      .appendField(
        new Blockly.FieldDropdown(this.generateDropdownOptions.bind(this)),
        "BACKDROP_NAME"
      );
    this.setNextStatement(true, null);
    this.setColour(300);
  },

  generateDropdownOptions: function () {
    return this.messageOptions;
  },

  onchange: function (event) {
    if (event.element == "field" && event.name == "BACKDROP_NAME") {
      let dropdownValue = this.getFieldValue("BACKDROP_NAME");
      if (dropdownValue === "NEW_MESSAGE") {
        let newMessage = prompt("Enter the new message:");
        if (newMessage !== null && newMessage.trim() !== "") {
          let messageKey = newMessage.toUpperCase().replace(/\s/g, "_");
          this.messageOptions.push([newMessage, messageKey]);
          this.getField("BACKDROP_NAME").setValue(messageKey);
          this.getField("BACKDROP_NAME").setOptions(this.messageOptions);
        }
      }
    }
  },
};
// JavaScript code generator for 'when_i_receive_dropdown' block
Blockly.JavaScript["when_i_receive_dropdown"] = function (block) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `whenIReceive("${backdropName}");\n`;
  // console.log(code);
  return code;
};
pythonGenerator.forBlock["when_i_receive_dropdown"] = function (
  block,
  generator
) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `whenIReceive("${backdropName}");\n`;
  // console.log(code);
  return code;
};

// Block for BROADCAST event trigger.
Blockly.Blocks["broadcast"] = {
  init: function () {
    this.messageOptions = [
      ["Message1", "BACKDROP1"],
      ["New Message", "NEW_MESSAGE"],
      // Add more existing options here...
    ];

    this.appendDummyInput()
      .appendField("Broadcast")
      .appendField(
        new Blockly.FieldDropdown(this.generateDropdownOptions.bind(this)),
        "BACKDROP_NAME"
      );
    this.setNextStatement(true, null);
    this.setColour(300);
  },

  generateDropdownOptions: function () {
    return this.messageOptions;
  },

  onchange: function (event) {
    if (event.element == "field" && event.name == "BACKDROP_NAME") {
      let dropdownValue = this.getFieldValue("BACKDROP_NAME");
      if (dropdownValue === "NEW_MESSAGE") {
        let newMessage = prompt("Enter the new message:");
        if (newMessage !== null && newMessage.trim() !== "") {
          let messageKey = newMessage.toUpperCase().replace(/\s/g, "_");
          this.messageOptions.push([newMessage, messageKey]);
          this.getField("BACKDROP_NAME").setValue(messageKey);
          this.getField("BACKDROP_NAME").setOptions(this.messageOptions);
        }
      }
    }
  },
};
// JavaScript code generator for 'broadcast' block

Blockly.JavaScript["broadcast"] = function (block) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `broadcast("${backdropName}");\n`;
  // console.log(code);
  return code;
};
pythonGenerator.forBlock["broadcast"] = function (block, generator) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `broadcast("${backdropName}");\n`;
  // console.log(code);
  return code;
};

// Block for BROADCAST_MESSAGE_AND_WAIT event trigger.
Blockly.Blocks["broadcast_message_and_wait"] = {
  init: function () {
    this.messageOptions = [
      ["Message1", "BACKDROP1"],
      ["New Message", "NEW_MESSAGE"],
      // Add more existing options here...
    ];

    this.appendDummyInput()
      .appendField("Broadcast")
      .appendField(
        new Blockly.FieldDropdown(this.generateDropdownOptions.bind(this)),
        "BACKDROP_NAME"
      )
      .appendField("and wait");
    this.setNextStatement(true, null);
    this.setColour(300);
  },

  generateDropdownOptions: function () {
    return this.messageOptions;
  },

  onchange: function (event) {
    if (event.element == "field" && event.name == "BACKDROP_NAME") {
      let dropdownValue = this.getFieldValue("BACKDROP_NAME");
      if (dropdownValue === "NEW_MESSAGE") {
        let newMessage = prompt("Enter the new message:");
        if (newMessage !== null && newMessage.trim() !== "") {
          let messageKey = newMessage.toUpperCase().replace(/\s/g, "_");
          this.messageOptions.push([newMessage, messageKey]);
          this.getField("BACKDROP_NAME").setValue(messageKey);
          this.getField("BACKDROP_NAME").setOptions(this.messageOptions);
        }
      }
    }
  },
};

// JavaScript code generator for 'broadcast_message_and_wait' block
Blockly.JavaScript["broadcast_message_and_wait"] = function (block) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `broadcastAndWait("${backdropName}");\n`;
  // console.log(code);
  return code;
};
pythonGenerator.forBlock["broadcast_message_and_wait"] = function (
  block,
  generator
) {
  const backdropName = block.getFieldValue("BACKDROP_NAME");
  const code = `broadcastAndWait("${backdropName}");\n`;
  // console.log(code);
  return code;
};


// ================================== Arduino Code =============================================
Arduino['flag_clicked_event'] = function() {
  var code = 'whenFlagClicked';
  console.log(code);
  return code
}

Arduino['event_trigger'] = function () {
  var eventName = this.getFieldValue('EVENT_NAME');
  var code = 'when ' + eventName + ' is triggered\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['key_press_event'] = function () {
  var keyName = this.getFieldValue('KEY_NAME');
  var code = 'whenkeyIsPressed ' + keyName + '\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['sprite_clicked_event'] = function() {
  var code = 'whenThisSpriteClicked';
  console.log(code);
  return code
}

Arduino['when_backdrop_switches_to'] = function () {
  var keyName = this.getFieldValue('BACKDROP_NAME');
  var code = 'whenBackDropSwitchesTo ' + keyName + '\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['when_dropdown_greater_than_input'] = function () {
  var dropdownOptions = {
    'OPTION1': 'Loudness',
    'OPTION2': 'Timer',
    // Add mappings for more options if needed...
  };

  var dropdownName = this.getFieldValue('DROPDOWN_NAME');
  var selectedOption = dropdownOptions[dropdownName];
  var inputValue = this.getFieldValue('INPUT_VALUE');
  var code = 'when ' + selectedOption + ' > ' + inputValue + '\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['when_i_receive_dropdown'] = function () {
  var dropdownValue = this.getFieldValue('BACKDROP_NAME');
  var code = 'whenIReceive ' + dropdownValue + '\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['broadcast'] = function () {
  var dropdownValue = this.getFieldValue('BACKDROP_NAME');
  var code = 'broadcast ' + dropdownValue + '\n';
  console.log("Arduino" + code);
  return code;
};

Arduino['broadcast_message_and_wait'] = function () {
  var dropdownValue = this.getFieldValue('BACKDROP_NAME');
  var code = 'broadcast ' + dropdownValue + ' and wait event: \n';
  console.log("Arduino" + code);
  return code;
};

// JavaScript code for generating category XML
export const Events = `
  <category name="Events" colour="#5c81a6">
      <block type="flag_clicked_event"></block>
      <block type="event_trigger"></block>
      <block type="key_press_event"></block>
      <block type="sprite_clicked_event"></block>
      <block type="when_backdrop_switches_to"></block>
      <block type="when_dropdown_greater_than_input"></block>
      <block type="when_i_receive_dropdown"></block>
      <block type="broadcast"></block>
      <block type="broadcast_message_and_wait"></block>
      <!-- Other event blocks go here... -->
  </category>
  `;


