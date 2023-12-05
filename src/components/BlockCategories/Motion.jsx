import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
export const Motion = `
  <category name="Motion">
    <block type="move_steps"></block>
    <block type="turn_right"></block>
    <block type="turn_left"></block>
    <block type="point_in_direction"></block>
    <block type="point_toward_menu"></block>
    <block type="go_to_menu"></block>
    <block type="go_to_xy"></block>
    <block type="glidesecstoxy"></block>
    <block type="glidesecstomenu"></block>
    <block type="changexby"></block>
    <block type="changeyby"></block>
    <block type="setxto"></block>
    <block type="setyto"></block>
    <block type="if_on_edge_bounce"></block>
    <block type="set_rotation_style"></block>
  </category>
`;


// Block Injection
Blockly.Blocks['move_steps'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Move")
      .appendField(new Blockly.FieldNumber(10), "STEPS")
      .appendField("steps");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};



Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Turn Right")
      .appendField(new Blockly.FieldNumber(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Turn Left")
      .appendField(new Blockly.FieldNumber(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['point_in_direction'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Point in Direction")
      .appendField(new Blockly.FieldAngle(90), "DEGREES")
      .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['point_toward_menu'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Point Toward")
      .appendField(new Blockly.FieldDropdown([
        ["Mouse Pointer", "mouse_pointer"]
      ]), "DIRECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['go_to_menu'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Go To")
      .appendField(new Blockly.FieldDropdown([
        ["Random Position", "random_position"],
        ["Mouse Pointer", "mouse_pointer"]
      ]), "DESTINATION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

javascriptGenerator['go_to_menu'] = function(block) {
  const destination = block.getFieldValue('DESTINATION');
  let code = '';
  if (destination === 'mouse_pointer') {
    // Generate code to dispatch the moveSpriteToMousePointer thunk
    code = 'store.dispatch(moveSpriteToMousePointer());\n';
  }

  console.log(code);
  return code;
}

Blockly.Blocks['go_to_xy'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Go To X:")
      .appendField(new Blockly.FieldNumber(0), "X_COORD")
      .appendField("Y:")
      .appendField(new Blockly.FieldNumber(0), "Y_COORD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['glidesecstoxy'] = {
  init: function () {
  this.appendDummyInput()
    .appendField("Glide")
    .appendField(new Blockly.FieldNumber(0), "SECS")
    .appendField("secs to X:")
    .appendField(new Blockly.FieldNumber(0), "X_COORD")
    .appendField("Y:")
    .appendField(new Blockly.FieldNumber(0), "Y_COORD");
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(230);
  }
};

Blockly.Blocks['glidesecstomenu'] = {
  init: function () {
  this.appendDummyInput()
    .appendField("Glide")
    .appendField(new Blockly.FieldNumber(0), "SECS")
    .appendField("secs to:")
    .appendField(new Blockly.FieldDropdown([
      ["Random Position", "random_position"],
      ["Mouse Pointer", "mouse_pointer"]
    ]), "DESTINATION");
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(230);
  }
};

Blockly.Blocks['changexby'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Change X by")
      .appendField(new Blockly.FieldNumber(10), "VALUE")
      .appendField("units");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['changeyby'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Change Y by")
      .appendField(new Blockly.FieldNumber(10), "VALUE")
      .appendField("units");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['setxto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set X to")
      .appendField(new Blockly.FieldNumber(10), "VALUE")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['setyto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Y to")
      .appendField(new Blockly.FieldNumber(10), "VALUE")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['if_on_edge_bounce'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("If on edge, bounce");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

Blockly.Blocks['set_rotation_style'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Set rotation style to")
      .appendField(new Blockly.FieldDropdown([
        ["All Around", "ALL_AROUND"],
        ["Left-Right", "LEFT_RIGHT"],
        ["Don't Rotate", "NO_ROTATION"]
      ]), "DIRECTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  }
};

//Block functions

javascriptGenerator['move_steps'] = function(block) {
  const steps = block.getFieldValue('STEPS');
  return `store.dispatch(moveSteps(${steps}, 0));\n`;
};


javascriptGenerator['turn_right'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `store.dispatch(turnRight(${degrees}));\n`;
  console.log(code);
  return code;
}

javascriptGenerator['turn_left'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `store.dispatch(turnLeft(${degrees}));\n`;
  console.log(code);
  return code;
}

javascriptGenerator['point_in_direction'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `store.dispatch(pointInDirection(${degrees}));\n`;
  console.log(code);
  return code;
}

javascriptGenerator['point_toward_menu'] = function(block) {
  const direction = block.getFieldValue('DIRECTION');
  const code = `pointInDirection(${direction});\n`;
  console.log(code);
  return code;
}

javascriptGenerator['go_to_menu'] = function(block) {
  const destination = block.getFieldValue('DESTINATION');

  let code;
  if (destination === 'mouse_pointer') {
    // Dispatch followMousePointer() if the destination is the mouse pointer
    code = "store.dispatch(moveSpriteToMousePointer());\n";
  } else {
    // Otherwise, dispatch goTo with the specified destination
    code = `store.dispatch(goTo('${destination}'));\n`;
  }

  console.log(code);
  return code;
}


javascriptGenerator['go_to_xy'] = function(block) {
  const xCoord = block.getFieldValue('X_COORD');
  const yCoord = block.getFieldValue('Y_COORD');
  const code = `store.dispatch(goToXY(${xCoord}, ${yCoord}));\n`;
  console.log(code);
  return code;
};

javascriptGenerator['glidesecstoxy'] = function (block) {
  const sec = block.getFieldValue('SECS');
  const xCoord = block.getFieldValue('X_COORD');
  const yCoord = block.getFieldValue('Y_COORD');
  const code = `store.dispatch(glideSecsXY(${xCoord}, ${yCoord}, ${sec}));\n`;
  console.log(code);
  return code;
};

javascriptGenerator['glidesecstomenu'] = function (block) {
  const sec = block.getFieldValue('SECS');
  const destination = block.getFieldValue('DESTINATION');
  const code = `glideTo(${destination}, ${sec});\n`;
  console.log(code);
  return code;
};


javascriptGenerator['setxto'] = function (block) {
  const value = block.getFieldValue('VALUE');
  const code = `store.dispatch(setX(${value}));\n`;
  console.log(code);
  return code;
};

javascriptGenerator['setyto'] = function (block) {
  const value = block.getFieldValue('VALUE');
  const code = `store.dispatch(setY(${value}));\n`;
  console.log(code);
  return code;
};

javascriptGenerator['changexby'] = function (block) {
  const value = block.getFieldValue('VALUE');
  const code = `store.dispatch(changeX(${value}));\n`;
  console.log(code);
  return code;
};

javascriptGenerator['changeyby'] = function (block) {
  const value = block.getFieldValue('VALUE');
  const code = `store.dispatch(changeY(${value}));\n`;
  console.log(code);
  return code;
};


javascriptGenerator['turn_right'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `store.dispatch(turnRight(${degrees}));\n`;
  console.log(code);
  return code;
}

javascriptGenerator['if_on_edge_bounce'] = function(block) {
  const code = 'store.dispatch(ifOnEdgeBounce(());\n';
  // const branch = Blockly.JavaScript.statementToCode(block, 'DO');
  // const endCode = '}));\n';
  console.log(code);
  return code;
};

javascriptGenerator['set_rotation_style'] = function(block) {
  const direction = block.getFieldValue('DIRECTION');
  const code = `setRotationStyle("${direction}");\n`;
  console.log(code);
  return code;
};

