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
      this.setOutput(true, 'Boolean');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  
  Blockly.JavaScript['not'] = function(block) {
    const text_obj = block.getFieldValue('obj');
    const inputValue = parseFloat(text_obj);
    const result = !inputValue ? 1 : 0;
    const code = `!(${text_obj})`;
    console.log(`Not(${inputValue}) is: `, result);
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
 
  Blockly.Blocks['orblock'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "obj1")
          .appendField("or")
          .appendField(new Blockly.FieldTextInput(""), "obj2");
      this.setOutput(true, 'Boolean');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  

Blockly.JavaScript['orblock'] = function(block) {
    const text_obj1 = block.getFieldValue('obj1');
    const text_obj2 = block.getFieldValue('obj2');
    const code = `${text_obj1} || ${text_obj2}`;
    console.log(`(${text_obj1}) or (${text_obj2}) is: `, eval(code));
    return [code, Blockly.JavaScript.ORDER_LOGICAL_OR];
  };
    

Blockly.Blocks['boolean_and'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput(""), "obj1")
          .appendField("and")
          .appendField(new Blockly.FieldTextInput(""), "obj2");
      this.setOutput(true, 'Boolean');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['boolean_and'] = function(block) {
    const text_obj1 = block.getFieldValue('obj1');
    const text_obj2 = block.getFieldValue('obj2');
    const code = `${text_obj1} && ${text_obj2}`;
    const result = eval(code);
    console.log(`(${text_obj1}) and (${text_obj2}) is: `, result);
    
    // Returning the string representation of the boolean value
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  

Blockly.Blocks['contains'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("apple"), "str1")
          .appendField("contains")
          .appendField(new Blockly.FieldTextInput("a"), "str2")
          .appendField("?");
      this.setOutput(true, 'Boolean');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['contains'] = function(block) {
    const text_str1 = block.getFieldValue('str1');
    const text_str2 = block.getFieldValue('str2');
    const code = `"${text_str1}".includes("${text_str2}")`;
    const result = eval(code);
    console.log(`"${text_str1}" contains "${text_str2}" is: `, result);
  
    // Returning the string representation of the boolean value
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  
  Blockly.Blocks['letter_of'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("letter")
          .appendField(new Blockly.FieldNumber(1), "letter_of_string")
          .appendField("of")
          .appendField(new Blockly.FieldTextInput("apple"), "string");
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['letter_of'] = function(block) {
    const number_letter = parseInt(block.getFieldValue('letter_of_string')) || 1;
    const text_string = block.getFieldValue('string');
    
    // Ensure number_letter is within string length boundaries
    const index = Math.min(Math.max(number_letter - 1, 0), text_string.length - 1);
  
    const code = `"${text_string}"[${index}]`;
    const result = eval(code);
    console.log(`Letter at index ${number_letter} of "${text_string}" is: `, result);
  
    // Returning the retrieved letter
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
  
  

  Blockly.Blocks['length_of'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("length of")
          .appendField(new Blockly.FieldTextInput("apple"), "string");
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['length_of'] = function(block) {
    const text_name = block.getFieldValue('string');
    const code = `"${text_name}".length`;
    console.log(`Length of "${text_name}" is: `, eval(code)); // Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_MEMBER];
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
    //const value_number = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    const value_number = parseFloat(block.getFieldValue('NUMBER'));
    const code = `Math.round(parseFloat(${value_number})) `;
    const result = eval(code);
    console.log(`${value_number} = ${result}`);
    
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  
  Blockly.Blocks['drop'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["abs", "abs"], ["floor", "floor"], ["ceiling", "ceiling"],
          ["sqrt", "sqrt"], ["sin", "sin"], ["cos", "cos"], ["tan", "tan"],
          ["asin", "asin"], ["acos", "acos"], ["atan", "atan"], ["ln", "ln"],
          ["log", "log"], ["e^", "e^"], ["10^", "10^"]
        ]), "yoo")
        .appendField("of")
        .appendField(new Blockly.FieldNumber(0), "NAME");
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  
  Blockly.JavaScript['drop'] = function (block) {
    const operator = block.getFieldValue('yoo');
    const value_operand = block.getFieldValue('NAME');
  
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
  
    let code;
    if (operatorMap.hasOwnProperty(operator)) {
      // If the operator is a trigonometric function and not ln or log
      if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan'].includes(operator)) {
        code = `${operatorMap[operator]}(Math.PI / 180 * ${value_operand})`;
      } else {
        code = `${operatorMap[operator]}(${value_operand})`;
      }
  
      const result = eval(code);
      console.log(`${operator}(${value_operand}) = ${result}`);
    } else {
      code = '';
      console.error(`Unsupported operator: ${operator}`);
    }
  
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
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
    const result =text_str1 + text_str2;
    
    console.log(result); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  };

  


  Blockly.Blocks['operator_add'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("+")
          .appendField(new Blockly.FieldNumber(0), "Input2");
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  
  
  Blockly.JavaScript['operator_add'] = function(block) {
    const number_input1 = block.getFieldValue('Input1');
    const number_input2 = block.getFieldValue('Input2');
    const code = `${number_input1} + ${number_input2}`;
    const res = parseFloat(number_input1) + parseFloat(number_input2);
    console.log("result of addition is ",res);
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  };

Blockly.Blocks['operator_subtract'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "Input1")
        .appendField("-")
        .appendField(new Blockly.FieldNumber(0), "Input2");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['operator_subtract'] = function(block) {
  const number_input1 = block.getFieldValue('Input1');
  const number_input2 = block.getFieldValue('Input2');
  const code = `${number_input1} - ${number_input2}`;
  const result = parseFloat(number_input1) - parseFloat(number_input2);
  console.log("result of subtraction is ",result);
  return [code, Blockly.JavaScript.ORDER_SUBTRACTION];
};

Blockly.Blocks['operator_multiply'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("*")
          .appendField(new Blockly.FieldNumber(0), "Input2");
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['operator_multiply'] = function(block) {
    const number_input1 = block.getFieldValue('Input1');
    const number_input2 = block.getFieldValue('Input2');
    const code = `${number_input1} * ${number_input2}`;
    const res = parseFloat(number_input1) * parseFloat(number_input2);
    console.log("result of multiplication is ", res);
    return [code, Blockly.JavaScript.ORDER_MULTIPLICATION];
  };

  Blockly.Blocks['operator_random'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("pick random")
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("to")
          .appendField(new Blockly.FieldNumber(0), "Input2");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['operator_random'] = function(block) {
    const number_input1 = parseFloat(block.getFieldValue('Input1'));
    const number_input2 = parseFloat(block.getFieldValue('Input2'));
   // const code = `Math.floor(Math.random() * (${number_input2} - ${number_input1} + 1) + ${number_input1})`;
    const code1 = `Math.random(${number_input1},${number_input2}) `;
    const result = Math.floor(Math.random() * (number_input2 - number_input1 + 1) + number_input1);
    console.log("Random number generated is ", result);
    return [code1, Blockly.JavaScript.ORDER_ATOMIC];
  };
  


  Blockly.Blocks['operator_divide'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("/")
          .appendField(new Blockly.FieldNumber(0), "Input2");
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['operator_divide'] = function(block) {
    const number_input1 = block.getFieldValue('Input1');
    const number_input2 = block.getFieldValue('Input2');
    const code = `${number_input1} / ${number_input2}`;
    const res = parseFloat(number_input1) / parseFloat(number_input2);
    console.log("result of division is ", res);
    return [code, Blockly.JavaScript.ORDER_DIVISION];
  };
  
  Blockly.Blocks['operator_greater'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField(">")
          .appendField(new Blockly.FieldNumber(50), "Input2");
      this.setOutput(true, 'Boolean');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
 
  Blockly.JavaScript['operator_greater'] = function(block) {
    const number_input1 = parseFloat(block.getFieldValue('Input1'));
    const number_input2 = parseFloat(block.getFieldValue('Input2'));
    const code = `${number_input1} > ${number_input2}`;
    const result = number_input1 > number_input2;
    console.log(`Is ${number_input1} greater than ${number_input2}?`, result);
    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
  };

  Blockly.Blocks['lesser_than'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("<")
          .appendField(new Blockly.FieldNumber(50), "Input2");
      this.setOutput(true, 'Boolean');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['lesser_than'] = function (block) {
    const number_input1 = parseFloat(block.getFieldValue('Input1'));
    const number_input2 = parseFloat(block.getFieldValue('Input2'));
    const code = `${number_input1} < ${number_input2}`;
    const result = number_input1 < number_input2;
    console.log(`Is ${number_input1} lesser than ${number_input2}?`, result);
    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
  };

  Blockly.Blocks['equal_to'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("=")
          .appendField(new Blockly.FieldNumber(50), "Input2");
      this.setOutput(true, 'Boolean');
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['equal_to'] = function (block) {
    const number_input1 = parseFloat(block.getFieldValue('Input1'));
    const number_input2 = parseFloat(block.getFieldValue('Input2'));
    const code = `${number_input1} == ${number_input2}`;
    const result = number_input1 == number_input2;
    console.log(`Is ${number_input1} equal to  ${number_input2}?`, result);
    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
  };

  Blockly.Blocks['mod'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(0), "Input1")
          .appendField("Mod")
          .appendField(new Blockly.FieldNumber(0), "Input2");
      this.setOutput(true, 'Boolean');  // Output type changed to Boolean
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['mod'] = function(block) {
    const number_input1 = parseFloat(block.getFieldValue('Input1'));
    const number_input2 = parseFloat(block.getFieldValue('Input2'));
  
    const code = `(${number_input1} % ${number_input2}) == 0`;
    const result = (number_input1 % number_input2) == 0;
    console.log(`Is ${number_input1} divisible by ${number_input2}? `, result);
    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
  };
  
  