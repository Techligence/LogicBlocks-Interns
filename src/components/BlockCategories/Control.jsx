import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
export const Control = `
<category name="Control" >
    <block type="wait_seconds"></block>
    <block type="repeat_times"></block>
    <block type="forever"></block>
    <block type="if_then"></block>
    <block type="if_then_else"></block>
    <block type="wait_until"></block>
    <block type="repeat_until"></block>
    <block type="stop"></block>
    <block type="when_start_as_clone"></block>
    <block type="create_clone_of"></block>
    <block type="delete_this_clone"></block>
</category>

`;

Blockly.Blocks['wait_seconds'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Wait")
      .appendField(new Blockly.FieldNumber(1), "SECONDS")
      .appendField("seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['repeat_times'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Repeat")
      .appendField(new Blockly.FieldNumber(3, 1), "TIMES")
      .appendField("times");
    this.appendStatementInput("DO")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['if_then'] = {
  init: function() {
    this.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("If");
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("Then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['if_then_else'] = {
  init: function() {
    this.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("If");
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("Then");
    this.appendStatementInput("ELSE")
      .setCheck(null)
      .appendField("Else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};


Blockly.Blocks['wait_until'] = {
  init: function() {
    this.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("Wait until");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['repeat_until'] = {
  init: function() {
    this.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("Repeat until");
    this.appendStatementInput("DO")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};


Blockly.Blocks['forever'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Forever");
    this.appendStatementInput("DO")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['wait_until'] = {
  init: function() {
    this.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("Wait until");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['stop'] = {
  init: function() {
    var options = [
      ['all', 'all'],
      ['this script', 'this_script'],
      ['other scripts in sprite', 'other_scripts']
    ];

    this.appendDummyInput()
      .appendField("Stop")
      .appendField(new Blockly.FieldDropdown(options), "STOP_OPTION");
    this.setPreviousStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['when_start_as_clone'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("When I Start as Clone");
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['create_clone_of'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Create Clone of")
      .appendField(new Blockly.FieldDropdown([["myself", "myself"]]), "CLONE_OPTION");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.Blocks['delete_this_clone'] = {
  init: function() {
    this.appendDummyInput()
      .appendField("Delete This Clone");
    this.setPreviousStatement(true, null);
    this.setColour(120);
  }
};


// JavaScript code generator for 'wait_seconds' block
javascriptGenerator['wait_seconds'] = function(block) {
  const seconds = block.getFieldValue('SECONDS');
  const code = 
  `await waitSeconds(${seconds});
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'repeat_times' block
javascriptGenerator['repeat_times'] = function (block) {
  const times = block.getFieldValue('TIMES');
  const statements = javascriptGenerator.statementToCode(block, 'DO');
  const code = 
  `for (let i = 0; i < ${times}; i++) {\n${statements}}
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'if_then' block
javascriptGenerator['if_then'] = function (block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_ATOMIC);
  const statements = javascriptGenerator.statementToCode(block, 'DO');
  const code = 
  `if (${condition}) {\n${statements}}
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'if_then_else' block
javascriptGenerator['if_then_else'] = function (block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_ATOMIC);
  const doStatements = javascriptGenerator.statementToCode(block, 'DO');
  const elseStatements = javascriptGenerator.statementToCode(block, 'ELSE');
  const code = `if (${condition}) {\n${doStatements}} else {\n${elseStatements}}\n`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'wait_until' block
javascriptGenerator['wait_until'] = function (block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_ATOMIC);
  const code = 
  `waitUntil(${condition});
`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'repeat_until' block
javascriptGenerator['repeat_until'] = function (block) {
  const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_ATOMIC);
  const statements = javascriptGenerator.statementToCode(block, 'DO');
  const code = 
  `while (!(${condition})) {\n${statements}}\n`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'forever' block
javascriptGenerator['forever'] = function (block) {
  const statements = javascriptGenerator.statementToCode(block, 'DO');
  const code = `while (true) {\n${statements}}\n`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'stop' block
javascriptGenerator['stop'] = function (block) {
  const stopOption = block.getFieldValue('STOP_OPTION');
  const code = 
  `stop("${stopOption}");
`;
  console.log(code);
  return code;
};


// JavaScript code generator for 'when_start_as_clone' block
javascriptGenerator['when_start_as_clone'] = function (block) {
  const code = 
  `whenStartAsClone();\n`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'create_clone_of' block
javascriptGenerator['create_clone_of'] = function (block) {
  const cloneOption = block.getFieldValue('CLONE_OPTION');
  const code = 
  `createCloneOf("${cloneOption}");\n`;
  console.log(code);
  return code;
};

// JavaScript code generator for 'delete_this_clone' block
javascriptGenerator['delete_this_clone'] = function (block) {
  const code = 
  `deleteThisClone();
`;
  console.log(code);
  return code;
};