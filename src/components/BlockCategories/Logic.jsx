// LogicCategory.jsx

import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'

export const Logic = `
  <category name="Logic" colour="#5c81a6">
    <block type="controls_if"></block>
  </category>
`;

Arduino['Logic']= function() {
  // Text value.
  var code = Blockly.Arduino.quote_(this.getFieldValue('Logic'));
  console.log("Arduino"+ code);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
