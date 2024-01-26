import Blockly from 'blockly';
import { javascriptGenerator } from "blockly/javascript";
Blockly.JavaScript = javascriptGenerator;
import { pythonGenerator } from "blockly/python";
Blockly.Python = pythonGenerator;
export const Functions = `
<category name="Funtions" colour="#5C81A6">
    <block type="do_something_func"></block>
    <block type="do_something2_func"></block>
    <block type="inline_if"></block>
    <block type="do_something2_input"></block>
</category>
`;

// Define the function block
Blockly.Blocks['do_something_func'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("to")
        .appendField(new Blockly.FieldTextInput("do something"), "FUNCTION_NAME");
      this.appendStatementInput("METHOD_BODY")
        .setCheck(null);
      this.setInputsInline(false);
      this.setColour(210);
      this.setTooltip("Define a function");
    }
};

// Blockly.Blocks['do_something_func'] definition
Blockly.Blocks['do_something2_func'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("to")
      .appendField(new Blockly.FieldTextInput("do something"), "FUNCTION_NAME");
    this.appendStatementInput("METHOD_BODY")
      .setCheck(null);
    this.appendDummyInput()
      .appendField("return");
    this.appendValueInput("RETURN_VALUE")
      .setCheck(null); // Added return input field for connecting blocks after return
    this.setInputsInline(false);
    this.setColour(210);
    this.setTooltip("Define a function");
  }
};

// Blockly.Blocks['inline_if'] definition
Blockly.Blocks['inline_if'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("if");
    this.appendValueInput("CONDITION")
      .setCheck(null)
    this.appendDummyInput()
      .appendField("return");
    this.appendValueInput("RETURN_VALUE")
      .setCheck(null)
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Inline if statement");
  }
};

Blockly.Blocks['do_something2_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("do something2");
    this.setOutput(true, null);
    this.setColour(210);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};


Blockly.JavaScript['do_something_func'] = function (block) {
  var functionName = block.getFieldValue('FUNCTION_NAME');
  var methodBody = Blockly.JavaScript.statementToCode(block, 'METHOD_BODY');

  var code = `function ${functionName}() {\n${methodBody}\n}\n`;
  return code;
};

Blockly.JavaScript['do_something2_func'] = function (block) {
  var functionName = block.getFieldValue('FUNCTION_NAME');
  var methodBody = Blockly.JavaScript.statementToCode(block, 'METHOD_BODY');
  var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN_VALUE', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `function ${functionName}() {\n${methodBody}  return ${returnValue};\n}\n`;
  return code;
};

Blockly.JavaScript['inline_if'] = function (block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC);
  var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN_VALUE', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `if (${condition}) {\n  return ${returnValue};\n}\n`;
  return code;
};
Blockly.JavaScript['do_something2_input'] = function(block) {
  var code = 'doSomething2Input()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.Python['do_something_func'] = function (block){
    var functionName = block.getFieldValue('FUNCTION_NAME')
    var methodBody = Blockly.Python.statementToCode(block, 'METHOD_BODY')

    var code = `${functionName}():\n${methodBody}\n`
    return code
}
Blockly.Python['do_something2_func'] = function (block){
   var functionName = block.getFieldValue('FUNCTION_NAME')
   var methodBody = Blockly.Python.statementToCode(block, 'METHOD_BODY')
   var returnValue = Blockly.Python.valueToCode(block, 'RETURN_VALUE', Blockly.Python.ORDER_ATOMIC)

    var code = `${functionName}():\n${methodBody}  return ${returnValue}\n`
    return code
}
Blockly.Python['inline_if'] = function (block){
    var condition = Blockly.Python.valueToCode(block, 'CONDITION', Blockly.Python.ORDER_ATOMIC)
    var returnValue = Blockly.Python.valueToCode(block, 'RETURN_VALUE', Blockly.Python.ORDER_ATOMIC)

    var code = `if ${condition}:\n  return ${returnValue}\n`
    return code;
}
Blockly.Python['do_something2_input'] = function (block) {
  var code = 'doSomething2Input()';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};
