import Blockly from 'blockly';
import React from 'react';
import { javascriptGenerator } from 'blockly/javascript';
Blockly.JavaScript = javascriptGenerator;
export const Operators = `
  <category name="Operators" colour="#FFA500" categorystyle="load_category">
  <block type="operator_random"></block>
  <block type="operator_divide"></block> 
  <block type="operator_greater"></block>
  <block type="lesser_than"></block>
    
    <block type="equal_to"></block>
    <block type="boolean_and"></block>
  <block type="operator_add"></block>
  <block type="operator_multiply"></block>
  <block type="operator_subtract"></block>
  
   <block type="not"></block>
   <block type="orblock"></block>
   <block type="letter_of"></block>
   <block type="length_of"></block>
   <block type="contains"></block>
   <block type="join"></block>
    <block type="mod"></block>
    <block type="round"></block>
    <block type="drop"></block>
  </category>
`;

Blockly.Blocks['not'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("not")
          .appendField(new Blockly.FieldTextInput(""), "obj");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  }; 

  Blockly.JavaScript['not'] = function(block) {
    const text_obj = block.getFieldValue('obj');
    const code = `!${text_obj}`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_LOGICAL_NOT];
  };
  

Blockly.Blocks['orblock'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "obj1")
          .appendField("or")
          .appendField(new Blockly.FieldTextInput(""), "obj2");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['orblock'] = function(block) {
    const text_obj1 = block.getFieldValue('obj1');
    const text_obj2 = block.getFieldValue('obj2');
    const code = `${text_obj1} || ${text_obj2}`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_LOGICAL_OR];
  };

  Blockly.Blocks['lesser_than'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "numeric input 1")
          .appendField("<")
          .appendField(new Blockly.FieldNumber(50), "numeric input 2");
      this.setOutput(true, 'Boolean');
      this.setColour(120);
      this.setTooltip('Check if value1 is less than value2');
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['lesser_than'] = function (block) {
    const value1 = Blockly.JavaScript.valueToCode(block, 'numeric input 1', Blockly.JavaScript.ORDER_ATOMIC);
    const value2 = Blockly.JavaScript.valueToCode(block, 'numeric input 2', Blockly.JavaScript.ORDER_ATOMIC);
    const result = value1 < value2;
    
    // Display the generated JavaScript code and result in the console
    const code = `${value1} < ${value2}`;
    console.log('Generated Code:', code);
    console.log('Result:', result);
  
    return [result, Blockly.JavaScript.ORDER_RELATIONAL];
  };
  
  
  
  Blockly.Blocks['equal_to'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "numeric input 1")
          .appendField("=")
          .appendField(new Blockly.FieldNumber(50), "numeric input 2");
      this.setOutput(true, null);
      this.setColour(120);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['equal_to'] = function (block) {
    const value1 = Blockly.JavaScript.valueToCode(block, 'numeric input 1', Blockly.JavaScript.ORDER_ATOMIC);
    const value2 = Blockly.JavaScript.valueToCode(block, 'numeric input 2', Blockly.JavaScript.ORDER_ATOMIC);
    const code = `${value1} === ${value2}`;
    console.log(code);
    return [code, Blockly.JavaScript.ORDER_RELATIONAL]; 
  };
 
  Blockly.Blocks['boolean_and'] = {
    init: function() {
      this.appendValueInput("input 1")
          .setCheck(null);
      this.appendValueInput("input 2")
          .setCheck(null)
          .appendField("and");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(120);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  
  Blockly.JavaScript['boolean_and'] = function(block) {
    const value1 = Blockly.JavaScript.valueToCode(block, 'input1', Blockly.JavaScript.ORDER_ATOMIC);
    const value2 = Blockly.JavaScript.valueToCode(block, 'input2', Blockly.JavaScript.ORDER_ATOMIC);
    const code = `${value1} && ${value2}`;
    console.log(code);
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  


  Blockly.Blocks['contains'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("apple"), "obj1")
          .appendField("contains")
          .appendField(new Blockly.FieldTextInput("a"), "obj2")
          .appendField("?");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['contains'] = function(block) {
  const text_str1 = block.getFieldValue('str1');
  const text_str2 = block.getFieldValue('str2');
  const code = `${text_str1}.includes("${text_str2}")`;
  console.log(code); // Optional: Log the generated code to the console
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.Blocks['letter_of'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("letter")
          .appendField(new Blockly.FieldNumber(0), "letter of string")
          .appendField("of")
          .appendField(new Blockly.FieldTextInput("apple"), "string");
          this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

   Blockly.JavaScript['letter_of'] = function(block) {
    const number_letter = block.getFieldValue('letter of string');
    const text_string = block.getFieldValue('string');
    const code = `${text_string}[${number_letter - 1}]`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  };

  Blockly.Blocks['length_of'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("length of")
          .appendField(new Blockly.FieldTextInput("apple"), "NAME");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
   Blockly.JavaScript['length_of'] = function(block) {
    const text_name = block.getFieldValue('string');
    const code = `${text_name}.length`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  };

Blockly.Blocks['mod'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "OPERAND1")
          .appendField("Mod")
          .appendField(new Blockly.FieldNumber(0), "OPERAND2");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['mod'] = function (block) {
    const operand1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', Blockly.JavaScript.ORDER_ATOMIC);
    const operand2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', Blockly.JavaScript.ORDER_ATOMIC);
    
    const code = `${operand1} % ${operand2}`;
    console.log(code); // Optional: Log the generated code to the console
    return code;
  };

Blockly.Blocks['round'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("round")
          .appendField(new Blockly.FieldNumber(0), "NUMBER");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
   
  Blockly.JavaScript['round'] = function(block) {
    const value_number = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const code = `Math.round(parseFloat(${value_number})) || 0`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.Blocks['drop'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["abs","abs"], ["floor","floor"], ["ceiling","ceiling"], ["sqrt","sqrt"], ["sin","sin"], ["cos","cos"], ["tan","tan"], ["asin","asin"], ["acos","acos"], ["atan","atan"], ["ln","ln"], ["log","log"], ["e^","e^"], ["10^","10^"]]), "yoo")
          .appendField("of")
          .appendField(new Blockly.FieldNumber(0), "NAME");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['drop'] = function (block) {
    const operator = block.getFieldValue('yoo');
    const value_operand = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  
    // Map Blockly dropdown operators to JavaScript functions
    // Map Blockly dropdown operators to JavaScript functions
const operatorMap = {
  'abs': 'Math.abs',
  'floor': 'Math.floor',
  'ceiling': 'Math.ceil',
  'sqrt': 'Math.sqrt',
  'sin': 'Math.sin',
  'cos': 'Math.cos',
  'tan': 'Math.tan',
  'asin': 'Math.asin',
  'acos': 'Math.acos',
  'atan': 'Math.atan',
  'ln': 'Math.log',
  'log': 'Math.log10',
  'e^': 'Math.exp',
  '10^': 'Math.pow(10,',
};

// Assemble JavaScript code
let code;
if (operatorMap.hasOwnProperty(operator)) {
  code = `${operatorMap[operator]}(${value_operand})`;
} else {
  code = '';  // Handle unsupported operator
  console.error(`Unsupported operator: ${operator}`);
}

  
    console.log(code); // Optional: Log the generated code to the console
    return code;
  };
  
 

  Blockly.Blocks['join'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("join")
          .appendField(new Blockly.FieldTextInput("apple"), "str1")
          .appendField(new Blockly.FieldTextInput("banana"), "str2");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['join'] = function(block) {
    const text_str1 = block.getFieldValue('str1');
    const text_str2 = block.getFieldValue('str2');
    const code = `"${text_str1}" + "${text_str2}"`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  };

  


Blockly.Blocks['operator_add'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("+")
          .appendField(new Blockly.FieldNumber(0), "Input2 ");
          this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['operator_add'] = function(block) {
    const number_input1 = block.getFieldValue('Input1');
    const number_input2 = block.getFieldValue('Input2');
    const code = '${number_input1} + ${number_input2}';
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  };

  Blockly.Blocks['operator_subtract'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("-")
          .appendField(new Blockly.FieldNumber(0), "Input2 ");
          this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['operator_subtract'] = function(block) {
    const number_input1 = block.getFieldValue('Input1');
    const number_input2 = block.getFieldValue('Input2');
    const code = '${number_input1} - ${number_input2}';
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_SUBTRACTION];
  };

  Blockly.Blocks['operator_multiply'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("*")
          .appendField(new Blockly.FieldNumber(0), "Input2 ");
          this.setOutput(true, null);
      this.setColour(230  );
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.JavaScript['operator_multiply'] = function(block) {
    const number_input1 = block.getFieldValue('Input1');
    const number_input2 = block.getFieldValue('Input2');
    const code = '${number_input1} * ${number_input2}';
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_MULTIPLICATION];
  };
  
  

  Blockly.Blocks['operator_random'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("pick random")
          .appendField(new Blockly.FieldNumber(0), "input 1")
          .appendField("to")
          .appendField(new Blockly.FieldNumber(0), "input 2");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['operator_random'] = function(block) {
    const number_input1 = block.getFieldValue('input 1');
    const number_input2 = block.getFieldValue('input 2');
    const code = `Math.floor(Math.random() * (${number_input2} - ${number_input1} + 1) + ${number_input1})`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  Blockly.Blocks['operator_divide'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "input1")
          .appendField("/")
          .appendField(new Blockly.FieldNumber(0), "input2");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['operator_divide'] = function(block) {
    const number_input1 = block.getFieldValue('input1');
    const number_input2 = block.getFieldValue('input2');
    const code = `${number_input1} / ${number_input2}`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_DIVISION];
  };

  Blockly.Blocks['operator_greater'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "input1")
          .appendField(">")
          .appendField(new Blockly.FieldNumber(50), "input2");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
 
  Blockly.JavaScript['operator_greater'] = function(block) {
    const number_input1 = block.getFieldValue('input1');
    const number_input2 = block.getFieldValue('input2');
    const code = `${number_input1} > ${number_input2}`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
  };
  
      
  