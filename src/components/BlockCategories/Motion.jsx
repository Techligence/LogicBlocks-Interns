import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";

import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'

export const Motion = `
  <category name="Motion" colour="#5c81a6">
    <block type="move_steps"></block>
    <block type="turn_right"></block>
    <block type="turn_left"></block>
    <block type="point_in_direction"></block>
    <block type="point_toward_menu"></block>
    <block type="go_to_menu"></block>
  </category>
`;

// Block Injection
Blockly.Blocks["move_steps"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldNumber(10), "STEPS")
      .appendField("steps");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["turn_right"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn Right")
      .appendField(new Blockly.FieldNumber(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["turn_left"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn Left")
      .appendField(new Blockly.FieldNumber(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["point_in_direction"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Point in Direction")
      .appendField(new Blockly.FieldAngle(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["point_toward_menu"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Point Toward")
      .appendField(
        new Blockly.FieldDropdown([["Mouse Pointer", "mouse_pointer"]]),
        "DIRECTION"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

Blockly.Blocks["go_to_menu"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Go To")
      .appendField(
        new Blockly.FieldDropdown([
          ["Random Position", "random_position"],
          ["Mouse Pointer", "mouse_pointer"],
        ]),
        "DESTINATION"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  },
};

// JavaScript code generators
javascriptGenerator["move_steps"] = function (block) {
  const steps = block.getFieldValue("STEPS");
  return `moveSprite(${steps}, 0);\n`;
};
pythonGenerator["move_steps"] = function (block, generator) {
  const steps = block.getFieldValue("STEPS");
  return `moveSprite(${steps}, 0)\n`;
};

javascriptGenerator["turn_right"] = function (block) {
  const degrees = block.getFieldValue("DEGREES");
  return `turnRight(${degrees});\n`;
};

pythonGenerator["turn_right"] = function (block, generator) {
  const degrees = block.getFieldValue("DEGREES");
  return `turnRight(${degrees})\n`;
};

javascriptGenerator["turn_left"] = function (block) {
  const degrees = block.getFieldValue("DEGREES");
  return `turnLeft(${degrees});\n`;
};
pythonGenerator["turn_left"] = function (block, generator) {
  const degrees = block.getFieldValue("DEGREES");
  return `turnLeft(${degrees})\n`;
};
javascriptGenerator["point_in_direction"] = function (block) {
  const degrees = block.getFieldValue("DEGREES");
  return `pointInDirection(${degrees});\n`;
};
pythonGenerator["point_in_direction"] = function (block, generator) {
  const degrees = block.getFieldValue("DEGREES");
  return `pointInDirection(${degrees})\n`;
};
javascriptGenerator["point_toward_menu"] = function (block) {
  const direction = block.getFieldValue("DIRECTION");
  return `pointTowardMenu("${direction}");\n`;
};
pythonGenerator["point_toward_menu"] = function (block, generator) {
  const direction = block.getFieldValue("DIRECTION");
  return `pointTowardMenu("${direction}")\n`;
};

javascriptGenerator["go_to_menu"] = function (block) {
  const destination = block.getFieldValue("DESTINATION");
  return `goToMenu("${destination}");\n`;
};

pythonGenerator["go_to_menu"] = function (block, generator) {
  const destination = block.getFieldValue("DESTINATION");
  return `goToMenu("${destination}")\n`;
};


// ============================= Arduino Code =============================
// Move Steps Block
Arduino['move_steps'] = function () {
  var steps = this.getFieldValue('STEPS');
  var code = 'moveRobot(' + steps + ');\n';  // Replace with actual function or code for moving steps
  console.log("Arduino" + code);
  return code;
};

// Turn Right Block
Arduino['turn_right'] = function () {
  var degrees = this.getFieldValue('DEGREES');
  var code = 'turnRight(' + degrees + ');\n';  // Replace with actual function or code for turning right
  console.log("Arduino" + code);
  return code;
};

// Turn Left Block
Arduino['turn_left'] = function () {
  var degrees = this.getFieldValue('DEGREES');
  var code = 'turnLeft(' + degrees + ');\n';  // Replace with actual function or code for turning left
  console.log("Arduino" + code);
  return code;
};

// Point in Direction Block
Arduino['point_in_direction'] = function () {
  var degrees = this.getFieldValue('DEGREES');
  var code = 'pointInDirection(' + degrees + ');\n';  // Replace with actual function or code for pointing in direction
  console.log("Arduino" + code);
  return code;
};

// Point Toward Menu Block
Arduino['point_toward_menu'] = function () {
  var direction = this.getFieldValue('DIRECTION');
  var code = 'pointToward(' + direction + ');\n';  // Replace with actual function or code for pointing toward
  console.log("Arduino" + code);
  return code;
};

// Go To Menu Block
Arduino['go_to_menu'] = function () {
  var destination = this.getFieldValue('DESTINATION');
  var code = 'goTo(' + destination + ');\n';  // Replace with actual function or code for going to destination
  console.log("Arduino" + code);
  return code;
};




