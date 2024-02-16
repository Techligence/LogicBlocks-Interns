export const MoveSpriteBlock = `
  <category name="Motion" colour="#5C81A6" categorystyle="math_category">
    <block type="move_sprite_10px"></block>
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

//Block functions

javascriptGenerator['move_steps'] = function(block) {
  const steps = block.getFieldValue('STEPS');
  // const code = `store.dispatch(moveSprite(${steps}, 0))\n`;
  // console.log(code);
  return `store.dispatch(moveSprite(${steps}, 0));\n`;
};


javascriptGenerator['turn_right'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `turnRight(${degrees});\n`;
  console.log(code);
  return code;
}


javascriptGenerator['turn_left'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `turnLeft(${degrees});\n`;
  console.log(code);
  return code;
}

javascriptGenerator['point_in_direction'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `pointInDirection(${degrees});\n`;
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
  const code = `goTo(${destination});\n`;
  console.log(code);
  return code;
}


