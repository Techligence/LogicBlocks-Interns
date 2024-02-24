import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
Blockly.JavaScript = javascriptGenerator;
import { pythonGenerator } from "blockly/python";

// Block for HIGH/LOW input and output
Blockly.Blocks['high_low'] = {
    init: function () {
        this.appendDummyInput()
            // .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([["LOW", "LOW"], ["HIGH", "HIGH"]]), "NAME");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// JS codegenerator for HIGH/LOW block
javascriptGenerator.forBlock['high_low'] = function (block) {
    var dropdownValue = block.getFieldValue('NAME');
    var code = `${dropdownValue}\n`
    return code;
};

// Python code generator for HIGH/LOW block.
pythonGenerator.forBlock['high_low'] = function(block, generator) {
    var dropdownValue = block.getFieldValue('NAME');
    var code = `${dropdownValue}\n`
    return [code, pythonGenerator.ORDER_ATOMIC];
  };
  

export const InputOutput = `
  <category name="InputOutput" colour="#5c81a6">
      <block type="high_low"></block>
  </category>
  `;