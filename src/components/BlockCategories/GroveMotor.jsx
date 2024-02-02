import Blockly from 'blockly';
import { javascriptGenerator } from "blockly/javascript";
Blockly.JavaScript = javascriptGenerator;
import { pythonGenerator } from "blockly/python";
Blockly.Python = pythonGenerator;

import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'

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
  
  Arduino['grove_motor_shield'] = function () {
    var direction = this.getFieldValue('DIRECTION');
    var code = 'groveMotorShield.' + direction + '();\n';  // Replace 'groveMotorShield' with the actual motor shield object
    console.log("Arduino" + code);
    return code;
};

  Blockly.JavaScript['grove_motor_shield'] = function(block) {
    var direction = block.getFieldValue('DIRECTION');
  
    // Generate JavaScript code based on selected direction
    var code = '';
    switch (direction) {
      case 'stop':
        code = 'stopMotor();';
        break;
      case 'forward':
        code = 'driveForward();';
        break;
      case 'right':
        code = 'turnRight();';
        break;
      case 'left':
        code = 'turnLeft();';
        break;
      case 'backward':
        code = 'driveBackward();';
        break;
    }
  
    return code;
  };
  Blockly.Python['grove_motor_shield'] = function(block){
    var direction = block.getFieldValue('DIRECTION')

//   # Generate Python code based on selected direction
  var code = ''
  if (direction == 'stop'){code = 'stop_motor()\n'}
  else if (direction == 'forward')
    {code = 'drive_forward()\n'}
  else if (direction == 'right')
  {  code = 'turn_right()\n'}
  else if (direction == 'left')
    {code = 'turn_left()\n'}
  else if (direction == 'backward')
    {code = 'drive_backward()\n'}

  return code
  }