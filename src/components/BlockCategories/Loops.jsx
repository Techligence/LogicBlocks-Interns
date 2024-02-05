// LoopsCategory.jsx
import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'
export const Loops= `
  <category name="Loops" colour="#5C81A6" >
    <block type="controls_repeat_ext">
      <value name="TIMES">
        <shadow type="math_number">
          <field name="NUM">10</field>
        </shadow>
      </value>
    </block>
    <block type="controls_whileUntil"></block>
    <block type="controls_for"></block>
  </category>
`;
Arduino['controls_repeat_ext']= function() {
  // Text value.
  var code = Arduino.quote_(this.getFieldValue('NUM'));
  console.log("Arduino"+ code);
  return [code, Arduino.ORDER_ATOMIC];
};
Arduino['controls_whileUntil']= function() {
  // Text value.
  var code = Arduino.quote_(this.getFieldValue('LOOPS'));
  console.log("Arduino"+ code);
  return [code, Arduino.ORDER_ATOMIC];
};
Arduino['controls_for']= function() {
  // Text value.
  var code = Arduino.quote_(this.getFieldValue('LOOPS'));
  console.log("Arduino"+ code);
  return [code, Arduino.ORDER_ATOMIC];
};
