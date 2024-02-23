import Blockly from 'blockly';
export const GroveMotor = `
<category name="Grove Motor" colour="#5c81a6">
    <block type="grove_motor_shield"></block>
</category>
`;
Blockly.Blocks['grove_motor_shield'] = {
    // helpUrl: 'http://www.seeedstudio.com/wiki/Motor_Shield',
    init: function() {
      this.setColour(190);
      this.appendDummyInput()
          .appendField("Motor")
          // .appendField(new Blockly.FieldImage("http://www.seeedstudio.com/wiki/images/thumb/4/4d/Smotoshield2.jpg/400px-Smotoshield2.jpg", 64, 64))
          .appendField(new Blockly.FieldDropdown([["Stop", "stop"], ["Forward", "forward"], ["Right", "right"], ["Left", "left"], ["Backward", "backward"]]), "DIRECTION");
      /*this.appendValueInput("SPEED", 'Number')
          .setCheck('Number')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Speed");*/
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Drive two brushed DC motors');
    }
  };
  