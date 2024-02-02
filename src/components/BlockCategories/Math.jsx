// MathCategory.jsx
import 'blockly-arduino/blocks'
import * as Arduino from 'blockly-arduino/arduino'

export const Math = `
  <category name="Math" colour="#5C81A6" >
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="math_random_int">
      <value name="FROM">
        <shadow type="math_number">
          <field name="NUM">1</field>
        </shadow>
      </value>
      <value name="TO">
        <shadow type="math_number">
          <field name="NUM">100</field>
        </shadow>
      </value>
    </block>
  </category>
`;

Arduino['Math']= function() {
  // Text value.
  var code = Blockly.Arduino.quote_(this.getFieldValue('Math'));
  console.log("Arduino"+ code);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
