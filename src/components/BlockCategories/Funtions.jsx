import Blockly from 'blockly';

export const Functions = `
<category name="Funtions" colour="#5C81A6">
    <block type="do_something"></block>
</category>
`;


// Define the function block
Blockly.Blocks['do_something'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("to")
        .appendField(new Blockly.FieldTextInput("do something"), "FUNCTION_NAME");
      this.appendStatementInput("METHOD_BODY")
        .setCheck(null);
      this.setInputsInline(false);
      this.setColour(230);
      this.setTooltip("Define a function");
    }
  };
