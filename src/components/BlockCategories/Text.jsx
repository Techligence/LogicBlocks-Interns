// TextCategory.jsx
import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'
export const Text = `
  <category name="Text" colour="#5C81A6" >
    <block type="text"></block>
    <block type="text_print"></block>
  </category>
`;
Arduino['Text']= function() {
  // Text value.
  var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
  console.log("Arduino"+ code);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
