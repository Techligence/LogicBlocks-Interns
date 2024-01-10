// Variables.jsx
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import {pythonGenerator} from 'blockly/python';
Blockly.JavaScript = javascriptGenerator;
Blockly.Python = pythonGenerator

// Block for variable getter.
Blockly.Blocks['variables_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("VAR_NAME"), "GET_VARIABLE"),
    this.setOutput(true, null);
    this.setColour(350);
  }
};

// JavaScript code generator for variable getter.
javascriptGenerator.forBlock['variables_get'] = function(block) {
  const getVariable = block.getField('GET_VARIABLE').getText();
  const code = `${getVariable}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  // console.log(code);
  // return code;
};

// JavaScript code generator for variable getter.
pythonGenerator.forBlock['variables_get'] = function(block) {
  const getVariable = block.getField('GET_VARIABLE').getText();
  const code = `${getVariable}`;
  return [code, Blockly.Python.ORDER_ATOMIC];
  // console.log(code);
  // return code;
};


// Block for variable setter.
Blockly.Blocks['variables_set'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("set")
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
      .appendField("to");

    this.appendValueInput("VALUE")
      .setCheck(null)  // Set the check to null for general value input
      .appendField(new Blockly.FieldTextInput("0"), "TEXT_VALUE");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);

    // Align inputs horizontally
    this.setInputsInline(true);
  }
};

// JavaScript code generator for the modified variable setter.
javascriptGenerator.forBlock['variables_set'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const textValue = block.getFieldValue('TEXT_VALUE');
  const valueCode = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `${fieldName} = ${valueCode || textValue};\n`;
  return code;
};

// JavaScript code generator for the modified variable setter.
pythonGenerator.forBlock['variables_set'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const textValue = block.getFieldValue('TEXT_VALUE');
  const valueCode = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  const code = `${fieldName} = ${valueCode || textValue};\n`;
  return code;
};

// Block to change variable by 1.
Blockly.Blocks['variables_changeby'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("change")
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
      .appendField("by")
      .appendField(new Blockly.FieldTextInput("1", Blockly.FieldTextInput.numberValidator), "CHANGE_VALUE")
      .appendField("units");
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350)
  }
};

// JavaScript code generator for changing variable by a dynamic value.
javascriptGenerator['variables_changeby'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const changeValue = block.getFieldValue('CHANGE_VALUE');
  const code = `${fieldName} += ${changeValue};\n`;
  return code;
};

// Python code generator for changing variable by a dynamic value.
pythonGenerator['variables_changeby'] = function(block) {
  var fieldName = block.getField('FIELD_NAME').getText();
  var changeValue = block.getFieldValue('CHANGE_VALUE');
  var code = fieldName + ' += ' + changeValue + '\n';
  return code;
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
  const variable = block.getField('SHOW_VARIABLE').getText();
  const code = `showVariable(${variable});\n`;
  return code;
};

// JavaScript code generator for showing variable.
pythonGenerator['variables_show'] = function(block) {
  const variable = block.getField('SHOW_VARIABLE').getText();
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

// JavaScript code generator for hiding variable.
javascriptGenerator['variables_hide'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const code = `hideVariable(${fieldName});\n`;
  return code;
};

// JavaScript code generator for hiding variable.
pythonGenerator['variables_hide'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
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