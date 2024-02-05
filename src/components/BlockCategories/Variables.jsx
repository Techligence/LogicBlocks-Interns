// Variables.jsx
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
Blockly.JavaScript = javascriptGenerator;
import { pythonGenerator } from "blockly/python";
import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'


// Block for variable getter.
Blockly.Blocks['variables_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "GET_VARIABLE");
    this.setOutput(true, null);
    this.setColour(350);
  }
};

// JavaScript code generator for variable getter.
javascriptGenerator.forBlock['variables_get'] = function(block) {
  const getVariable = block.getField('GET_VARIABLE').getText();
  const code = `${getVariable}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// Python code generator for variable getter.
pythonGenerator.forBlock['variables_get'] = function(block, generator) {
  const getVariable = block.getField('GET_VARIABLE').getText();
  const code = `${getVariable}`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Block for variable setter.
Blockly.Blocks['variables_set'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("set")
      .appendField(new Blockly.FieldVariable("VAR_NAME"), "FIELD_NAME")
      .appendField("to");

    this.appendValueInput("VALUE")
      .setCheck(null)
      // .appendField(new Blockly.FieldTextInput("0"), "TEXT_VALUE");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);

    // Align inputs horizontally
    this.setInputsInline(true);
  }
};



// JavaScript code generator for variable setter.
javascriptGenerator.forBlock['variables_set'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const textValue = block.getFieldValue('TEXT_VALUE');
  const valueCode = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `${fieldName} = ${valueCode || textValue};\n`;
  return code;
};

// Python code generator for variable setter.
pythonGenerator.forBlock['variables_set'] = function(block, generator) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const textValue = block.getFieldValue('TEXT_VALUE');
  const valueCode = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC);
  const code = `${fieldName} = ${valueCode || textValue}\n`;
  return code;
};

// Block for changing variable by a value.
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
    this.setColour(350);
  }
};

// JavaScript code generator for changing variable by a dynamic value.
javascriptGenerator.forBlock['variables_changeby'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const changeValue = block.getFieldValue('CHANGE_VALUE');
  const code = `${fieldName} += ${changeValue};\n`;
  return code;
};

// Python code generator for changing variable by a dynamic value.
pythonGenerator.forBlock['variables_changeby'] = function(block, generator) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const changeValue = block.getFieldValue('CHANGE_VALUE');
  const code = `${fieldName} += ${changeValue}\n`;
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
    this.setColour(350);
  }
};

// JavaScript code generator for showing variable.
javascriptGenerator.forBlock['variables_show'] = function(block) {
  const variable = block.getField('SHOW_VARIABLE').getText();
  const code = `showVariable(${variable});\n`;
  return code;
};

// Python code generator for showing variable.
pythonGenerator.forBlock['variables_show'] = function(block, generator) {
  const variable = block.getField('SHOW_VARIABLE').getText();
  const code = `showVariable(${variable})\n`;
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
    this.setColour(350);
  }
};

// JavaScript code generator for hiding variable.
javascriptGenerator.forBlock['variables_hide'] = function(block) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const code = `hideVariable(${fieldName});\n`;
  return code;
};

// Python code generator for hiding variable.
pythonGenerator.forBlock['variables_hide'] = function(block, generator) {
  const fieldName = block.getField('FIELD_NAME').getText();
  const code = `hideVariable(${fieldName})\n`;
  return code;
};

Arduino['variables_get'] = function() {
  // Variable getter.
  var code = Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Variables.NAME_TYPE);
  return [code, Arduino.ORDER_ATOMIC];
};

Arduino['variables_declare'] = function() {
  // Variable setter.
  var dropdown_type = this.getFieldValue('TYPE');
  //TODO: settype to variable
  var argument0 = Arduino.valueToCode(this, 'VALUE',
      Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Variables.NAME_TYPE);
  Arduino.setups_['setup_var' + varName] = varName + ' = ' + argument0 + ';\n';
  return '';
};

Arduino['variables_set']= function() {
  // Variable setter.
  var argument0 = Arduino.valueToCode(this, 'VALUE',
      Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
export const Variables = `
  <category name="Variables" colour="#5C81A6">
    <block type="variables_get"></block>
    <block type="variables_set"></block>
    <block type="variables_changeby"></block>
    <block type="variables_show"></block>
    <block type="variables_hide"></block>
    <!-- Other variable blocks go here... -->
  </category>
`;

