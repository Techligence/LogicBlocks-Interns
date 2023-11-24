import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
Blockly.JavaScript = javascriptGenerator;
export const Operators = `
  <category name="Operators" colour="#FFA500" categorystyle="load_category">
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

  Blockly.JavaScript['mod'] = function (block) {
    const operand1 = Blockly.JavaScript.valueToCode(block, 'OPERAND1', Blockly.JavaScript.ORDER_ATOMIC);
    const operand2 = Blockly.JavaScript.valueToCode(block, 'OPERAND2', Blockly.JavaScript.ORDER_ATOMIC);
    
    const code = `${operand1} % ${operand2}`;
    console.log(code); // Optional: Log the generated code to the console
    return code;
  };
  
  Blockly.JavaScript['round'] = function(block) {
    const value_number = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_ATOMIC);
    const code = `Math.round(${value_number})`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['drop'] = function (block) {
    const operator = block.getFieldValue('yoo');
    const value_operand = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  
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
  
    // TODO: Assemble JavaScript into code variable.
    const code = `${operatorMap[operator]}(${value_operand})`;
  
    console.log(code); // Optional: Log the generated code to the console
    return code;
  };
  
  Blockly.JavaScript['length_of'] = function(block) {
    const text_name = block.getFieldValue('string');
    const code = `${text_name}.length`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  };

  Blockly.JavaScript['join'] = function(block) {
    const text_str1 = block.getFieldValue('str1');
    const text_str2 = block.getFieldValue('str2');
    const code = `"${text_str1}" + "${text_str2}"`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  };
  
  Blockly.JavaScript['letter_of'] = function(block) {
    const number_letter = block.getFieldValue('letter of string');
    const text_string = block.getFieldValue('string');
    const code = `${text_string}[${number_letter - 1}]`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  };
  Blockly.JavaScript['contains'] = function(block) {
  const text_str1 = block.getFieldValue('str1');
  const text_str2 = block.getFieldValue('str2');
  const code = `${text_str1}.includes("${text_str2}")`;
  console.log(code); // Optional: Log the generated code to the console
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript['orblock'] = function(block) {
    const text_obj1 = block.getFieldValue('obj1');
    const text_obj2 = block.getFieldValue('obj2');
    const code = `${text_obj1} || ${text_obj2}`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_LOGICAL_OR];
  };
  
  Blockly.JavaScript['not'] = function(block) {
    const text_obj = block.getFieldValue('obj');
    const code = `!${text_obj}`;
    console.log(code); // Optional: Log the generated code to the console
    return [code, Blockly.JavaScript.ORDER_LOGICAL_NOT];
  };
 Blockly.JavaScript['contains'] = function(block) {
  const text_obj1 = block.getFieldValue('obj1');
  const text_obj2 = block.getFieldValue('obj2');
  const code = `${text_obj1}.includes("${text_obj2}")`;
  console.log(code); // Optional: Log the generated code to the console
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};
 
  