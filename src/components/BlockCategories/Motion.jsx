import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { pythonGenerator } from "blockly/python";

export const Motion = `
  <category name="Motion">
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
