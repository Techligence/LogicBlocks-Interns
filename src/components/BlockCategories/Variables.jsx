// Variables.jsx
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

// Block for variable getter.
Blockly.Blocks['variables_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME");
    this.setOutput(true, null);
    this.setColour(350)
  }
};

// Block for variable setter.
Blockly.Blocks['variables_set'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck(null)
      .appendField("set")
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
      .appendField("to");
    this.setOutput(true, null);
    this.setColour(350)

  }
};

// Block to change variable by 1.
Blockly.Blocks['variables_changeby'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("change")
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
      .appendField("by 1");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350)

  }
};

// Block to show variable.
Blockly.Blocks['variables_show'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("show")
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "SHOW_VARIABLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350)

  }
};
// JavaScript code generator for showing variable.
javascriptGenerator['variables_show'] = function(block) {
  const variable = block.getFieldValue('SHOW_VARIABLE');
  const code = `showVariable(${variable});\n`;
  return code;
};

// Block to hide variable.
Blockly.Blocks['variables_hide'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("hide")
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350)

  }
};

// Code generator for above defined blocks

// JavaScript code generator for variable getter.
javascriptGenerator['variables_get'] = function(block) {
  const fieldName = block.getFieldValue('FIELD_NAME');
  const code = `${fieldName}`;
  console.log(code);
  return code;
  // return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// JavaScript code generator for variable setter.
javascriptGenerator['variables_set'] = function(block) {
  const fieldName = block.getFieldValue('FIELD_NAME');
  const value = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `${fieldName} = ${value};\n`;
  return code;
};

// JavaScript code generator for changing variable by 1.
javascriptGenerator['variables_changeby'] = function(block) {
  const fieldName = block.getFieldValue('FIELD_NAME');
  const code = `${fieldName} += 1;\n`;
  return code;
};



// JavaScript code generator for hiding variable.
javascriptGenerator['variables_hide'] = function(block) {
  const fieldName = block.getFieldValue('FIELD_NAME');
  const code = `hideVariable(${fieldName});\n`;
  return code;
};

export const Variables = `
  <category name="Variables" colour="#5C81A6" categorystyle="variable_category">
    <block type="variables_get"></block>
    <block type="variables_set"></block>
    <block type="variables_changeby"></block>
    <block type="variables_show"></block>
    <block type="variables_hide"></block>
    <!-- Other variable blocks go here... -->
  </category>
`;
